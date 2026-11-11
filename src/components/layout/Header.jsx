import React from "react";

export default function Header() {
  return (
    <header className="admin-header" style={{ width: "100%", overflow: "hidden", padding: 0 }}>
      <img
        src="/top-nav.png"
        alt="Top Navigation"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </header>
  );
}
