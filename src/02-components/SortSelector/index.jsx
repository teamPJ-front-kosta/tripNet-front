import React, { useState } from "react";
import styles from "./styles.module.css";

const SortSelector = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "recommended", label: "추천순" },
    { value: "priceAsc", label: "가격 낮은순" },
    { value: "priceDesc", label: "가격 높은순" },
    { value: "rating", label: "평점순" },
    { value: "review", label: "리뷰 많은순" },
  ];

  const currentOption =
    sortOptions.find((option) => option.value === currentSort) ||
    sortOptions[0];

  const handleSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.selector} onClick={() => setIsOpen(!isOpen)}>
        <span>{currentOption.label}</span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 4L6 7.5L9.5 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {sortOptions.map(({ value, label }) => (
            <button
              key={value}
              className={`${styles.option} ${
                value === currentSort ? styles.selected : ""
              }`}
              onClick={() => handleSelect(value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortSelector;
