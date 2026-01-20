import React from 'react';

export default function HowItWorks() {
  return (
    <div className="stack">
      <div className="card accent-top">
        <h1>How It Works</h1>
        <p className="lead">
          A simple 4-step flow that handles most customer interactions automatically.
        </p>
      </div>

      <div className="grid2">
        <div className="card blue">
          <h3>1. Customer Opens Chat</h3>
          <p className="muted">They click the chat button and type their question.</p>
        </div>
        <div className="card purple">
          <h3>2. AI Responds</h3>
          <p className="muted">The chatbot answers using your business information.</p>
        </div>
        <div className="card cyan">
          <h3>3. Collects Details</h3>
          <p className="muted">If needed, it gathers contact info for follow-up.</p>
        </div>
        <div className="card blue">
          <h3>4. Escalates When Needed</h3>
          <p className="muted">Complex questions get routed to a human.</p>
        </div>
      </div>

      <div className="card gradient-border">
        <h3>What You Can Customize</h3>
        <p className="muted">Business info, available services, tone of voice, colors, and integrations (CRM, email, database).</p>
      </div>
    </div>
  );
}
