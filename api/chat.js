import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, context } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages must be a non-empty array' });
    }

    const last = messages[messages.length - 1];
    if (!last || typeof last.content !== 'string' || last.content.trim().length < 1) {
      return res.status(400).json({ error: 'last message must have non-empty content' });
    }

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
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('OpenAI Error:', err.message);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
