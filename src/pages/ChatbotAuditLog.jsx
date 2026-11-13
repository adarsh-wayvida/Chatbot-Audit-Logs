import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCopy, FiCheck, FiMessageSquare, FiExternalLink, FiSearch, FiMonitor, FiSmartphone, FiCalendar } from "react-icons/fi";
import { auditLogData, messagesMap } from "../data/auditLogMockData";
import chatbotAvatar from "../assets/Opacity 20.svg";
import "./ChatbotAuditLog.css";

const getUserAvatar = (name) => {
  if (!name || name === "guest") return null;
  const males = ["Sajan", "Manukrishna", "Ratheesh Babu", "amalch", "cuser", "Developer C", "auser", "coursenls"];
  const isMale = males.includes(name);
  const malePhotos = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  ];
  const femalePhotos = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  ];
  const pool = isMale ? malePhotos : femalePhotos;
  const idx = name.length % pool.length;
  return pool[idx];
};

const getLastMessageText = (session) => {
  const msgs = session.messages || messagesMap[session.sessionId] || [];
  if (msgs.length === 0) return session.intent || "No messages";
  const lastMsg = msgs[msgs.length - 1];
  return lastMsg.text;
};

const getDeviceIcon = (device) => {
  const dev = (device || "").toLowerCase();
  if (dev.includes("android") || dev.includes("iphone") || dev.includes("mobile") || dev.includes("phone")) {
    return <FiSmartphone size={13} title={device} style={{ display: "block" }} />;
  }
  return <FiMonitor size={13} title={device} style={{ display: "block" }} />;
};

// Custom Dropdown Pill Component (Matches Image 1 style perfectly)
function CustomDropdownPill({ label, options, selectedValue, onChange, customFooter }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayLabel = selectedValue === "All" || selectedValue.startsWith("All ") || selectedValue === "Date"
    ? label 
    : selectedValue;

  return (
    <div className="custom-dropdown-container" ref={dropdownRef}>
      <button 
        type="button" 
        className={`custom-dropdown-pill ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayLabel}</span>
        <FiChevronDown className={`chevron-icon ${isOpen ? 'rotate' : ''}`} size={14} />
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`custom-dropdown-item ${selectedValue === opt.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
          {customFooter && (
            <div className="custom-dropdown-footer">
              {customFooter(() => setIsOpen(false))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Dual-Month Calendar Picker Component matching Image specs
function DualMonthCalendarPicker({ onSelectRange, onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1)); // Nov 2026 as per image
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const prevYear = () => setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const nextYear = () => setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));

  const month1 = currentDate;
  const month2 = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const formatMonthTitle = (d) => `${monthNames[d.getMonth()]} ${d.getFullYear()}`;

  const getDaysArray = (year, monthIndex) => {
    const firstDayIndex = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const prevMonthDays = new Date(year, monthIndex, 0).getDate();

    const days = [];
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const prevDate = new Date(year, monthIndex - 1, d);
      days.push({ day: d, dateStr: prevDate.toISOString().split("T")[0], isOtherMonth: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const mStr = String(monthIndex + 1).padStart(2, "0");
      const dStr = String(d).padStart(2, "0");
      days.push({ day: d, dateStr: `${year}-${mStr}-${dStr}`, isOtherMonth: false });
    }
    const totalSlots = 42;
    const remainingSlots = totalSlots - days.length;
    for (let d = 1; d <= remainingSlots; d++) {
      const nextDate = new Date(year, monthIndex + 1, d);
      days.push({ day: d, dateStr: nextDate.toISOString().split("T")[0], isOtherMonth: true });
    }
    return days;
  };

  const handleDayClick = (dateStr) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateStr);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (dateStr < startDate) {
        setStartDate(dateStr);
        setEndDate(null);
      } else {
        setEndDate(dateStr);
        const sParts = startDate.split("-");
        const eParts = dateStr.split("-");
        const sMonth = monthNames[parseInt(sParts[1], 10) - 1];
        const eMonth = monthNames[parseInt(eParts[1], 10) - 1];
        const rangeText = `${parseInt(sParts[2], 10)} ${sMonth} - ${parseInt(eParts[2], 10)} ${eMonth}`;
        onSelectRange(rangeText, startDate, dateStr);
        if (onClose) onClose();
      }
    }
  };

  const renderMonthGrid = (year, monthIndex) => {
    const days = getDaysArray(year, monthIndex);
    return (
      <div className="calendar-month-column">
        <div className="calendar-week-header">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <span key={day} className="week-day-title">{day}</span>
          ))}
        </div>
        <div className="calendar-days-grid">
          {days.map((item, idx) => {
            const isStart = item.dateStr === startDate;
            const isEnd = item.dateStr === endDate;
            const effectiveEnd = endDate || hoverDate;
            const isInRange = startDate && effectiveEnd && item.dateStr > startDate && item.dateStr < effectiveEnd;
            const isSelected = isStart || isEnd;
            const isTodayCircle = item.dateStr === "2026-11-13" && !startDate;

            let cellClass = "calendar-day-cell";
            if (item.isOtherMonth) cellClass += " other-month";
            if (isSelected) cellClass += " selected-day";
            else if (isInRange && !item.isOtherMonth) cellClass += " in-range";
            else if (isTodayCircle && !item.isOtherMonth) cellClass += " today-circle";

            return (
              <div
                key={idx}
                className={cellClass}
                onClick={() => handleDayClick(item.dateStr)}
                onMouseEnter={() => { if (startDate && !endDate) setHoverDate(item.dateStr); }}
              >
                {item.day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="dual-month-calendar-popup" onClick={(e) => e.stopPropagation()}>
      <div className="calendar-arrow-tip" />
      <div className="calendar-top-header">
        <div className="header-nav-group left-nav">
          <button type="button" className="nav-arrow-btn" onClick={prevYear} title="Previous Year">«</button>
          <button type="button" className="nav-arrow-btn" onClick={prevMonth} title="Previous Month">‹</button>
        </div>
        <div className="header-month-titles">
          <span className="month-title">{formatMonthTitle(month1)}</span>
          <span className="month-title">{formatMonthTitle(month2)}</span>
        </div>
        <div className="header-nav-group right-nav">
          <button type="button" className="nav-arrow-btn" onClick={nextMonth} title="Next Month">›</button>
          <button type="button" className="nav-arrow-btn" onClick={nextYear} title="Next Year">»</button>
        </div>
      </div>

      <div className="dual-calendar-grids-wrapper">
        {renderMonthGrid(month1.getFullYear(), month1.getMonth())}
        {renderMonthGrid(month2.getFullYear(), month2.getMonth())}
      </div>
    </div>
  );
}

export default function ChatbotAuditLog() {
  const [sessions] = useState(auditLogData);
  const [selectedSessionId, setSelectedSessionId] = useState(auditLogData[0]?.sessionId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [platformFilter, setPlatformFilter] = useState("All Platform");
  const [userTypeFilter, setUserTypeFilter] = useState("All User Type");
  const [instituteFilter, setInstituteFilter] = useState("All");
  const [leadScoreFilter, setLeadScoreFilter] = useState("All Lead Score");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("Date");
  const [showCalendar, setShowCalendar] = useState(false);
  const [customRangeStart, setCustomRangeStart] = useState("");
  const [customRangeEnd, setCustomRangeEnd] = useState("");

  const filteredLogs = sessions.filter((item) => {
    if (platformFilter && platformFilter !== "All" && platformFilter !== "All Platform" && item.platformType !== platformFilter) return false;
    if (userTypeFilter && userTypeFilter !== "All" && userTypeFilter !== "All User Type") {
      if (userTypeFilter === "Guest" && item.users.toLowerCase() !== "guest") return false;
      if (userTypeFilter === "Named" && item.users.toLowerCase() === "guest") return false;
    }
    if (instituteFilter && instituteFilter !== "All" && instituteFilter !== "Institute: All" && item.instituteId !== instituteFilter) return false;
    if (leadScoreFilter && leadScoreFilter !== "All" && leadScoreFilter !== "All Lead Score") {
      const score = item.leadScore || 75;
      if (leadScoreFilter === "High" && score < 75) return false;
      if (leadScoreFilter === "Medium" && (score < 45 || score >= 75)) return false;
      if (leadScoreFilter === "Low" && score >= 45) return false;
    }
    if (searchTerm && !item.userId.toLowerCase().includes(searchTerm.toLowerCase()) && !item.users.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const activeSession = filteredLogs.find(s => s.sessionId === selectedSessionId) || filteredLogs[0] || auditLogData[0];
  const activeMessages = activeSession?.messages || messagesMap[activeSession?.sessionId] || [];

  const [openToken, setOpenToken] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const handleCopy = (value, field) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  function renderText(text) {
    if (!text) return null;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) => {
      if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
      return <span key={i}>{p}</span>;
    });
  }

  return (
    <div className="audit-log-page">
      <div className="page-header-section">
        <h2 className="audit-log-title">
          Chatbot Audit Logs ({filteredLogs.length})
        </h2>
      </div>

      {/* FILTER BAR WITH CUSTOM DROPDOWN PILLS */}
      <div className="audit-filter-bar">
        <CustomDropdownPill
          label="All Platform"
          selectedValue={platformFilter}
          onChange={setPlatformFilter}
          options={[
            { label: "All Platform", value: "All Platform" },
            { label: "Whitelabel", value: "Whitelabel" },
            { label: "Marketplace", value: "Marketplace" }
          ]}
        />

        <CustomDropdownPill
          label="All User Type"
          selectedValue={userTypeFilter}
          onChange={setUserTypeFilter}
          options={[
            { label: "All User Type", value: "All User Type" },
            { label: "Named User", value: "Named" },
            { label: "Guest", value: "Guest" }
          ]}
        />

        <CustomDropdownPill
          label="Institute: All"
          selectedValue={instituteFilter}
          onChange={setInstituteFilter}
          options={[
            { label: "Institute: All", value: "All" },
            { label: "Python Coaching Center", value: "Python Coaching Center" },
            { label: "Tech Academy", value: "Tech Academy" }
          ]}
        />

        <CustomDropdownPill
          label="All Lead Score"
          selectedValue={leadScoreFilter}
          onChange={setLeadScoreFilter}
          options={[
            { label: "All Lead Score", value: "All Lead Score" },
            { label: "High (75 - 100)", value: "High" },
            { label: "Medium (45 - 74)", value: "Medium" },
            { label: "Low (0 - 44)", value: "Low" }
          ]}
        />

        <CustomDropdownPill
          label="Date"
          selectedValue={dateFilter}
          onChange={(val) => {
            setDateFilter(val);
            setShowCalendar(false);
          }}
          options={[
            { label: "Today", value: "Today" },
            { label: "Yesterday", value: "Yesterday" },
            { label: "This Week", value: "This Week" },
            { label: "Last Week", value: "Last Week" },
            { label: "This Month", value: "This Month" },
            { label: "Last Month", value: "Last Month" },
            { label: "This Year", value: "This Year" },
            { label: "Last Year", value: "Last Year" }
          ]}
          customFooter={(close) => (
            <div className="date-range-footer-wrapper">
              <div
                className={`date-range-box ${showCalendar ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCalendar(!showCalendar);
                }}
              >
                <span className={`date-range-label ${!customRangeStart ? 'placeholder' : ''}`}>
                  {customRangeStart || "Start date"}
                </span>
                <span className="date-range-arrow">→</span>
                <span className={`date-range-label ${!customRangeEnd ? 'placeholder' : ''}`}>
                  {customRangeEnd || "End date"}
                </span>
                <FiCalendar size={14} className="date-range-cal-icon" />
              </div>

              {showCalendar && (
                <DualMonthCalendarPicker
                  onSelectRange={(rangeText, start, end) => {
                    setCustomRangeStart(start);
                    setCustomRangeEnd(end);
                    setDateFilter(rangeText);
                    setShowCalendar(false);
                    close();
                  }}
                  onClose={() => {
                    setShowCalendar(false);
                    close();
                  }}
                />
              )}
            </div>
          )}
        />

        <button 
          onClick={() => { 
            setPlatformFilter("All Platform"); 
            setUserTypeFilter("All User Type"); 
            setInstituteFilter("All"); 
            setLeadScoreFilter("All Lead Score"); 
            setSearchTerm(""); 
            setDateFilter("Date"); 
          }} 
          className="audit-filter-btn"
        >
          Clear
        </button>
      </div>

      {/* 3-PANE WHATSAPP CRM LAYOUT */}
      <div className="whatsapp-crm-container">
        {/* Pane 1: Session List */}
        <div className="pane-session-list">
          {/* WhatsApp style Search Bar */}
          <div className="session-list-search-container">
            <div className="whatsapp-search-input-box">
              <FiSearch className="whatsapp-search-icon" size={16} />
              <input
                type="text"
                placeholder="Search User"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="whatsapp-search-input"
              />
              {searchTerm && (
                <button type="button" className="whatsapp-search-clear-btn" onClick={() => setSearchTerm("")}>✕</button>
              )}
            </div>
          </div>

          <div className="session-list-scroll">
            {filteredLogs.map((session) => {
              const avatar = getUserAvatar(session.users);
              const isSelected = session.sessionId === activeSession?.sessionId;
              const sessionMsgs = session.messages || messagesMap[session.sessionId] || [];
              return (
                <div
                  key={session.sessionId}
                  className={`session-card-item ${isSelected ? "active" : ""}`}
                  onClick={() => setSelectedSessionId(session.sessionId)}
                >
                  {avatar ? (
                    <img src={avatar} alt={session.users} className="user-avatar-photo" />
                  ) : (
                    <div className="avatar-circle">G</div>
                  )}
                  <div className="session-item-info">
                    <div className="session-item-top">
                      <span className="session-user-name">{session.users === "guest" ? "guest (public)" : session.users}</span>
                      <span className="session-time-txt">{session.datetime.split(",")[1]?.trim().slice(0, 8) || ""}</span>
                    </div>
                    <div className="session-intent-snippet" title={getLastMessageText(session)}>
                      {getLastMessageText(session)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pane 2: Chat Window & Floating AI Summary */}
        <div className="pane-chat-window">
          {/* Chat Header */}
          <div className="chat-pane-header">
            <div className="chat-header-user-clickable" onClick={() => setIsSidebarOpen(!isSidebarOpen)} title="Click to view Contact Details">
              {getUserAvatar(activeSession?.users) ? (
                <img src={getUserAvatar(activeSession?.users)} alt={activeSession?.users} className="user-avatar-photo" style={{ width: 36, height: 36 }} />
              ) : (
                <div className="avatar-circle" style={{ width: 36, height: 36, fontSize: 14 }}>G</div>
              )}
              <div className="chat-header-details-column">
                <div className="chat-header-title">{activeSession?.users === "guest" ? "guest (public)" : activeSession?.users}</div>
                <div className="chat-header-sub-badges">
                  <span className="badge-pill badge-whitelabel">{activeSession?.platformType}</span>
                  <span className="badge-pill badge-institute">{activeSession?.platformType === "Marketplace" ? "Wayvida" : activeSession?.instituteId}</span>
                  <span className="badge-pill badge-device" title={activeSession?.device}>{getDeviceIcon(activeSession?.device)}</span>
                </div>
              </div>
            </div>

            <div className="chat-pane-header-right">
              <span className="lead-score-badge" style={{ backgroundColor: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0", fontWeight: "700", padding: "4px 12px", borderRadius: "20px", fontSize: "12px" }}>
                Lead Score: {activeSession?.leadScore ?? 50}
              </span>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="chat-pane-messages">
            {activeMessages.map((msg) => (
              msg.role === "user" ? (
                <div key={msg.id} className="chat-row user-row">
                  <div className="user-bubble">
                    <div className="user-text">{renderText(msg.text)}</div>
                    <div className="user-meta">{msg.timestamp} ✓</div>
                  </div>
                  <div className="msg-intent-under">intent: <span className="intent-highlight">{msg.intent}</span></div>
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
                    <div className="assistant-meta">{msg.timestamp} • {msg.latency}</div>
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
              )
            ))}
          </div>

          {/* Floating AI Banner (Hidden when Sidebar Pane 3 is Open) */}
          {!isSidebarOpen && (
            <div className="ai-sales-intelligence-banner">
              <div className="ai-banner-header">
                <div className="ai-banner-title">
                  <svg className="w-4 h-4 text-blue-500 inline" fill="currentColor" viewBox="0 0 20 20" style={{ width: '16px', height: '16px', color: '#3b82f6' }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span>AI Sales Intelligence &amp; Next Best Action</span>
                </div>
                {(() => {
                  const score = activeSession?.leadScore ?? 50;
                  let badgeText = activeSession?.opportunityTag || "Potential Lead";
                  let badgeStyle = { bg: "#ecfdf5", text: "#047857", border: "#a7f3d0" };
                  if (score < 45) { badgeStyle = { bg: "#f1f5f9", text: "#475569", border: "#cbd5e1" }; }
                  else if (score < 75) { badgeStyle = { bg: "#fffbeb", text: "#b45309", border: "#fde68a" }; }
                  return (
                    <span className="ai-opportunity-badge" style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text, borderColor: badgeStyle.border }}>
                      {activeSession?.opportunityTag || badgeText}
                    </span>
                  );
                })()}
              </div>
              <div className="ai-banner-grid">
                <div className="ai-banner-col">
                  <div className="ai-col-label">Final Intent &amp; Dropoff</div>
                  <div className="ai-col-value">{activeSession?.finalIntent || activeSession?.intent || "General Inquiry"}</div>
                </div>
                <div className="ai-banner-col">
                  <div className="ai-col-label">Lead Qualification</div>
                  <div className="ai-col-value">
                    <span style={{ color: (activeSession?.leadScore ?? 50) >= 75 ? "#16a34a" : (activeSession?.leadScore ?? 50) >= 45 ? "#d97706" : "#64748b", fontWeight: "700" }}>{activeSession?.leadScore ?? 50} / 100</span>
                    <span style={{ color: "#64748b", fontWeight: "400" }}> • {(activeSession?.leadScore ?? 50) >= 75 ? "High Buying Intent" : (activeSession?.leadScore ?? 50) >= 45 ? "Moderate Intent" : "Low Intent"}</span>
                  </div>
                </div>
                <div className="ai-banner-col">
                  <div className="ai-col-label">Recommended Pitch for Sales</div>
                  <div className="ai-col-value">{activeSession?.recommendedPitch || "Follow up with standard info pack"}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pane 3: Contact Details Sidebar */}
        {isSidebarOpen && (
          <div className="pane-contact-sidebar">
            <div className="sidebar-header-bar">
              <span>Contact & Session Details</span>
              <button className="session-close-btn" onClick={() => setIsSidebarOpen(false)}>✕</button>
            </div>
            <div className="sidebar-body-content">
              <div className="profile-card-center">
                {getUserAvatar(activeSession?.users) ? (
                  <img src={getUserAvatar(activeSession?.users)} alt={activeSession?.users} className="user-avatar-photo" style={{ width: 60, height: 60 }} />
                ) : (
                  <div className="avatar-circle" style={{ width: 60, height: 60, fontSize: 22 }}>G</div>
                )}
                <div className="profile-name">{activeSession?.users === "guest" ? "guest (public)" : activeSession?.users}</div>
                <span className="platform-badge">{activeSession?.platformType}</span>
              </div>
              <div className="meta-details-list">
                <div className="meta-detail-row">
                  <span className="meta-detail-label">Session ID</span>
                  <span className="meta-detail-val" title={activeSession?.sessionId}>
                    {activeSession?.sessionId}
                  </span>
                  <button className="copy-btn" onClick={() => handleCopy(activeSession?.sessionId, "sid")}>
                    {copiedField === "sid" ? <FiCheck size={12} /> : <FiCopy size={12} />}
                  </button>
                </div>
                <div className="meta-detail-row">
                  <span className="meta-detail-label">User ID</span>
                  <span className="meta-detail-val">{activeSession?.userId}</span>
                  <button className="copy-btn" onClick={() => handleCopy(activeSession?.userId, "uid")}>
                    {copiedField === "uid" ? <FiCheck size={12} /> : <FiCopy size={12} />}
                  </button>
                </div>
                <div className="meta-detail-row">
                  <span className="meta-detail-label">Institute</span>
                  <span className="meta-detail-val">{activeSession?.platformType === "Marketplace" ? "Wayvida" : activeSession?.instituteId}</span>
                </div>
                <div className="meta-detail-row">
                  <span className="meta-detail-label">Page/Screen</span>
                  <span className="meta-detail-val">{activeSession?.pageScreen}</span>
                </div>
                <div className="meta-detail-row">
                  <span className="meta-detail-label">Device</span>
                  <span className="meta-detail-val">{activeSession?.device}</span>
                </div>
                <div className="meta-detail-row">
                  <span className="meta-detail-label">Created At</span>
                  <span className="meta-detail-val">{activeSession?.datetime}</span>
                </div>
                <div className="meta-detail-row">
                  <span className="meta-detail-label">Total Messages</span>
                  <span className="meta-detail-val">{activeMessages.length}</span>
                </div>
                <div className="meta-detail-row">
                  <span className="meta-detail-label">Avg Latency</span>
                  <span className="meta-detail-val">2m 14s</span>
                </div>
                <div className="meta-detail-row">
                  <span className="meta-detail-label">Total Tokens</span>
                  <span className="meta-detail-val">{activeSession?.totalTokens || "1,240"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
