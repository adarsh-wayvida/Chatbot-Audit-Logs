import React, { useState, useEffect, useRef } from "react";
import { FiX, FiChevronDown, FiRotateCcw, FiRefreshCw, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import DualMonthCalendar from "../components/common/DualMonthCalendar";
import SessionDetailModal from "../components/common/SessionDetailModal";
import "./ChatbotAuditLog.css";

const auditLogData = [
  { datetime: "11 Nov 2026, 11:35:28 am", sessionId: "3e7bca6f-2ce-193caee3-9462-4327-a632", userId: "6853b34e34ed110441a82a98", users: "Sajan", instituteId: "neyyar_app", institute: "marketplace", intent: "greeting", pageScreen: "course_listing", platformType: "Whitelabel" },
  { datetime: "11 Nov 2026, 9:37:34 am", sessionId: "b65cdfff-d6e-7b0abe62-e566-4ae0-a10c", userId: "public", users: "guest", instituteId: "neyyar_app", institute: "marketplace", intent: "greeting", pageScreen: "login"  , platformType: "Marketplace"},
  { datetime: "11 Nov 2026, 9:37:30 am", sessionId: "aad2bc43-057-ef626968-a278-4831-b92e", userId: "public", users: "guest", instituteId: "neyyar_app", institute: "marketplace", intent: "greeting", pageScreen: "home"  , platformType: "Marketplace"},
  { datetime: "10 Nov 2026, 12:23:41 pm", sessionId: "56a9aa20-2b9-deea88a8-38d0-438d-ad7a", userId: "6af2ac5c09f6f71b892a014e", users: "cuser", instituteId: "neyyar_app", institute: "marketplace", intent: "greeting", pageScreen: "home"  , platformType: "Marketplace"},
  { datetime: "6 Nov 2026, 12:43:43 pm", sessionId: "9b12211f-70f-1396489d-9aca-4a19-acb7", userId: "68480b4ab596e8311a2f9810", users: "Developer C", instituteId: "neyyar_app", institute: "marketplace", intent: "greeting", pageScreen: "course_listing"  , platformType: "Whitelabel"},
  { datetime: "6 Nov 2026, 10:28:11 am", sessionId: "e218994b-f10-ce6ad3c1-a0d1-475e-bbd7", userId: "6ae80e06a6e0c1f44390b12c", users: "auser", instituteId: "neyyar_app", institute: "marketplace", intent: "greeting", pageScreen: "course_listing"  , platformType: "Marketplace"},
  { datetime: "4 Nov 2026, 5:45:02 pm", sessionId: "2718bd6f-890-7861ba8e-2181-41a7-8cc6", userId: "6a43850da2abf17f89b9e143", users: "amalch", instituteId: "neyyar_app", institute: "marketplace", intent: "greeting", pageScreen: "profile_details"  , platformType: "Marketplace"},
  { datetime: "2 Nov 2026, 11:42:30 am", sessionId: "43842334-051-35962f1b-2a17-49fe-9f7b", userId: "66f69f8be795a28b9c6d3102", users: "Ratheesh Babu", instituteId: "neyyar_app", institute: "marketplace", intent: "greeting", pageScreen: "discovery-and-requirements..."  , platformType: "Marketplace"},
  { datetime: "31 Oct 2026, 6:05:20 pm", sessionId: "107b843d-414-2f146aa1-a260-4514-8cbe", userId: "public", users: "guest", instituteId: "neyyar_app", institute: "marketplace", intent: "explore_course", pageScreen: "course_details"  , platformType: "Marketplace"},
  { datetime: "31 Oct 2026, 6:01:45 pm", sessionId: "12003d85-365-c36b982c-6f6a-4033-9885", userId: "public", users: "guest", instituteId: "neyyar_app", institute: "marketplace", intent: "greeting", pageScreen: "course_details"  , platformType: "Marketplace"},
  { datetime: "31 Oct 2026, 6:01:07 pm", sessionId: "fb94d05a-f4a-3d8682fe-3195-49b7-b403", userId: "public", users: "guest", instituteId: "neyyar_app", institute: "marketplace", intent: "explore_course", pageScreen: "course_details"  , platformType: "Marketplace"},
  { datetime: "31 Oct 2026, 3:46:08 pm", sessionId: "d8f59328-b15-9fbafe8d-4d13-4cc1-a02b", userId: "public", users: "guest", instituteId: "neyyar_app", institute: "marketplace", intent: "creator", pageScreen: "course_details"  , platformType: "Marketplace"},
  { datetime: "31 Oct 2026, 3:43:45 pm", sessionId: "be7da0db-ef4-b79656f9-dce7-4f7a-9b7a", userId: "69e709ad5eb1082c351f77e4", users: "Manukrishna", instituteId: "neyyar_app", institute: "marketplace", intent: "creator", pageScreen: "course_details"  , platformType: "Whitelabel"},
  { datetime: "30 Oct 2026, 10:59:21 am", sessionId: "480d813e-cef-c391f58b-ac9f-4a2e-9dc5", userId: "public", users: "guest", instituteId: "neyyar_app", institute: "marketplace", intent: "greeting", pageScreen: "home"  , platformType: "Marketplace"},
  { datetime: "28 Oct 2026, 2:24:40 pm", sessionId: "f4f0407f-11e-b746caee-6d22-4ac1-b82a", userId: "6a6c78856d39d91f20b4105a", users: "Daliya C Abraham", instituteId: "neyyar_app", institute: "marketplace", intent: "my_content", pageScreen: "course_details"  , platformType: "Marketplace"},
  { datetime: "28 Oct 2026, 12:27:26 pm", sessionId: "14da506d-7b2-43a2d945-8e72-4ea2-b00f", userId: "69e709ad5eb1082c351f77e4", users: "Manukrishna", instituteId: "neyyar_app", institute: "marketplace", intent: "creator", pageScreen: "pricing"  , platformType: "Whitelabel"},
  { datetime: "27 Oct 2026, 4:47:52 pm", sessionId: "7a5f90bf-ebd-32cdfdfd-15f5-4a93-acbb", userId: "6ae0871fb52194c7b8109d3e", users: "coursenls", instituteId: "neyyar_app", institute: "marketplace", intent: "explore_course", pageScreen: "course_details"  , platformType: "Marketplace"},
  { datetime: "27 Oct 2026, 3:54:11 pm", sessionId: "11e786ea-19e-6b080ac4-a386-4a56-b013", userId: "6a6c78856d39d91f20b4105a", users: "Daliya C Abraham", instituteId: "neyyar_app", institute: "marketplace", intent: "ambiguous", pageScreen: "home"  , platformType: "Marketplace"},
  { datetime: "27 Oct 2026, 2:35:01 pm", sessionId: "f051bfcf-de6-98a34a0a-94f5-48e0-9f23", userId: "public", users: "guest", instituteId: "neyyar_app", institute: "marketplace", intent: "greeting", pageScreen: "home", platformType: "Marketplace" }
];

const messagesMap = {
  "3e7bca6f-2ce...": [
    { id: 1, role: "user", timestamp: "11 Nov 2026, 11:35:28 am", text: "Hi", intent: "greeting", page: "course_listing" },
    { id: 2, role: "assistant", timestamp: "11 Nov 2026, 11:35:29 am", latency: "120 ms", text: "Hi Sajan! Looking for PSC exam bundles?", options: ["View bundles", "Compare plans"], tokens: { prompt: 100, completion: 40, total: 140 } },
    { id: 3, role: "user", timestamp: "11 Nov 2026, 11:36:00 am", text: "show bundles", intent: "explore_course", page: "course_listing" },
    { id: 4, role: "assistant", timestamp: "11 Nov 2026, 11:36:02 am", latency: "340 ms", text: "Here are the top PSC bundles with discounts.", options: ["Buy now"], tokens: { prompt: 200, completion: 90, total: 290 } },
  ],
  "b65cdfff-d6e...": [
    { id: 1, role: "user", timestamp: "11 Nov 2026, 9:37:34 am", text: "login help", intent: "greeting", page: "login" },
    { id: 2, role: "assistant", timestamp: "11 Nov 2026, 9:37:35 am", latency: "59 ms", text: "I can help with login. Did you forget your password?", options: ["Reset password", "Request OTP"], tokens: { prompt: 80, completion: 30, total: 110 } },
    { id: 3, role: "user", timestamp: "11 Nov 2026, 9:37:50 am", text: "request otp", intent: "otp", page: "login" },
    { id: 4, role: "assistant", timestamp: "11 Nov 2026, 9:37:52 am", latency: "210 ms", text: "OTP sent to your registered email.", options: [], tokens: { prompt: 60, completion: 20, total: 80 } },
  ],
  "aad2bc43-057...": [
    { id: 1, role: "user", timestamp: "11 Nov 2026, 9:37:30 am", text: "hi", intent: "greeting", page: "home" },
    { id: 2, role: "assistant", timestamp: "11 Nov 2026, 9:37:31 am", latency: "45 ms", text: "Welcome to Wayvida! How can I assist?", options: ["Browse courses", "Webinars"], tokens: { prompt: 70, completion: 25, total: 95 } },
  ],
  "56a9aa20-2b9...": [
    { id: 1, role: "user", timestamp: "10 Nov 2026, 12:23:41 pm", text: "join as educator", intent: "creator", page: "home" },
    { id: 2, role: "assistant", timestamp: "10 Nov 2026, 12:23:45 pm", latency: "8000 ms", text: "Enterprise plan is best for serious teaching business.", options: ["Open plans"], tokens: { prompt: 480, completion: 210, total: 690 } },
  ],
  "9b12211f-70f...": [
    { id: 1, role: "user", timestamp: "6 Nov 2026, 12:43:43 pm", text: "api access", intent: "api", page: "course_listing" },
    { id: 2, role: "assistant", timestamp: "6 Nov 2026, 12:43:44 pm", latency: "100 ms", text: "Developer API docs are available in settings.", options: ["Open docs"], tokens: { prompt: 90, completion: 40, total: 130 } },
  ],
  "e218994b-f10...": [
    { id: 1, role: "user", timestamp: "6 Nov 2026, 10:28:11 am", text: "teaching tips", intent: "greeting", page: "course_listing" },
    { id: 2, role: "assistant", timestamp: "6 Nov 2026, 10:28:12 am", latency: "200 ms", text: "Here are faculty listings and teaching resources.", options: ["Browse"], tokens: { prompt: 110, completion: 50, total: 160 } },
  ],
  "2718bd6f-890...": [
    { id: 1, role: "user", timestamp: "4 Nov 2026, 5:45:02 pm", text: "update profile", intent: "profile", page: "profile_details" },
    { id: 2, role: "assistant", timestamp: "4 Nov 2026, 5:45:03 pm", latency: "150 ms", text: "You can update email and notifications in settings.", options: ["Open settings"], tokens: { prompt: 95, completion: 45, total: 140 } },
  ],
  "43842334-051...": [
    { id: 1, role: "user", timestamp: "2 Nov 2026, 11:42:30 am", text: "custom app setup", intent: "requirements", page: "discovery-and-requirements..." },
    { id: 2, role: "assistant", timestamp: "2 Nov 2026, 11:42:35 am", latency: "5000 ms", text: "Gathering requirements for your custom app.", options: ["Continue"], tokens: { prompt: 300, completion: 150, total: 450 } },
  ],
  "107b843d-414...": [
    { id: 1, role: "user", timestamp: "31 Oct 2026, 6:05:20 pm", text: "course duration?", intent: "explore_course", page: "course_details" },
    { id: 2, role: "assistant", timestamp: "31 Oct 2026, 6:05:21 pm", latency: "180 ms", text: "This course runs 12 weeks with free trial.", options: ["Enroll"], tokens: { prompt: 100, completion: 50, total: 150 } },
  ],
  "12003d85-365...": [
    { id: 1, role: "user", timestamp: "31 Oct 2026, 6:01:45 pm", text: "certificate?", intent: "greeting", page: "course_details" },
    { id: 2, role: "assistant", timestamp: "31 Oct 2026, 6:01:46 pm", latency: "120 ms", text: "Certificates available on completion.", options: ["View"], tokens: { prompt: 80, completion: 30, total: 110 } },
  ],
  "fb94d05a-f4a...": [
    { id: 1, role: "user", timestamp: "31 Oct 2026, 6:01:07 pm", text: "instructor qualifications?", intent: "explore_course", page: "course_details" },
    { id: 2, role: "assistant", timestamp: "31 Oct 2026, 6:01:08 pm", latency: "140 ms", text: "Our instructors are industry experts.", options: ["View profiles"], tokens: { prompt: 90, completion: 40, total: 130 } },
  ],
  "d8f59328-b15...": [
    { id: 1, role: "user", timestamp: "31 Oct 2026, 3:46:08 pm", text: "refund policy", intent: "creator", page: "course_details" },
    { id: 2, role: "assistant", timestamp: "31 Oct 2026, 3:46:09 pm", latency: "160 ms", text: "7-day refund on all courses.", options: ["Read policy"], tokens: { prompt: 85, completion: 35, total: 120 } },
  ],
  "be7da0db-ef4...": [
    { id: 1, role: "user", timestamp: "31 Oct 2026, 3:43:45 pm", text: "creator studio tools", intent: "creator", page: "course_details" },
    { id: 2, role: "assistant", timestamp: "31 Oct 2026, 3:43:46 pm", latency: "200 ms", text: "Studio supports video upload up to 2GB.", options: ["Open studio"], tokens: { prompt: 100, completion: 45, total: 145 } },
  ],
  "480d813e-cef...": [
    { id: 1, role: "user", timestamp: "30 Oct 2026, 10:59:21 am", text: "mobile app", intent: "greeting", page: "home" },
    { id: 2, role: "assistant", timestamp: "30 Oct 2026, 10:59:22 am", latency: "90 ms", text: "Download Wayvida app on iOS and Android.", options: ["App Store", "Play Store"], tokens: { prompt: 70, completion: 30, total: 100 } },
  ],
  "f4f0407f-11e...": [
    { id: 1, role: "user", timestamp: "28 Oct 2026, 2:24:40 pm", text: "content access", intent: "my_content", page: "course_details" },
    { id: 2, role: "assistant", timestamp: "28 Oct 2026, 2:24:41 pm", latency: "130 ms", text: "Your enrolled content is under My Courses.", options: ["Open"], tokens: { prompt: 85, completion: 35, total: 120 } },
  ],
  "14da506d-7b2...": [
    { id: 1, role: "user", timestamp: "28 Oct 2026, 12:27:26 pm", text: "pricing plans", intent: "creator", page: "pricing" },
    { id: 2, role: "assistant", timestamp: "28 Oct 2026, 12:27:27 pm", latency: "150 ms", text: "Yearly vs monthly comparison available.", options: ["Compare"], tokens: { prompt: 95, completion: 40, total: 135 } },
  ],
  "7a5f90bf-ebd...": [
    { id: 1, role: "user", timestamp: "27 Oct 2026, 4:47:52 pm", text: "webinar hosting", intent: "explore_course", page: "course_details" },
    { id: 2, role: "assistant", timestamp: "27 Oct 2026, 4:47:53 pm", latency: "170 ms", text: "Webinar quota depends on plan.", options: ["View plans"], tokens: { prompt: 90, completion: 40, total: 130 } },
  ],
  "11e786ea-19e...": [
    { id: 1, role: "user", timestamp: "27 Oct 2026, 3:54:11 pm", text: "help", intent: "ambiguous", page: "home" },
    { id: 2, role: "assistant", timestamp: "27 Oct 2026, 3:54:12 pm", latency: "110 ms", text: "Routing you to helpdesk.", options: ["Contact"], tokens: { prompt: 75, completion: 30, total: 105 } },
  ],
  "f051bfcf-de6...": [
    { id: 1, role: "user", timestamp: "27 Oct 2026, 2:35:01 pm", text: "hi", intent: "greeting", page: "home" },
    { id: 2, role: "assistant", timestamp: "27 Oct 2026, 2:35:02 pm", latency: "60 ms", text: "Welcome to Wayvida platform features.", options: ["Explore"], tokens: { prompt: 70, completion: 30, total: 100 } },
  ],
};

export default function ChatbotAuditLog() {
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsPlatformOpen(false);
        setIsUserTypeOpen(false);
        setIsInstituteOpen(false);
        setIsLimitOpen(false);
        setIsDateOpen(false);
        setShowDualCal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [platform, setPlatform] = useState("All Platform");
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);

  const [userType, setUserType] = useState("All User Type");
  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);

  const [instituteId, setInstituteId] = useState("");
  const [isInstituteOpen, setIsInstituteOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const [recordsPerPage, setRecordsPerPage] = useState("50");
  const [isRecordsOpen, setIsRecordsOpen] = useState(false);

  const [dateLabel, setDateLabel] = useState("Date");
  const [selectedSessionIndex, setSelectedSessionIndex] = useState(null);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [showDualCal, setShowDualCal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const presets = ["Today", "Yesterday", "This Week", "Last Week", "This Month", "Last Month", "This Year", "Last Year"];

  const handleClearAll = () => {
    setPlatform("");
    setUserType("");
    setInstituteId("");
    setUserId("");
    setDateLabel("Date");
    setStartDate("");
    setEndDate("");
    setRecordsPerPage("50");
    setIsPlatformOpen(false);
    setIsUserTypeOpen(false);
    setIsInstituteOpen(false);
    setIsDateOpen(false);
    setShowDualCal(false);
  };

  const closeAll = () => {
    setIsPlatformOpen(false);
    setIsUserTypeOpen(false);
    setIsLimitOpen(false);
    setIsDateOpen(false);
    setShowDualCal(false);
  };

  const defaultMessages = [
    { id: 1, role: "user", timestamp: "26 Oct 2026, 12:46:52 pm", text: "Hi", intent: "greeting", page: "home" },
    { id: 2, role: "assistant", timestamp: "26 Oct 2026, 12:46:52 pm", latency: "59 ms", text: "Hi! How can I help you today on Wayvida?", options: ["Find a course", "Browse webinars", "My courses"], tokens: { prompt: 120, completion: 45, total: 165 } },
    { id: 3, role: "user", timestamp: "26 Oct 2026, 12:47:21 pm", text: "join as educator", intent: "creator", page: "home" },
    { id: 4, role: "assistant", timestamp: "26 Oct 2026, 12:47:26 pm", latency: "8479 ms", text: "If you're joining as an educator, the yearly flat-rate view shows **Enterprise** as the highest current membership tier, and it's the best fit when you want platform features for a serious teaching business.", options: ["Open plans"], tokens: { prompt: 480, completion: 210, total: 690 } },
    { id: 5, role: "user", timestamp: "26 Oct 2026, 12:48:10 pm", text: "what is the price of professional plan?", intent: "pricing", page: "pricing" },
    { id: 6, role: "assistant", timestamp: "26 Oct 2026, 12:48:15 pm", latency: "13535 ms", text: "Based on what you want to do, the **Professional Plan** looks like the best fit. It is priced at ₹149,999/year with 0% commission.", options: ["View plans"], tokens: { prompt: 510, completion: 320, total: 830 } },
    { id: 7, role: "user", timestamp: "26 Oct 2026, 12:49:01 pm", text: "do you have white label upgrade?", intent: "whitelabel", page: "pricing" },
    { id: 8, role: "assistant", timestamp: "26 Oct 2026, 12:49:05 pm", latency: "3210 ms", text: "Yes! You have a white-label upgrade option if you need your own branded app or website.", options: ["Contact team"], tokens: { prompt: 290, completion: 110, total: 400 } },
  ];

  const filteredLogs = auditLogData.filter((item) => {
    if (platform && platform !== "" && platform !== "All Platform" && item.platformType !== platform) return false;
    if (userType && userType !== "" && userType !== "All User Type") {
      if (userType.toLowerCase() === "guest" && item.users.toLowerCase() !== "guest") return false;
      if (userType.toLowerCase() === "users" && item.users.toLowerCase() === "guest") return false;
    }
    if (platform === "Whitelabel" && instituteId && instituteId !== "" && instituteId !== "All" && item.instituteId !== instituteId) return false;
    if (userId && !item.userId.toLowerCase().includes(userId.toLowerCase()) && !item.users.toLowerCase().includes(userId.toLowerCase())) return false;
    return true;
  }).slice(0, parseInt(recordsPerPage, 10) || 50).map((item) => ({
    ...item,
    messages: messagesMap[item.sessionId] || defaultMessages,
  }));

  return (
    <div className="audit-log-page">
      <div className="audit-log-header">
        <h1 className="audit-log-title">Chatbot Audit Logs ({filteredLogs.length})</h1>

        <div className="header-right-group">
          <div className="custom-dropdown-container">
            <button className={`filter-dropdown-trigger limit-trigger ${isRecordsOpen ? "active" : ""}`} onClick={() => { setIsRecordsOpen(!isRecordsOpen); setIsPlatformOpen(false); setIsUserTypeOpen(false); setIsInstituteOpen(false); setIsDateOpen(false); }}>
              <span>{`${recordsPerPage} Records Per Page`}</span>
              <FiChevronDown size={14} className="dropdown-arrow" />
            </button>
            {isRecordsOpen && (
              <div className="custom-dropdown-menu">
                {["10", "50", "100"].map((opt) => (
                  <div key={opt} className={`dropdown-item ${recordsPerPage === opt ? "selected" : ""}`} onClick={() => { setRecordsPerPage(opt); setIsRecordsOpen(false); }}>
                    {`${opt} Records Per Page`}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pagination-arrows">
            <button className="page-arrow-btn"><FiChevronLeft size={18} /></button>
            <button className="page-arrow-btn"><FiChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      <div className="filter-header-bar">
        <div className="filters-group" ref={filterRef}>
          {/* Platform */}
          <div className="custom-dropdown-container">
            <button className={`filter-dropdown-trigger ${isPlatformOpen ? "active" : ""} ${!platform ? "placeholder" : ""}`} onClick={() => { setIsPlatformOpen(!isPlatformOpen); setIsUserTypeOpen(false); setIsLimitOpen(false); setIsDateOpen(false); }}>
              <span>{platform === "" ? "Platform Type" : platform}</span>
              {platform !== "" && <FiX size={14} className="clear-icon" onClick={(e) => { e.stopPropagation(); setPlatform(""); }} />}
              <FiChevronDown size={14} className="dropdown-arrow" />
            </button>
            {isPlatformOpen && (
              <div className="custom-dropdown-menu">
                {["All Platform", "Marketplace", "Whitelabel"].map((opt) => (
                  <div key={opt} className={`dropdown-item ${platform === opt ? "selected" : ""}`} onClick={() => { setPlatform(opt); setIsPlatformOpen(false); }}>
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User type */}
          <div className="custom-dropdown-container">
            <button className={`filter-dropdown-trigger ${isUserTypeOpen ? "active" : ""} ${!userType ? "placeholder" : ""}`} onClick={() => { setIsUserTypeOpen(!isUserTypeOpen); setIsPlatformOpen(false); setIsLimitOpen(false); setIsDateOpen(false); }}>
              <span>{userType === "" ? "User type" : userType}</span>
              {userType !== "" && <FiX size={14} className="clear-icon" onClick={(e) => { e.stopPropagation(); setUserType(""); }} />}
              <FiChevronDown size={14} className="dropdown-arrow" />
            </button>
            {isUserTypeOpen && (
              <div className="custom-dropdown-menu">
                {["All User Type", "Guest", "Users"].map((opt) => (
                  <div key={opt} className={`dropdown-item ${userType === opt ? "selected" : ""}`} onClick={() => { setUserType(opt); setIsUserTypeOpen(false); }}>
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Institute ID (only for Whitelabel) */}
          {platform === "Whitelabel" && (
            <div className="custom-dropdown-container">
              <button className={`filter-dropdown-trigger ${isInstituteOpen ? "active" : ""} ${!instituteId ? "placeholder" : ""}`} onClick={() => { setIsInstituteOpen(!isInstituteOpen); setIsPlatformOpen(false); setIsUserTypeOpen(false); setIsLimitOpen(false); setIsDateOpen(false); }}>
                <span>{instituteId || "Institute ID"}</span>
                {instituteId && <FiX size={14} className="clear-icon" onClick={(e) => { e.stopPropagation(); setInstituteId(""); }} />}
                <FiChevronDown size={14} className="dropdown-arrow" />
              </button>
              {isInstituteOpen && (
                <div className="custom-dropdown-menu">
                  {["All", "neyyar_app"].map((opt) => (
                    <div key={opt} className={`dropdown-item ${instituteId === opt ? "selected" : ""}`} onClick={() => { setInstituteId(opt); setIsInstituteOpen(false); }}>
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* User ID */}
          <div className="input-with-clear">
            <input
              type="text"
              className="filter-input"
              placeholder="User ID (guest or UUID)"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            {userId && <FiX className="clear-icon" size={14} onClick={() => setUserId("")} />}
          </div>

          {/* Date */}
          <div className="custom-dropdown-container">
            <button className={`filter-dropdown-trigger ${isDateOpen ? "active" : ""}`} onClick={() => { setIsDateOpen(!isDateOpen); setIsPlatformOpen(false); setIsUserTypeOpen(false); setIsLimitOpen(false); setShowDualCal(false); }}>
              <span>{dateLabel}</span>
              {dateLabel !== "Date" && <FiX size={14} className="clear-icon" onClick={(e) => { e.stopPropagation(); setDateLabel("Date"); setStartDate(""); setEndDate(""); }} />}
              <FiChevronDown size={14} className="dropdown-arrow" />
            </button>
            {isDateOpen && (
              <div className="date-popover-menu">
                <div className="presets-list">
                  {presets.map((preset) => (
                    <div key={preset} className="preset-item" onClick={() => { setDateLabel(preset); setIsDateOpen(false); }}>
                      {preset}
                    </div>
                  ))}
                </div>
                <div className="custom-range-trigger-wrapper">
                  <div className="custom-range-trigger" onClick={(e) => { e.stopPropagation(); setShowDualCal(!showDualCal); }}>
                    <span>{startDate || "Start date"}</span>
                    <span className="arrow-sep">&rarr;</span>
                    <span>{endDate || "End date"}</span>
                  </div>
                  {showDualCal && (
                    <DualMonthCalendar
                      onSelectRange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                        setDateLabel("Custom Range");
                        setShowDualCal(false);
                        setIsDateOpen(false);
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="clear-btn" onClick={handleClearAll}>Clear</button>
        </div>
      </div>

      <div className="audit-table-container">
        <table className="audit-table">
          <thead>
            <tr>
              <th>Datetime</th>
              <th>Total Chats</th>
              <th>User ID</th>
              <th>Users</th>
              {platform !== "Marketplace" && <th>Institute ID</th>}
              <th>Intent</th>
              <th>Page/Screen</th>
              <th>Platform Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", color: "#8c8c8c" }}>No audit logs found matching the selected filters.</td>
              </tr>
            ) : (
              filteredLogs.map((row, idx) => (
                <tr key={idx} onClick={() => setSelectedSessionIndex(idx)} style={{ cursor: "pointer" }}>
                  <td>{row.datetime}</td>
                  <td>{row.totalChats || row.messages.length}</td>
                  <td>{row.userId}</td>
                  <td>{row.users}</td>
                  {platform !== "Marketplace" && <td>{row.instituteId}</td>}
                  <td>{row.intent}</td>
                  <td>{row.pageScreen}</td>
                  <td>{row.platformType}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedSessionIndex !== null && filteredLogs[selectedSessionIndex] && (
        <SessionDetailModal
          sessionData={filteredLogs[selectedSessionIndex]}
          selectedIndex={selectedSessionIndex}
          totalSessions={filteredLogs.length}
          onPrevSession={() => setSelectedSessionIndex((i) => Math.max(0, i - 1))}
          onNextSession={() => setSelectedSessionIndex((i) => Math.min(filteredLogs.length - 1, i + 1))}
          onClose={() => setSelectedSessionIndex(null)}
        />
      )}
    </div>
  );
}

