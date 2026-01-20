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
    const { name, email, phone, issue, conversation } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({ error: 'Name and email/phone required' });
    }

    // Log the escalation (in production, you'd send an email or create a ticket)
    console.log('=== ESCALATION REQUEST ===');
    console.log('Name:', name);
    console.log('Email:', email || 'N/A');
    console.log('Phone:', phone || 'N/A');
    console.log('Issue:', issue || 'No description');
    console.log('Conversation length:', conversation?.length || 0);
    console.log('==========================');

    return res.status(200).json({ 
      success: true, 
      message: 'Your request has been received. A team member will contact you soon!' 
    });
  } catch (err) {
    console.error('Escalation Error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
}
