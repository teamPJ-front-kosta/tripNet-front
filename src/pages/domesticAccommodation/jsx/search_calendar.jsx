import { useState } from 'react';
import '../css/search_calendar.css';

function SearchCalendar({ onDateSelect }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '';
  };

  const handleDateClick = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    
    // Prevent selecting dates before today
    if (selectedDate < today) {
      return;
    }
    
    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else {
      if (selectedDate < startDate) {
        setStartDate(selectedDate);
        setEndDate(null);
      } else {
        setEndDate(selectedDate);
        onDateSelect({
          startDate: formatDate(startDate),
          endDate: formatDate(selectedDate)
        });
      }
    }
  };

  const isDateInRange = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return startDate && endDate && date >= startDate && date <= endDate;
  };

  const isStartDate = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return startDate && date.getTime() === startDate.getTime();
  };

  const isEndDate = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return endDate && date.getTime() === endDate.getTime();
  };

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = new Date().toDateString() === date.toDateString();
      const inRange = isDateInRange(day);
      const isStart = isStartDate(day);
      const isEnd = isEndDate(day);
      const isDisabled = date < today;

      let className = 'calendar-day';
      if (inRange) className += ' in-range';
      if (isStart) className += ' start-date';
      if (isEnd) className += ' end-date';
      if (isToday) className += ' today';
      if (isDisabled) className += ' disabled';

      days.push(
        <div
          key={day}
          className={className}
          onClick={() => !isDisabled && handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <h2>{currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}</h2>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      <div className="calendar-weekdays">
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </div>
      <div className="calendar-days">
        {renderCalendar()}
      </div>
    </div>
  );
}

export default SearchCalendar; 