import React, { useState } from "react";
import styles from "./styles.module.css";

const ForeignSearchFilter = ({ filters, onFilterChange }) => {
  // 가격 범위 상태
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  // 시설 목록
  const facilityOptions = [
    "수영장",
    "피트니스 센터",
    "스파",
    "레스토랑",
    "바",
    "비즈니스 센터",
    "주차장",
    "와이파이",
    "룸서비스",
    "조식",
  ];

  // 별점 옵션
  const ratingOptions = [
    { value: 4.5, label: "4.5점 이상" },
    { value: 4.0, label: "4.0점 이상" },
    { value: 3.5, label: "3.5점 이상" },
    { value: 3.0, label: "3.0점 이상" },
  ];

  // 가격 범위 변경 핸들러
  const handlePriceChange = (type) => (e) => {
    const value = parseInt(e.target.value);
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    onFilterChange({ ...filters, priceRange: newPriceRange });
  };

  // 평점 변경 핸들러
  const handleRatingChange = (value) => {
    onFilterChange({ ...filters, rating: value });
  };

  // 시설 선택 핸들러
  const handleFacilityChange = (facility) => {
    const newFacilities = filters.facilities.includes(facility)
      ? filters.facilities.filter((f) => f !== facility)
      : [...filters.facilities, facility];
    onFilterChange({ ...filters, facilities: newFacilities });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>필터</h2>

      {/* 가격 범위 필터 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>가격 범위</h3>
        <div className={styles.priceInputs}>
          <input
            type="number"
            value={priceRange.min}
            onChange={handlePriceChange("min")}
            placeholder="최소 가격"
            className={styles.priceInput}
          />
          <span className={styles.priceSeparator}>-</span>
          <input
            type="number"
            value={priceRange.max}
            onChange={handlePriceChange("max")}
            placeholder="최대 가격"
            className={styles.priceInput}
          />
        </div>
      </div>

      {/* 평점 필터 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>평점</h3>
        <div className={styles.ratingOptions}>
          {ratingOptions.map(({ value, label }) => (
            <label key={value} className={styles.ratingOption}>
              <input
                type="radio"
                checked={filters.rating === value}
                onChange={() => handleRatingChange(value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 시설 필터 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>시설</h3>
        <div className={styles.facilities}>
          {facilityOptions.map((facility) => (
            <label key={facility} className={styles.facility}>
              <input
                type="checkbox"
                checked={filters.facilities.includes(facility)}
                onChange={() => handleFacilityChange(facility)}
              />
              <span>{facility}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForeignSearchFilter;
