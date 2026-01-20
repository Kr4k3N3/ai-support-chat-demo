import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [ok, setOk] = useState(false);

  function set(key, val) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  function submit(e) {
    e.preventDefault();
    setOk(true);
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <div className="stack">
      <div className="card accent-top">
        <h1>Get in Touch</h1>
        <p className="lead">
          Have questions? Send a message and we'll get back to you.
        </p>
      </div>

      <div className="card">
        <form onSubmit={submit} className="form">
          <label>
            Name
            <input value={form.name} onChange={(e) => set('name', e.target.value)} required />
          </label>

          <label>
            Email
            <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required />
          </label>

          <label>
            Message
            <textarea value={form.message} onChange={(e) => set('message', e.target.value)} required rows={4} />
          </label>

          <button className="btn" type="submit">Send Message</button>
          {ok && <div className="success">Thanks! We'll be in touch soon.</div>}
        </form>
      </div>
    </div>
  );
}
