import React, { useState } from "react";
import { FiX, FiChevronDown, FiSearch } from "react-icons/fi";
import "./ChatbotAuditLog.css";

export default function ChatbotAuditLog() {
  const [platform, setPlatform] = useState("Marketplace");
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);

  const [sessionFilter, setSessionFilter] = useState("All Sessions");
  const [isSessionOpen, setIsSessionOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("Today");

  const handleClearFilters = () => {
    setPlatform("Marketplace");
    setSessionFilter("All Sessions");
    setSearchQuery("");
    setDateFilter("Today");
    setIsPlatformOpen(false);
    setIsSessionOpen(false);
  };

  return (
    <div className="audit-log-page">
      <div className="filter-header-bar">
        <h1 className="audit-log-title">Chatbot Audit Logs (0)</h1>
        <div className="filters-group">
          <div className="custom-dropdown-container">
            <button
              className="filter-btn"
              onClick={() => {
                setIsPlatformOpen(!isPlatformOpen);
                setIsSessionOpen(false);
              }}
            >
              <span>{platform}</span>
              <FiChevronDown size={14} className="dropdown-arrow" />
            </button>
            {isPlatformOpen && (
              <div className="custom-dropdown-menu">
                <div
                  className={`dropdown-option ${platform === "Marketplace" ? "active" : ""}`}
                  onClick={() => { setPlatform("Marketplace"); setIsPlatformOpen(false); }}
                >
                  Marketplace
                </div>
                <div
                  className={`dropdown-option ${platform === "Whitelabel" ? "active" : ""}`}
                  onClick={() => { setPlatform("Whitelabel"); setIsPlatformOpen(false); }}
                >
                  Whitelabel
                </div>
              </div>
            )}
          </div>

          <div className="custom-dropdown-container">
            <button
              className="filter-btn"
              onClick={() => {
                setIsSessionOpen(!isSessionOpen);
                setIsPlatformOpen(false);
              }}
            >
              <span>{sessionFilter}</span>
              <FiChevronDown size={14} className="dropdown-arrow" />
            </button>
            {isSessionOpen && (
              <div className="custom-dropdown-menu">
                <div
                  className={`dropdown-option ${sessionFilter === "All Sessions" ? "active" : ""}`}
                  onClick={() => { setSessionFilter("All Sessions"); setIsSessionOpen(false); }}
                >
                  All Sessions
                </div>
                <div
                  className={`dropdown-option ${sessionFilter === "Active" ? "active" : ""}`}
                  onClick={() => { setSessionFilter("Active"); setIsSessionOpen(false); }}
                >
                  Active
                </div>
                <div
                  className={`dropdown-option ${sessionFilter === "Completed" ? "active" : ""}`}
                  onClick={() => { setSessionFilter("Completed"); setIsSessionOpen(false); }}
                >
                  Completed
                </div>
              </div>
            )}
          </div>

          <div className="search-box-wrapper">
            <input
              type="text"
              className="filter-search-input"
              placeholder="Search by institute"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch size={14} className="search-icon" />
          </div>

          {dateFilter && (
            <div className="filter-badge">
              <span>{dateFilter}</span>
              <button className="badge-close-btn" onClick={() => setDateFilter("")}>
                <FiX size={14} />
              </button>
            </div>
          )}

          <button className="clear-btn" onClick={handleClearFilters}>
            Clear
          </button>
        </div>
      </div>

      <div className="audit-content-card">
        <p className="placeholder-text">Audit log records will be displayed here.</p>
      </div>
    </div>
  );
}
