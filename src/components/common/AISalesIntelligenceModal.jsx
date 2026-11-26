import React, { useState } from "react";
import { FiX, FiCopy, FiCheck, FiMail, FiPhone, FiUser, FiGlobe, FiZap, FiCheckCircle } from "react-icons/fi";
import { messagesMap } from "../../data/auditLogMockData";
import "./AISalesIntelligenceModal.css";

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
    "Noel": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
  };

  const femalePhotos = {
    "ARCHANA S": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    "Daliya C Abraham": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    "Radhika": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "Harishmitha": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    "aami": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    "Riya": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  };

  if (isMale) return malePhotos[name] || malePhotos["Sajan"];
  return femalePhotos[name] || femalePhotos["ARCHANA S"];
};

const extractContactInfo = (session) => {
  let email = session?.userEmail || null;
  let phone = session?.userPhone || null;

  if (!email || !phone) {
    const msgs = session?.messages || messagesMap[session?.sessionId] || [];
    for (const msg of msgs) {
      const text = msg.text || "";
      if (!email) {
        const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (emailMatch) email = emailMatch[0];
      }
      if (!phone) {
        const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?(\d{10}|\d{5}[-.\s]\d{5})/);
        if (phoneMatch && phoneMatch[0].length >= 10) phone = phoneMatch[0];
      }
    }
  }

  return {
    email: email || "Not provided in chat",
    phone: phone || "Not provided in chat",
    hasEmail: Boolean(email),
    hasPhone: Boolean(phone)
  };
};

export default function AISalesIntelligenceModal({ session, onClose }) {
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!session) return null;

  const contact = extractContactInfo(session);
  const userAvatarUrl = getUserAvatar(session.users);
  const userInitial = (session.users || "U").charAt(0).toUpperCase();

  const score = session.leadScore ?? 50;
  const leadIntentLabel = score >= 75 ? "High Buying Intent" : score >= 45 ? "Moderate Intent" : "Low Intent";
  const scoreColor = score >= 75 ? "#047857" : score >= 45 ? "#b45309" : "#475569";
  const badgeStyle = score >= 75 
    ? { bg: "#ecfdf5", text: "#047857", border: "#a7f3d0" }
    : score >= 45 
      ? { bg: "#fffbeb", text: "#b45309", border: "#fde68a" }
      : { bg: "#f1f5f9", text: "#475569", border: "#cbd5e1" };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(session.recommendedPitch || "Follow up with student info pack");
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const handleCopyEmail = () => {
    if (contact.hasEmail) {
      navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = () => {
    if (contact.hasPhone) {
      navigator.clipboard.writeText(contact.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  // Extract key topic chips from final intent & pitch
  const topicChips = [];
  const textContent = `${session.finalIntent || ""} ${session.recommendedPitch || ""}`.toLowerCase();
  if (textContent.includes("python")) topicChips.push("Python");
  if (textContent.includes("ai") || textContent.includes("machine learning")) topicChips.push("AI & ML");
  if (textContent.includes("demo")) topicChips.push("Demo Requested");
  if (textContent.includes("budget") || textContent.includes("2000")) topicChips.push("₹2000 Budget");
  if (textContent.includes("creator") || textContent.includes("educator")) topicChips.push("Course Creator");
  if (textContent.includes("psc") || textContent.includes("kerala")) topicChips.push("Kerala PSC");
  if (textContent.includes("discount") || textContent.includes("coupon")) topicChips.push("Coupon Interested");
  if (textContent.includes("payment")) topicChips.push("Payment Failure");

  return (
    <div className="ai-modal-backdrop" onClick={onClose}>
      <div className="ai-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ai-modal-header">
          <div className="ai-modal-header-title">
            <span className="ai-star-icon">★</span>
            <h2>AI Sales Intelligence & Strategy</h2>
            <span 
              className="ai-modal-opportunity-badge"
              style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text, borderColor: badgeStyle.border }}
            >
              {session.opportunityTag || "Potential Lead"}
            </span>
          </div>
          <button className="ai-modal-close-btn" onClick={onClose} title="Close">
            <FiX size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="ai-modal-body">
          {/* User Contact Card */}
          <div className="ai-user-contact-strip">
            <div className="ai-user-profile-group">
              {userAvatarUrl ? (
                <img src={userAvatarUrl} alt={session.users} className="ai-modal-avatar-img" />
              ) : (
                <div className="ai-modal-avatar-fallback">{userInitial}</div>
              )}
              <div className="ai-user-name-box">
                <span className="ai-user-name">{session.users === "guest" ? "Guest (Public)" : session.users}</span>
                <span className="ai-platform-chip">{session.platformType === "Marketplace" ? "Wayvida Marketplace" : session.instituteId}</span>
              </div>
            </div>

            <div className="ai-contact-details-group">
              <div className={`ai-contact-item ${contact.hasEmail ? 'active-contact' : ''}`}>
                <FiMail size={14} className="contact-icon" />
                <span className="contact-val">{contact.email}</span>
                {contact.hasEmail && (
                  <button className="contact-copy-btn" onClick={handleCopyEmail} title="Copy Email">
                    {copiedEmail ? <FiCheck size={12} color="#16a34a" /> : <FiCopy size={12} />}
                  </button>
                )}
              </div>

              <div className={`ai-contact-item ${contact.hasPhone ? 'active-contact' : ''}`}>
                <FiPhone size={14} className="contact-icon" />
                <span className="contact-val">{contact.phone}</span>
                {contact.hasPhone && (
                  <button className="contact-copy-btn" onClick={handleCopyPhone} title="Copy Phone">
                    {copiedPhone ? <FiCheck size={12} color="#16a34a" /> : <FiCopy size={12} />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Lead Qualification & Score Banner */}
          <div className="ai-score-card">
            <div className="ai-score-top-row">
              <div className="ai-score-label">LEAD QUALIFICATION & BUYING INTENT</div>
              <div className="ai-score-badge-val" style={{ color: scoreColor }}>
                {score} / 100 • {leadIntentLabel}
              </div>
            </div>
            <div className="ai-score-progress-bar-track">
              <div 
                className="ai-score-progress-bar-fill" 
                style={{ width: `${score}%`, backgroundColor: scoreColor }} 
              />
            </div>
          </div>

          {/* Section 1: Final Intent & Dropoff Analysis */}
          <div className="ai-section-card">
            <div className="ai-section-title">FINAL INTENT & DROPOFF ANALYSIS</div>
            <div className="ai-intent-full-text">
              {session.finalIntent || session.intent || "General course inquiry and navigation."}
            </div>

            {topicChips.length > 0 && (
              <div className="ai-topics-group">
                <span className="topics-label">Detected Signals:</span>
                {topicChips.map((chip) => (
                  <span key={chip} className="topic-chip">
                    <FiZap size={11} /> {chip}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Recommended Sales Pitch & Action Plan */}
          <div className="ai-section-card pitch-highlight-card">
            <div className="pitch-header-row">
              <div className="ai-section-title pitch-title">
                RECOMMENDED SALES PITCH & NEXT BEST ACTION
              </div>
              <button className="copy-pitch-btn" onClick={handleCopyPitch}>
                {copiedPitch ? (
                  <>
                    <FiCheckCircle size={14} /> Pitch Copied!
                  </>
                ) : (
                  <>
                    <FiCopy size={14} /> Copy Pitch to Clipboard
                  </>
                )}
              </button>
            </div>
            <div className="ai-pitch-full-text">
              {session.recommendedPitch || "Follow up with student on course curriculum details & early-bird registration."}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="ai-modal-footer">
          <button className="ai-modal-close-footer-btn" onClick={onClose}>
            Close Strategy Panel
          </button>
        </div>
      </div>
    </div>
  );
}