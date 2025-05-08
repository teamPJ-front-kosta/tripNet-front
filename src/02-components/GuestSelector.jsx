import React from 'react';
import styles from './GuestSelector.module.css';

const GuestSelector = ({
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  childAges,
  setChildAges,
  onClose
}) => {
  const handleAdultChange = (increment) => {
    const newCount = adultCount + increment;
    if (newCount >= 1 && newCount <= 8) {
      setAdultCount(newCount);
    }
  };

  const handleChildChange = (increment) => {
    const newCount = childCount + increment;
    if (newCount >= 0 && newCount <= 8) {
      setChildCount(newCount);
      if (increment > 0) {
        setChildAges([...childAges, 0]);
      } else {
        setChildAges(childAges.slice(0, -1));
      }
    }
  };

  const handleChildAgeChange = (index, age) => {
    const newAges = [...childAges];
    newAges[index] = parseInt(age);
    setChildAges(newAges);
  };

  return (
    <div className={styles.guestSelectorOverlay} onClick={onClose}>
      <div className={styles.guestSelector} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>인원 선택</h3>
          <button className={styles.closeButton} onClick={onClose}>✕</button>
        </div>

        <div className={styles.guestTypeContainer}>
          <div className={styles.guestType}>
            <div>
              <h4>성인</h4>
              <p className={styles.description}>만 18세 이상</p>
            </div>
            <div className={styles.controls}>
              <button
                className={styles.controlButton}
                onClick={() => handleAdultChange(-1)}
                disabled={adultCount <= 1}
              >
                -
              </button>
              <span className={styles.count}>{adultCount}</span>
              <button
                className={styles.controlButton}
                onClick={() => handleAdultChange(1)}
                disabled={adultCount >= 8}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.guestType}>
            <div>
              <h4>청소년/아동</h4>
              <p className={styles.description}>만 18세 미만</p>
            </div>
            <div className={styles.controls}>
              <button
                className={styles.controlButton}
                onClick={() => handleChildChange(-1)}
                disabled={childCount <= 0}
              >
                -
              </button>
              <span className={styles.count}>{childCount}</span>
              <button
                className={styles.controlButton}
                onClick={() => handleChildChange(1)}
                disabled={childCount >= 8}
              >
                +
              </button>
            </div>
          </div>

          {childCount > 0 && (
            <div className={styles.childAges}>
              <h4>아동 나이</h4>
              <div className={styles.ageSelectors}>
                {childAges.map((age, index) => (
                  <select
                    key={index}
                    value={age}
                    onChange={(e) => handleChildAgeChange(index, e.target.value)}
                    className={styles.ageSelect}
                  >
                    {[...Array(18)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}세
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.applyButton} onClick={onClose}>
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestSelector; 