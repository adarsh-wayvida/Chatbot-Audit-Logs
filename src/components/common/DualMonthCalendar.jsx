import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import "./DualMonthCalendar.css";

export default function DualMonthCalendar({ onSelectRange }) {
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);

  const todayDate = 11;

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const novDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const decDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDayClick = (day, monthIndex) => {
    const fullDate = monthIndex === 0 ? `2026-11-${day}` : `2026-12-${day}`;

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(fullDate);
      setSelectedEnd(null);
    } else {
      setSelectedEnd(fullDate);
      if (onSelectRange) {
        onSelectRange(selectedStart, fullDate);
      }
    }
  };

  return (
    <div className="dual-month-calendar-popover">
      <div className="calendar-nav-header">
        <div className="nav-arrows-left">
          <FiChevronsLeft size={16} className="nav-icon" />
          <FiChevronLeft size={16} className="nav-icon" />
        </div>
        <div className="month-titles">
          <span className="month-title">Nov 2026</span>
          <span className="month-title">Dec 2026</span>
        </div>
        <div className="nav-arrows-right">
          <FiChevronRight size={16} className="nav-icon" />
          <FiChevronsRight size={16} className="nav-icon" />
        </div>
      </div>

      <div className="months-wrapper">
        <div className="month-grid">
          <div className="days-row">
            {daysOfWeek.map((day) => (
              <span key={day} className="day-label">{day}</span>
            ))}
          </div>
          <div className="dates-grid">
            {novDays.map((date) => {
              const dateStr = `2026-11-${date}`;
              const isToday = date === todayDate;
              const isStart = selectedStart === dateStr;
              const isEnd = selectedEnd === dateStr;

              return (
                <button
                  key={`nov-${date}`}
                  className={`date-cell ${isToday ? "today-outline" : ""} ${isStart ? "selected-start" : ""} ${isEnd ? "selected-end" : ""}`}
                  onClick={() => handleDayClick(date, 0)}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>

        <div className="month-grid">
          <div className="days-row">
            {daysOfWeek.map((day) => (
              <span key={`dec-lbl-${day}`} className="day-label">{day}</span>
            ))}
          </div>
          <div className="dates-grid">
            {decDays.map((date) => {
              const dateStr = `2026-12-${date}`;
              const isStart = selectedStart === dateStr;
              const isEnd = selectedEnd === dateStr;

              return (
                <button
                  key={`dec-${date}`}
                  className={`date-cell ${isStart ? "selected-start" : ""} ${isEnd ? "selected-end" : ""}`}
                  onClick={() => handleDayClick(date, 1)}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
