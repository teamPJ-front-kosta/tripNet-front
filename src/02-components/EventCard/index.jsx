import React, { useState } from "react";
import styles from "./styles.module.css";

const EventCard = ({ title, subtitle, imageUrl, alt, linkUrl }) => {
  const [imageError, setImageError] = useState(false);

  // 도시 이름에 따라 적절한 대체 이미지 URL 생성
  const getBackupImageUrl = () => {
    const cityName = subtitle?.toLowerCase() || "";

    // 도시 이름에 따른 대체 이미지 (Unsplash에서 가져옴)
    const cityImages = {
      파리: "https://source.unsplash.com/featured/?paris,hotel",
      도쿄: "https://source.unsplash.com/featured/?tokyo,hotel",
      서울: "https://source.unsplash.com/featured/?seoul,hotel",
      방콕: "https://source.unsplash.com/featured/?bangkok,hotel",
      호놀룰루: "https://source.unsplash.com/featured/?honolulu,hotel",
      세부: "https://source.unsplash.com/featured/?cebu,hotel",
      오사카: "https://source.unsplash.com/featured/?osaka,hotel",
      호치민: "https://source.unsplash.com/featured/?hochimin,hotel",
    };

    // 도시 이름이 일치하는 이미지 찾기
    for (const [city, image] of Object.entries(cityImages)) {
      if (cityName.includes(city.toLowerCase())) {
        return image;
      }
    }

    // 일치하는 도시가 없으면 기본 호텔 이미지 반환
    return "https://source.unsplash.com/featured/?hotel,room";
  };

  const handleImageError = () => {
    console.log("이미지 로딩 실패:", imageUrl);
    setImageError(true);
  };

  return (
    <div className={styles.eventCard}>
      <a href={linkUrl} className={styles.eventLink}>
        <div className={styles.eventImageContainer}>
          <img
            src={imageError ? getBackupImageUrl() : imageUrl}
            alt={alt}
            className={styles.eventImage}
            onError={handleImageError}
          />
        </div>
        <div className={styles.eventContent}>
          <h3 className={styles.eventTitle}>{title}</h3>
          <p className={styles.eventSubtitle}>{subtitle}</p>
        </div>
      </a>
    </div>
  );
};

export default EventCard;
