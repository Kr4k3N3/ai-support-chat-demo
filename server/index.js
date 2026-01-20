import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';
import nodemailer from 'nodemailer';

const app = express();

const PORT = process.env.PORT || 8787;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY in server env.');
  process.exit(1);
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Email transporter (configure in .env)
let transporter = null;
if (process.env.SMTP_HOST) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: '1mb' }));

// Simple rate limit to protect your key/budget
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 30, // 30 req/min per IP
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  })
);

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages must be a non-empty array' });
    }

    // Basic input guard
    const last = messages[messages.length - 1];
    if (!last || typeof last.content !== 'string' || last.content.trim().length < 1) {
      return res.status(400).json({ error: 'last message must have non-empty content' });
    }

    // "Demo" instructions: you can later move these to DB/admin panel
    const instructions = `
You are the AI assistant for an AI Chat Demo website that showcases how intelligent chatbots can help small businesses.
Goals:
- Explain how AI chatbots work and their benefits for customer support.
- Answer questions about this demo and what it demonstrates.
- If user needs human help, collect: name + email (or phone) + a short description of what they need.
- Be transparent: this is a demo showing off AI chat capabilities.
Style: professional, friendly, helpful, and enthusiastic about AI technology.
`;

    const businessContext = context?.businessContext || `
This is a DEMO website showcasing AI-powered customer support chatbots.
Features demonstrated:
- Instant 24/7 automated responses
- Natural language understanding
- Lead capture and qualification
- Human escalation when needed
- Quick reply suggestions
- Real-time typing indicators
Purpose: Show businesses how AI chat can enhance their customer experience.
`;

    // Build messages for Chat Completions API
    const chatMessages = [
      { role: 'system', content: instructions + '\n\nBUSINESS CONTEXT:\n' + businessContext },
      ...messages.slice(-12).map(m => ({ role: m.role, content: m.content }))
    ];

    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: chatMessages,
      max_tokens: 500,
    });

    const reply = response.choices?.[0]?.message?.content || '';
    return res.json({ reply });
  } catch (err) {
    console.error('OpenAI Error:', err.message);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// Escalation endpoint - sends email to team member
app.post('/api/escalate', async (req, res) => {
  try {
    const { name, email, phone, issue, conversation } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({ error: 'Name and contact info required' });
    }

    const teamEmail = process.env.TEAM_EMAIL || 'support@example.com';
    
    // Format conversation for email
    const conversationText = conversation
      ?.map(m => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n\n') || 'No conversation history';

    const emailBody = `
New Support Request

Customer: ${name}
Email: ${email || 'Not provided'}
Phone: ${phone || 'Not provided'}
Issue: ${issue || 'Not specified'}

--- Conversation History ---
${conversationText}
    `.trim();

    // If email is configured, send it
    if (transporter) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: teamEmail,
        subject: `🆘 Support Request from ${name}`,
        text: emailBody,
      });
      console.log(`✅ Escalation email sent to ${teamEmail}`);
    } else {
      // No email configured - just log it (for demo)
      console.log('📧 ESCALATION (email not configured):');
      console.log(emailBody);
    }

    return res.json({ success: true, message: 'Your request has been sent to our team!' });
  } catch (err) {
    console.error('Escalation Error:', err.message);
    return res.status(500).json({ error: 'Failed to send request' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
