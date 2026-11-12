import React from "react";

export default function Header({ toggleSidebar }) {
  return (
    <header
      className="admin-header w-full cursor-pointer select-none bg-white border-b overflow-hidden"
      onClick={toggleSidebar}
      title="Click header to toggle sidebar"
      style={{ margin: 0, padding: 0 }}
    >
      <img
        src="file:///C:/Users/Lenovo/Downloads/Top%20nav.png"
        alt="Top Navigation"
        className="w-full h-auto block object-cover"
        style={{ display: "block", width: "100%", maxHeight: "60px", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/Top nav.png";
        }}
      />
    </header>
  );
}
