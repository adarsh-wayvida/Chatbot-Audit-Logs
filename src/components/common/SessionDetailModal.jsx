import React, { useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight, FiCopy, FiCheck, FiMessageSquare, FiExternalLink, FiTag } from "react-icons/fi";
import chatbotAvatar from "../../assets/Opacity 20.svg";
import "./SessionDetailModal.css";

const getUserAvatar = (name) => {
  if (!name || name === "guest") return null;

  const males = ["Sajan", "Manukrishna", "Ratheesh Babu", "amalch", "cuser", "Developer C", "auser", "coursenls", "Sandeep", "Snobin", "Sachin", "Noel"];
  const isMale = males.includes(name);

  const malePhotos = {
    "Sajan": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "Manukrishna": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    "Sandeep": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "Snobin": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "Sachin": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    "Noel": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "Developer C": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    "cuser": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
  };

  const femalePhotos = {
    "ARCHANA S": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    "Daliya C Abraham": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    "Radhika": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "Harishmitha": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    "aami": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    "Riya": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    "mk company": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  };

  if (isMale) {
    return malePhotos[name] || malePhotos["Sajan"];
  } else {
    return femalePhotos[name] || femalePhotos["ARCHANA S"];
  }
};

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
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (value, field) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const userId = sessionData?.userId || "";
  const sessionId = sessionData?.sessionId || "";

  return (
    <div className="session-modal-backdrop" onClick={onClose}>
      <div className="session-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="session-modal-header">
          <div className="header-row-1">
            <div className="user-title-row">
              <h2 className="user-title">{sessionData?.users || "User"} ({sessionData?.messages?.length || 0})</h2>
              <span className="platform-badge">{sessionData?.platformType || "Whitelabel"}</span>
              <span className="device-badge">Desktop</span>
            </div>
            <div className="header-right-controls">
              <div className="top-session-nav">
                <span className="session-count">Session {selectedIndex + 1} of {totalSessions}</span>
                <div className="session-arrow-group">
                  <button className="session-arrow-btn" onClick={onPrevSession} disabled={selectedIndex <= 0} title="Previous session">
                    <FiChevronLeft size={18} />
                  </button>
                  <button className="session-arrow-btn" onClick={onNextSession} disabled={selectedIndex >= totalSessions - 1} title="Next session">
                    <FiChevronRight size={18} />
                  </button>
                </div>
              </div>
              <button className="session-close-btn" onClick={onClose}><FiX size={18} /></button>
            </div>
          </div>
          <div className="header-row-2">
            <div className="sub-header">
              <div className="id-chip">
                <span>User ID</span>
                <code>{userId}</code>
                <button onClick={() => handleCopy(userId, "user")}>
                  {copiedField === "user" ? <FiCheck size={12} /> : <FiCopy size={12} />}
                </button>
              </div>
              <div className="id-chip">
                <span>Session ID</span>
                <code>{sessionId}</code>
                <button onClick={() => handleCopy(sessionId, "session")}>
                  {copiedField === "session" ? <FiCheck size={12} /> : <FiCopy size={12} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="meta-summary-bar">
          <div className="meta-item">
            <div className="meta-label">INSTITUTE ID</div>
            <div className="meta-value">{sessionData?.instituteId}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">PAGE NAME</div>
            <div className="meta-value">{sessionData?.pageScreen}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">CREATED AT</div>
            <div className="meta-value">{sessionData?.datetime}</div>
          </div>

          <div className="meta-item">
            <div className="meta-label">AVG LATENCY</div>
            <div className="meta-value">2m 14s</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">TOTAL TOKENS</div>
            <div className="meta-value">1,240</div>
          </div>
        </div>

        <div className="chat-body-messages">
          {(sessionData?.messages || []).map((msg) => {
            return msg.role === "user" ? (
              <div key={msg.id} className="chat-row user-row">
                <div className="user-content-wrapper">
                  <div className="user-bubble">
                    <div className="user-text">{renderText(msg.text)}</div>
                  </div>
                  <div className="user-meta">
                    <span className="user-timestamp">{msg.timestamp}</span>
                    {msg.intent && (
                      <>
                        <span className="meta-dot">•</span>
                        <span className="intent-badge-pill">
                          <FiTag size={12} style={{ flexShrink: 0 }} />
                          <span>{msg.intent}</span>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="chat-row assistant-row">
                <div className="assistant-avatar">
                  <img src={chatbotAvatar} alt="Chatbot Avatar" className="chatbot-avatar-img" />
                </div>
                <div className="assistant-content">
                  <div className="assistant-bubble">
                    <div className="assistant-text">{renderText(msg.text)}</div>
                  </div>
                  <div className="assistant-meta">
                    {msg.timestamp} • {msg.latency}
                  </div>
                  {msg.options && (
                    <div className="quick-replies">
                      {msg.options.map((q) => {
                        const optionText = typeof q === "string" ? q : q.label;
                        const isLink = /view|open|app|play|browse|http|url/i.test(optionText);

                        return (
                          <button key={optionText} className="quick-reply">
                            {isLink ? <FiExternalLink size={12} /> : <FiMessageSquare size={12} />}
                            <span>{optionText}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {msg.tokens && (
                    <div>
                      <button className="token-usage-btn" onClick={() => setOpenToken(openToken === msg.id ? null : msg.id)}>
                        Token usage {openToken === msg.id ? "▲" : "▼"}
                      </button>
                      {openToken === msg.id && (
                        <div className="token-details">Prompt: {msg.tokens.prompt} • Completion: {msg.tokens.completion} • Total: {msg.tokens.total}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          <div className="footer-right">
            Messages page 1/1 • {sessionData?.messages?.length || 0} messages
          </div>
        </div>
      </div>
    </div>
  );
}
