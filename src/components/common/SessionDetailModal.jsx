import React, { useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./SessionDetailModal.css";

function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
}

export default function SessionDetailModal({ sessionData, selectedIndex, totalSessions, onPrevSession, onNextSession, onClose }) {
  const [openToken, setOpenToken] = useState(null);

  return (
    <div className="session-modal-backdrop" onClick={onClose}>
      <div className="session-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="session-modal-header">
          <div>
            <h2 className="session-title">Session detail</h2>
            <div className="uuid-subtitle">{sessionData?.fullSessionId || sessionData?.sessionId}</div>
            <div className="session-nav">
              <button className="session-nav-btn" onClick={onPrevSession} disabled={selectedIndex <= 0}><FiChevronLeft size={14} /> Previous session</button>
              <span className="session-count">Session {selectedIndex + 1} of {totalSessions}</span>
              <button className="session-nav-btn" onClick={onNextSession} disabled={selectedIndex >= totalSessions - 1}>Next session <FiChevronRight size={14} /></button>
            </div>
          </div>
          <button className="session-close-btn" onClick={onClose}><FiX size={18} /></button>
        </div>

        <div className="session-meta-grid">
          {[
            { label: "User", value: sessionData?.users },
            { label: "Institute", value: sessionData?.instituteId },
            { label: "Platform", value: sessionData?.platformType },
            { label: "Device", value: "Desktop" },
            { label: "Created", value: sessionData?.datetime },
            { label: "Total chats", value: sessionData?.messages?.length || 0 },
            { label: "Avg duration", value: "2m 14s" },
            { label: "Total tokens", value: "1,240" },
          ].map((m) => (
            <div key={m.label} className="meta-card">
              <div className="meta-label">{m.label}</div>
              <div className="meta-value">{m.value}</div>
            </div>
          ))}
        </div>

        <div className="chat-body-messages">
          {(sessionData?.messages || []).map((msg) => (
            <div key={msg.id} className={`chat-msg ${msg.role === "user" ? "user-msg" : "assistant-msg"}`}>
              <div className={`chat-badge ${msg.role === "user" ? "user-badge" : "assistant-badge"}`}>{msg.role === "user" ? "User" : "Assistant"}</div>
              <div className="chat-meta">
                {msg.timestamp}{msg.role === "user" ? ` • intent: ${msg.intent} • page: ${msg.page}` : ` • latency: ${msg.latency}`}
              </div>
              <div className="chat-text">{renderText(msg.text)}</div>
              {msg.role === "assistant" && msg.options && (
                <div className="quick-replies">
                  {msg.options.map((q) => (
                    <span key={q} className="quick-reply">{q}</span>
                  ))}
                </div>
              )}
              {msg.role === "assistant" && msg.tokens && (
                <details className="token-usage" open={openToken === msg.id} onClick={(e) => { e.preventDefault(); setOpenToken(openToken === msg.id ? null : msg.id); }}>
                  <summary>Token usage</summary>
                  <div className="token-details">Prompt: {msg.tokens.prompt} • Completion: {msg.tokens.completion} • Total: {msg.tokens.total}</div>
                </details>
              )}
            </div>
          ))}
        </div>

        <div className="session-modal-footer">
          Messages page 1 / 1 • {sessionData?.messages?.length || 0} messages
        </div>
      </div>
    </div>
  );
}
