import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const EventCard = ({ title, subtitle, imageUrl, alt, linkUrl }) => {
  const [imageError, setImageError] = useState(false);

  // 도시 이름에 따라 적절한 대체 이미지 URL 생성
  const getBackupImageUrl = () => {
    const cityName = subtitle?.toLowerCase() || "";

    // 해외/국내 도시 모두 포함
    const cityImages = {
      파리: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      도쿄: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      서울: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      방콕: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      호놀룰루:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      세부: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      오사카:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      호치민:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      부산: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      제주: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      강원도:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      경주: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      여수: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      속초: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
      강릉: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80",
    };

    for (const [city, image] of Object.entries(cityImages)) {
      if (cityName.includes(city.toLowerCase())) {
        return image;
      }
    }
    // 기본 호텔 이미지
    return "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80";
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={styles.eventCard}>
      <Link to={linkUrl} className={styles.eventLink}>
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
      </Link>
    </div>
  );
};

export default EventCard;
