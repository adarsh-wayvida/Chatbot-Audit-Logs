import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ChatbotAuditLog from "../../pages/ChatbotAuditLog";
import "./AdminLayout.css";

export default function AdminLayout({ children }) {
  const [activeNav, setActiveNav] = useState("Home");
  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <Sidebar activeNav={activeNav} onNavigate={setActiveNav} />
        <main className="main-content">
          {activeNav === "Chatbot Audit Log" ? (
            <ChatbotAuditLog />
          ) : (
            <div className="dashboard-container">
              <img src="/main-container.png" alt="Wayvida Dashboard" />
            </div>
          )}
          <Footer />
        </main>
      </div>
    </div>
  );
}
