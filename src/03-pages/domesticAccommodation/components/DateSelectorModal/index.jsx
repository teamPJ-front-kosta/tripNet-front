import React from "react";
import styles from "./styles.module.css";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";

const DateSelectorModal = ({
  startDate,
  endDate,
  handleDateChange,
  selectedDateRange,
  onClose,
  onApply,
}) => {
  return (
    <div className={styles.datePickerOverlay} onClick={onClose}>
      <div
        className={styles.datePickerContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.datePickerHeader}>
          <h3>날짜 선택</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.datePickerContent}>
          <div className={styles.selectedDateDisplay}>
            {selectedDateRange || "체크인 - 체크아웃 날짜를 선택해주세요"}
          </div>

          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            locale={ko}
            minDate={new Date()}
            monthsShown={2}
            calendarClassName={styles.customCalendar}
          />
        </div>

        <div className={styles.datePickerActions}>
          <button
            className={styles.resetButton}
            onClick={() => handleDateChange([null, null])}
          >
            초기화
          </button>
          <button
            className={styles.applyButton}
            onClick={onApply}
            disabled={!startDate || !endDate}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelectorModal;
