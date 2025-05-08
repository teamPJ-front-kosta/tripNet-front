import React from "react";
import styles from "./styles.module.css";
import EventCard from "../EventCard";

const HotelListSection = ({ loading, error, hotels }) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>호텔 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>!</div>
        <p className={styles.errorMessage}>{error}</p>
        <button
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className={styles.hotelListSection}>
      <h2 className={styles.sectionTitle}>추천 호텔</h2>
      <div className={styles.hotelGrid}>
        {hotels.map((hotel) => (
          <EventCard
<<<<<<< HEAD
            key={hotel.hotelId}
=======
            key={hotel.id}
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
            title={hotel.title}
            subtitle={hotel.subtitle}
            imageUrl={hotel.imageUrl}
            alt={hotel.alt}
            linkUrl={hotel.linkUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelListSection;
