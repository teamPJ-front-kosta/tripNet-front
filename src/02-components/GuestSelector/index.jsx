import React, { useState } from "react";
import styles from "./styles.module.css";

const GuestSelector = ({
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  childAges,
  setChildAges,
  onClose,
}) => {
  const [showAgeSelector, setShowAgeSelector] = useState(false);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);

  // 성인 인원 증가
  const increaseAdultCount = (e) => {
    e.stopPropagation();
    if (adultCount < 10) {
      setAdultCount(adultCount + 1);
    }
  };

  // 성인 인원 감소
  const decreaseAdultCount = (e) => {
    e.stopPropagation();
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
    }
  };

  // 아동 인원 증가
  const increaseChildCount = (e) => {
    e.stopPropagation();
    if (childCount < 6) {
      const newCount = childCount + 1;
      setChildCount(newCount);

      // 아이가 추가되면 나이 선택기 표시
      setCurrentChildIndex(childAges.length);
      setShowAgeSelector(true);
    }
  };

  // 아동 인원 감소
  const decreaseChildCount = (e) => {
    e.stopPropagation();
    if (childCount > 0) {
      const newCount = childCount - 1;
      setChildCount(newCount);

      // 아이 수 줄일 때 마지막 나이 제거
      if (childAges.length > newCount) {
        setChildAges(childAges.slice(0, newCount));
      }

      // 아이가 없으면 나이 선택기 숨김
      if (newCount === 0) {
        setShowAgeSelector(false);
      }
    }
  };

  // 나이 선택
  const selectAge = (age) => {
    let newAges = [...childAges];

    // 새로운 아이 추가인 경우
    if (currentChildIndex >= childAges.length) {
      newAges.push(age);
    } else {
      // 기존 아이 나이 변경
      newAges[currentChildIndex] = age;
    }

    setChildAges(newAges);
    setShowAgeSelector(false);
  };

  // 특정 아이의 나이 태그 제거
  const removeChildAge = (index, e) => {
    e.stopPropagation();

    // 해당 아이의 나이 태그 제거 및 인원 감소
    const newAges = childAges.filter((_, i) => i !== index);
    setChildAges(newAges);
    const newCount = childCount - 1;
    setChildCount(newCount);

    // 모든 아이가 제거되면 나이 선택기 숨김
    if (newCount === 0) {
      setShowAgeSelector(false);
    }
  };

  // 특정 아이의 나이 수정
  const editChildAge = (index) => {
    setCurrentChildIndex(index);
    setShowAgeSelector(true);
  };

  // 나이 옵션 생성 (만 14세 ~ 만 17세)
  const ageOptions = [
    { value: 17, label: "만 17세" },
    { value: 16, label: "만 16세" },
    { value: 15, label: "만 15세" },
    { value: 14, label: "만 14세" },
  ];

  return (
    <div className={styles.guestSelectorContainer}>
      <div className={styles.guestTypeRow}>
        <div className={styles.guestTypeLabel}>성인</div>
        <div className={styles.countControls}>
          <button
            className={styles.countButton}
            onClick={decreaseAdultCount}
            disabled={adultCount <= 1}
          >
            -
          </button>
          <span className={styles.countValue}>{adultCount}</span>
          <button
            className={styles.countButton}
            onClick={increaseAdultCount}
            disabled={adultCount >= 10}
          >
            +
          </button>
        </div>
      </div>

      <div className={styles.guestTypeRow}>
        <div>
          <div className={styles.guestTypeLabel}>청소년/아동</div>
          <div className={styles.guestTypeSubLabel}>만 17세 이하</div>
        </div>
        <div className={styles.countControls}>
          <button
            className={styles.countButton}
            onClick={decreaseChildCount}
            disabled={childCount <= 0}
          >
            -
          </button>
          <span className={styles.countValue}>{childCount}</span>
          <button
            className={styles.countButton}
            onClick={increaseChildCount}
            disabled={childCount >= 6}
          >
            +
          </button>
        </div>
      </div>

      {childCount > 0 && (
        <div className={styles.childAgesSection}>
          <div className={styles.childAgesTitle}>
            청소년/아동 {childAges.length > 0 ? childAges.length : childCount}명
          </div>

          {/* 이미 선택된 나이 태그들 표시 */}
          {childAges.length > 0 && (
            <div className={styles.childAgesTags}>
              {childAges.map((age, index) => (
                <div
                  key={index}
                  className={styles.childAgeTag}
                  onClick={() => editChildAge(index)}
                >
                  <span>만 {age}세</span>
                  <button
                    className={styles.removeAgeButton}
                    onClick={(e) => removeChildAge(index, e)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 나이 선택기 */}
          {showAgeSelector && (
            <div className={styles.ageSelector}>
              <div className={styles.ageSelectorTitle}>
                {currentChildIndex < childAges.length
                  ? `${currentChildIndex + 1}번째 아동의 나이 변경`
                  : `${childAges.length + 1}번째 아동의 나이를 선택해주세요`}
              </div>
              <div className={styles.ageOptions}>
                {ageOptions.map((option) => (
                  <button
                    key={option.value}
                    className={styles.ageOption}
                    onClick={() => selectAge(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className={styles.actionButtons}>
        <button className={styles.applyButton} onClick={onClose}>
          적용
        </button>
      </div>
    </div>
  );
};

export default GuestSelector;
