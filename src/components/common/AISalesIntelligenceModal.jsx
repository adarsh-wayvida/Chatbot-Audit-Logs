import React, { useState } from "react";
import { FiX, FiCopy, FiCheck, FiStar, FiTrendingUp, FiTarget, FiZap, FiMessageSquare } from "react-icons/fi";
import "./AISalesIntelligenceModal.css";

export default function AISalesIntelligenceModal({ session, onClose }) {
  const [copiedPitch, setCopiedPitch] = useState(false);

  if (!session) return null;

  const score = session.leadScore ?? 50;
  const leadTag = session.opportunityTag || (score >= 75 ? "High Value Opportunity" : score >= 45 ? "Potential Lead" : "Low Lead Score");

  const handleCopyPitch = () => {
    const pitchText = session.recommendedPitch || "Follow up with standard information pack.";
    navigator.clipboard.writeText(pitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const getKeywords = (session) => {
    const text = `${session.finalIntent || ""} ${session.recommendedPitch || ""}`.toLowerCase();
    const chips = [];
    if (text.includes("python")) chips.push("Python Beginner");
    if (text.includes("ai") || text.includes("machine learning")) chips.push("AI Engineer Track");
    if (text.includes("coupon") || text.includes("discount")) chips.push("Promo/Coupon Inquiry");
    if (text.includes("2000") || text.includes("budget") || text.includes("price")) chips.push("Price Sensitive (₹2000)");
    if (text.includes("creator") || text.includes("upload") || text.includes("earn")) chips.push("Instructor / Creator Intent");
    if (text.includes("payment") || text.includes("failed")) chips.push("Failed Payment Recovery");
    if (text.includes("test") || text.includes("rank")) chips.push("Test Rank Performance");
    if (text.includes("psc") || text.includes("kerala")) chips.push("Kerala PSC Aspirant");
    if (chips.length === 0) chips.push("General Course Inquiry", "Active Learner");
    return chips;
  };

  const keywords = getKeywords(session);

  return (
    <div className="ai-modal-backdrop" onClick={onClose}>
      <div className="ai-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ai-modal-header">
          <div className="ai-modal-header-left">
            <div className="ai-modal-title-row">
              <span className="ai-star-badge"><FiStar size={16} /></span>
              <h2 className="ai-modal-title">AI Sales Intelligence & Strategy</h2>
            </div>
            <div className="ai-modal-sub-badges">
              <span className={`ai-score-pill ${score >= 75 ? 'high' : score >= 45 ? 'med' : 'low'}`}>
                Score: <strong>{score}/100</strong>
              </span>
              <span className="ai-opp-pill">{leadTag}</span>
              <span className="ai-user-pill">User: <strong>{session.users === "guest" ? "Guest" : session.users}</strong></span>
            </div>
          </div>
          <button className="ai-modal-close-btn" onClick={onClose} title="Close">
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="ai-modal-body">
          {/* Section 1: Final Intent & Dropoff */}
          <div className="ai-section-card">
            <div className="ai-section-header">
              <FiTarget className="ai-section-icon" size={16} />
              <h3>Final Intent & Dropoff Analysis</h3>
            </div>
            <div className="ai-section-content highlight-box">
              {session.finalIntent || session.intent || "General Course Inquiry & Platform Browsing"}
            </div>
          </div>

          {/* Section 2: Lead Qualification & Score Details */}
          <div className="ai-section-card">
            <div className="ai-section-header">
              <FiTrendingUp className="ai-section-icon" size={16} />
              <h3>Lead Qualification & Buying Signals</h3>
            </div>
            <div className="ai-section-content">
              <div className="lead-qual-grid">
                <div className="qual-item">
                  <span className="qual-label">Lead Score Rating</span>
                  <span className={`qual-value ${score >= 75 ? 'text-green' : score >= 45 ? 'text-amber' : 'text-slate'}`}>
                    {score} / 100 — {score >= 75 ? "High Buying Intent 🔥" : score >= 45 ? "Moderate Interest ⚡" : "Low Lead Engagement"}
                  </span>
                </div>
                <div className="qual-item">
                  <span className="qual-label">Detected Intent Category</span>
                  <span className="qual-value">{session.intent || "explore_course"}</span>
                </div>
                <div className="qual-item">
                  <span className="qual-label">Entry Screen</span>
                  <span className="qual-value">{session.pageScreen || "Home Page"}</span>
                </div>
                <div className="qual-item">
                  <span className="qual-label">Institute Context</span>
                  <span className="qual-value">{session.platformType === "Marketplace" ? "Wayvida Marketplace" : session.instituteId}</span>
                </div>
              </div>

              {/* Signals / Keywords */}
              <div className="ai-signals-wrapper">
                <span className="signals-title">Key Signals Detected:</span>
                <div className="signals-chips">
                  {keywords.map((kw, idx) => (
                    <span key={idx} className="signal-chip">
                      <FiZap size={11} style={{ marginRight: 4 }} />
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Recommended Sales Pitch */}
          <div className="ai-section-card pitch-card">
            <div className="ai-section-header pitch-header">
              <div className="header-title-flex">
                <FiMessageSquare className="ai-section-icon" size={16} />
                <h3>Recommended Pitch for Sales Team</h3>
              </div>
              <button className={`copy-pitch-btn ${copiedPitch ? 'copied' : ''}`} onClick={handleCopyPitch}>
                {copiedPitch ? <FiCheck size={14} /> : <FiCopy size={14} />}
                <span>{copiedPitch ? "Copied Pitch!" : "Copy Pitch"}</span>
              </button>
            </div>
            <div className="ai-pitch-box">
              <p>{session.recommendedPitch || "Follow up with standard info pack."}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="ai-modal-footer">
          <button className="ai-modal-done-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
