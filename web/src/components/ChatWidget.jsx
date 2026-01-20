import React, { useEffect, useMemo, useRef, useState } from 'react';
import { demoBusiness } from '../content.js';

const starterMessages = [
  {
    role: 'assistant',
    content: "Hi! 👋 I'm an AI support assistant demo. Try asking me anything to see how I work!",
    time: new Date(),
  },
];

const quickReplies = [
  "How does this chatbot work?",
  "What can you help with?",
  "Show me your features",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const [showEscalate, setShowEscalate] = useState(false);
  const [escalateForm, setEscalateForm] = useState({ name: '', email: '', phone: '', issue: '' });
  const [escalateSent, setEscalateSent] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const listRef = useRef(null);

  const businessContext = useMemo(() => {
    return `Business: ${demoBusiness.name}
Services: ${demoBusiness.services.map(s => s.title).join(', ')}
Hours: ${demoBusiness.hours}
Area: ${demoBusiness.area}
Pricing note: ${demoBusiness.note}`;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function send(text) {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setShowQuickReplies(false);
    const next = [...messages, { role: 'user', content: msg, time: new Date() }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next,
          context: { businessContext }
        }),
      });

      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || 'Request failed');

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || '...', time: new Date() }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry — the demo server failed. If you're running locally, make sure the backend is on and OPENAI_API_KEY is set.",
          time: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function formatTime(date) {
    if (!date) return '';
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  async function sendEscalation(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch('/api/escalate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...escalateForm,
          conversation: messages,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || 'Failed');
      
      setEscalateSent(true);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "✅ I've sent your request to our team. They'll contact you shortly!",
        time: new Date(),
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, couldn't send your request. Please try again or call us directly.",
        time: new Date(),
      }]);
    } finally {
      setLoading(false);
      setShowEscalate(false);
    }
  }

  return (
    <>
      <button className="chatFab" onClick={() => setOpen(true)} aria-label="Open chat">
        💬 Chat with us
      </button>

      {open && (
        <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="Support chat">
          <div className="modal chatModal">
            <div className="modalHeader">
              <div className="headerLeft">
                <div className="botAvatar">🤖</div>
                <div>
                  <div className="modalTitle">Support Assistant</div>
                  <div className="onlineStatus"><span className="statusDot"></span> Online</div>
                </div>
              </div>
              <button className="iconBtn" onClick={() => setOpen(false)} aria-label="Close chat">
                ✕
              </button>
            </div>

            <div className="chatList" ref={listRef}>
              {messages.map((m, idx) => (
                <div key={idx} className={`msgRow ${m.role === 'user' ? 'right' : ''} fadeIn`}>
                  {m.role === 'assistant' && <div className="msgAvatar">🤖</div>}
                  <div className="msgContent">
                    <div className={m.role === 'user' ? 'msgBubble user' : 'msgBubble'}>
                      {m.content}
                    </div>
                    <div className="msgTime">{formatTime(m.time)}</div>
                  </div>
                  {m.role === 'user' && <div className="msgAvatar user">👤</div>}
                </div>
              ))}
              {loading && (
                <div className="msgRow fadeIn">
                  <div className="msgAvatar">🤖</div>
                  <div className="msgBubble typing">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
            </div>

            {showQuickReplies && messages.length <= 1 && (
              <div className="quickReplies">
                {quickReplies.map((q, i) => (
                  <button key={i} className="quickReply" onClick={() => send(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="chatInputBar">
              <input
                className="chatInput"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') send();
                }}
              />
              <button className="sendBtn" onClick={() => send()} disabled={loading || !input.trim()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"/>
                </svg>
              </button>
            </div>

            {!showEscalate && !escalateSent && (
              <div className="chatActions">
                <button className="escalateBtn" onClick={() => setShowEscalate(true)}>
                  🙋 Talk to a human
                </button>
              </div>
            )}

            {showEscalate && !escalateSent && (
              <form className="escalateForm" onSubmit={sendEscalation}>
                <div className="escalateTitle">📞 Request Human Support</div>
                <input
                  placeholder="Your name *"
                  value={escalateForm.name}
                  onChange={(e) => setEscalateForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={escalateForm.email}
                  onChange={(e) => setEscalateForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
                <input
                  placeholder="Phone (optional)"
                  value={escalateForm.phone}
                  onChange={(e) => setEscalateForm(f => ({ ...f, phone: e.target.value }))}
                />
                <textarea
                  placeholder="Briefly describe your issue"
                  value={escalateForm.issue}
                  onChange={(e) => setEscalateForm(f => ({ ...f, issue: e.target.value }))}
                  rows={2}
                />
                <div className="escalateBtns">
                  <button type="button" className="btn ghost" onClick={() => setShowEscalate(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Request'}
                  </button>
                </div>
              </form>
            )}

            {escalateSent && (
              <div className="escalateSent">
                ✅ Request sent! Our team will contact you soon.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
