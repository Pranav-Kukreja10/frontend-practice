import React, { useState } from "react";
import Logo from "./Logo";
import DropdownPanel from "./DropdownPanel";
import { NAV_CONFIG } from "./navData";
import "./Navbar.css";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);

  const activeDropdownData = activeMenu ? NAV_CONFIG[activeMenu] : null;

  const handleMenuClick = (key) => {
    setActiveMenu((prev) => (prev === key ? null : key));
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <a href="/" className="logo-link" onClick={() => setActiveMenu(null)}>
            <Logo width={18} height={16} />
          </a>

          <nav className="nav-links">
            {Object.entries(NAV_CONFIG).map(([key, item]) => {
              if (item.hasDropdown) {
                const isOpen = activeMenu === key;
                return (
                  <button
                    key={key}
                    className={`nav-item ${isOpen ? "active" : ""}`}
                    onClick={() => handleMenuClick(key)}
                  >
                    <span>{item.label}</span>
                    <span className={`caret ${isOpen ? "open" : ""}`}>▾</span>
                  </button>
                );
              }

              return (
                <a
                  key={key}
                  href={item.href}
                  className="nav-item"
                  onClick={() => setActiveMenu(null)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="nav-right">
          <button className="btn-ghost">Get a Demo</button>
          <button className="btn-ghost">Log In</button>
          <button className="btn-solid">Sign Up</button>
        </div>
      </div>

      {activeDropdownData?.hasDropdown && (
        <DropdownPanel columns={activeDropdownData.columns} />
      )}
    </header>
  );
}
