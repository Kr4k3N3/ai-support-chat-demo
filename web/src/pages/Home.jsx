import React from 'react';
import { site } from '../content.js';

export default function Home() {
  return (
    <div className="stack">
      <section className="hero card">
        <h1>{site.brand}</h1>
        <p className="lead">{site.tagline}</p>
        <div className="row">
          <button className="btn" onClick={() => document.querySelector('.chatFab')?.click()}>
            💬 {site.primaryCta}
          </button>
          <a className="btn ghost" href="/how-it-works">
            {site.secondaryCta}
          </a>
        </div>

        <div className="badges">
          <span className="badge">24/7 Availability</span>
          <span className="badge">Lead Capture</span>
          <span className="badge">Easy Setup</span>
        </div>
      </section>

      <section className="grid3">
        <div className="card blue">
          <h3>✨ What You See</h3>
          <p className="muted">A working AI chat that answers questions about a sample IT support business. Click the button below to try it.</p>
        </div>
        <div className="card purple">
          <h3>🚀 Why It Helps</h3>
          <p className="muted">Customers get instant answers. You capture leads automatically. Less time on repetitive questions.</p>
        </div>
        <div className="card cyan">
          <h3>🔧 Fully Customizable</h3>
          <p className="muted">Change the business info, colors, and behavior. Connect to your own data or CRM.</p>
        </div>
      </section>
    </div>
  );
}
