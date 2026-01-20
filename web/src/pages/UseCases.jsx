import React from 'react';
import { useCases } from '../content.js';

export default function UseCases() {
  return (
    <div className="stack">
      <div className="card accent-top">
        <h1>Use Cases</h1>
        <p className="lead">This chatbot works for many industries. Same core, different business info.</p>
      </div>

      <div className="grid2">
        {useCases.map((u) => (
          <div className="card" key={u.title}>
            <h3>{u.title}</h3>
            <p className="muted">{u.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
