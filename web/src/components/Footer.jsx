import React from 'react';
import { demoBusiness } from '../content.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footerInner">
        <div>
          <div className="footerTitle">{demoBusiness.name}</div>
          <div className="muted">Hours: {demoBusiness.hours}</div>
          <div className="muted">Area: {demoBusiness.area}</div>
        </div>
        <div className="muted">
          © {new Date().getFullYear()} Demo site for showcasing AI support chat.
        </div>
      </div>
    </footer>
  );
}
