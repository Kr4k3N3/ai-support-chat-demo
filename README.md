# 🤖 AI Support Chat Demo

A sleek, modern demo showcasing how AI-powered chatbots can transform customer support for small businesses.

![Made with React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Powered by OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-green?logo=openai)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)

---

## ✨ What is this?

This is a **fully functional demo** of an AI customer support chatbot. It's designed to show businesses what's possible with modern AI technology — instant responses, natural conversations, and seamless handoff to human agents when needed.

**Try it out:** Click the chat bubble in the corner, ask a question, and watch the AI respond in real-time!

---

## 🎯 Features

- **💬 Smart AI Conversations** — Powered by OpenAI's GPT-4o for natural, helpful responses
- **⚡ Instant Responses** — No waiting, 24/7 availability
- **🎨 Beautiful UI** — Light, modern design with smooth animations
- **👤 Human Escalation** — When AI isn't enough, users can request a real person
- **📱 Quick Replies** — One-click buttons for common questions
- **🔔 Typing Indicators** — Real-time feedback so users know the bot is working

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/kr4k3n3/ai-support-chat-demo.git
   cd ai-support-chat-demo
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Set up the frontend**
   ```bash
   cd ../web
   npm install
   ```

4. **Run it!**
   ```bash
   # Terminal 1 - Start the backend
   cd server
   node index.js

   # Terminal 2 - Start the frontend
   cd web
   npm run dev
   ```

5. **Open your browser** at `http://localhost:5173` and start chatting! 🎉

---

## 📁 Project Structure

```
ai-support-chat-demo/
├── server/                 # Express backend
│   ├── index.js           # API routes & OpenAI integration
│   ├── .env.example       # Environment template
│   └── package.json
│
├── web/                    # React frontend
│   ├── src/
│   │   ├── components/    # Chat widget, header, footer
│   │   ├── pages/         # Home, How It Works, Use Cases, Contact
│   │   ├── content.js     # Easily editable site content
│   │   └── styles.css     # All the pretty stuff
│   └── package.json
│
└── README.md
```

---

## 🛠️ Customization

### Change the branding
Edit `web/src/content.js` to update:
- Site name and tagline
- Features list
- Service descriptions

### Modify AI behavior
Edit the `instructions` in `server/index.js` to change how the AI responds.

### Style it your way
All styles are in `web/src/styles.css` with CSS variables for easy theming.

---

## 🔐 Security Note

⚠️ **Never commit your `.env` file!** It contains your API key.

The `.gitignore` is already configured to exclude it. Use `.env.example` as a template.

---

## 📝 License

MIT — Use it, learn from it, build something awesome!

---

## 🤝 Contributing

Found a bug? Have an idea? Pull requests are welcome!

---

Made with ☕ and curiosity.
