import React from 'react';
import { NavLink } from 'react-router-dom';
import { site } from '../content.js';

export default function Header() {
  return (
    <header className="header">
      <div className="container headerInner">
        <NavLink to="/" className="brand">
          <div className="brandMark" aria-hidden="true">💬</div>
          <div className="brandText">
            <div className="brandName">{site.brand}</div>
          </div>
        </NavLink>

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}>
            Home
          </NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}>
            How It Works
          </NavLink>
          <NavLink to="/use-cases" className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}>
            Use Cases
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
