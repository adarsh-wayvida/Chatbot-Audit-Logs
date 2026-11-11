import React from "react";
import {
  FiHome, FiSettings, FiList, FiGrid, FiUser, FiKey,
  FiVolume2, FiUserCheck, FiShield, FiTv, FiCreditCard,
  FiLayout, FiChevronDown, FiMail, FiMessageSquare, FiBookOpen,
  FiVideo, FiAward, FiBarChart2, FiFolder, FiMessageCircle,
  FiShare2, FiHelpCircle, FiGlobe
} from "react-icons/fi";

export default function Sidebar({ activeNav, onNavigate }) {
  return (
    <aside className="admin-sidebar">
      <div className="nav-group">
        <div className="group-title">HOME</div>
        <div className="nav-item active">
          <FiHome className="nav-icon" />
          <span>Home</span>
        </div>
        <div className="nav-item">
          <FiSettings className="nav-icon" />
          <span>Home Configuration</span>
        </div>
      </div>

      <div className="nav-group">
        <div className="group-title">MASTER</div>
        <div className="nav-item">
          <FiList className="nav-icon" />
          <span>Category</span>
          <FiChevronDown className="arrow-icon" />
        </div>
        <div className="nav-item"><FiGrid className="nav-icon" /><span>Institution</span></div>
        <div className="nav-item"><FiUser className="nav-icon" /><span>User</span></div>
        <div className="nav-item"><FiKey className="nav-icon" /><span>Role</span></div>
        <div className="nav-item"><FiVolume2 className="nav-icon" /><span>Faculty</span></div>
        <div className="nav-item"><FiUserCheck className="nav-icon" /><span>Teacher</span></div>
        <div className="nav-item"><FiShield className="nav-icon" /><span>Licence</span></div>
        <div className="nav-item"><FiTv className="nav-icon" /><span>Banner</span></div>
        <div className="nav-item"><FiCreditCard className="nav-icon" /><span>Membership</span></div>
        <div className="nav-item">
          <FiLayout className="nav-icon" />
          <span>Landing Page</span>
          <FiChevronDown className="arrow-icon" />
        </div>
        <div className="nav-item"><FiAward className="nav-icon" /><span>Coupon</span></div>
        <div className="nav-item"><FiShare2 className="nav-icon" /><span>Referral Program</span></div>
        <div className="nav-item"><FiGrid className="nav-icon" /><span>Branch</span></div>
        <div className="nav-item"><FiUser className="nav-icon" /><span>Learners</span></div>
        <div className="nav-item"><FiBarChart2 className="nav-icon" /><span>Lead Management</span></div>
        <div className="nav-item"><FiMessageSquare className="nav-icon" /><span>AI Prompt</span></div>
        <div className="nav-item"><FiMessageCircle className="nav-icon" /><span>AI Tutor</span></div>
        <div
          className={`nav-item ${activeNav === "Chatbot Audit Log" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("Chatbot Audit Log")}
        >
          <FiMessageCircle className="nav-icon" />
          <span>Chatbot Audit Log</span>
        </div>
        <div className="nav-item"><FiFolder className="nav-icon" /><span>Content Center</span></div>
      </div>

      <div className="nav-group">
        <div className="group-title">MARKETING</div>
        <div className="nav-item"><FiMail className="nav-icon" /><span>Email</span><FiChevronDown className="arrow-icon" /></div>
        <div className="nav-item"><FiMessageSquare className="nav-icon" /><span>Whatsapp</span><FiChevronDown className="arrow-icon" /></div>
      </div>

      <div className="nav-group">
        <div className="group-title">PRODUCT</div>
        <div className="nav-item"><FiBookOpen className="nav-icon" /><span>Course</span></div>
        <div className="nav-item"><FiVideo className="nav-icon" /><span>Live Class</span></div>
        <div className="nav-item"><FiVideo className="nav-icon" /><span>Webinar</span></div>
        <div className="nav-item"><FiShare2 className="nav-icon" /><span>Affiliate Marketing</span><FiChevronDown className="arrow-icon" /></div>
        <div className="nav-item"><FiBarChart2 className="nav-icon" /><span>Report</span><FiChevronDown className="arrow-icon" /></div>
        <div className="nav-item"><FiFolder className="nav-icon" /><span>Content Resource Pool</span></div>
        <div className="nav-item"><FiMessageCircle className="nav-icon" /><span>Discussion Forum</span></div>
        <div className="nav-item"><FiHelpCircle className="nav-icon" /><span>Interaction</span><FiChevronDown className="arrow-icon" /></div>
        <div className="nav-item"><FiGrid className="nav-icon" /><span>App Build Requests</span></div>
        <div className="nav-item"><FiHelpCircle className="nav-icon" /><span>Feedback</span></div>
        <div className="nav-item"><FiShare2 className="nav-icon" /><span>Integration</span></div>
        <div className="nav-item"><FiGlobe className="nav-icon" /><span>SEO Settings</span></div>
        <div className="nav-item"><FiSettings className="nav-icon" /><span>Settings</span></div>
      </div>
    </aside>
  );
}
