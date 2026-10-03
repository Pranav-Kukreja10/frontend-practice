import React from "react";
import "./DropdownPanel.css";

export default function DropdownPanel({ columns = [] }) {
  return (
    <div className="dropdown-panel">
      <div className="dropdown-content">
        {columns.map((col) => (
          <div key={col.title} className="dropdown-col">
            <h4 className="col-title">{col.title}</h4>
            <ul className="col-list">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="col-link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}