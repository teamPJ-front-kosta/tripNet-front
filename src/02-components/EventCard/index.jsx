import React, { useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
import styles from "./styles.module.css";

const EventCard = ({ title, subtitle, imageUrl, alt, linkUrl }) => {
  const [imageError, setImageError] = useState(false);

  // 도시 이름에 따라 적절한 대체 이미지 URL 생성
  const getBackupImageUrl = () => {
    const cityName = subtitle?.toLowerCase() || "";

    // 도시 이름에 따른 대체 이미지 (Unsplash에서 가져옴)
    const cityImages = {
<<<<<<< HEAD
      파리: "https://source.unsplash.com/featured/?paris,hotel",
      도쿄: "https://source.unsplash.com/featured/?tokyo,hotel",
      서울: "https://source.unsplash.com/featured/?seoul,hotel",
      방콕: "https://source.unsplash.com/featured/?bangkok,hotel",
      호놀룰루: "https://source.unsplash.com/featured/?honolulu,hotel",
      세부: "https://source.unsplash.com/featured/?cebu,hotel",
      오사카: "https://source.unsplash.com/featured/?osaka,hotel",
      호치민: "https://source.unsplash.com/featured/?hochimin,hotel",
=======
      파리: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      도쿄: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      서울: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      방콕: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      호놀룰루: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      세부: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      오사카: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      호치민: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      부산: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      제주: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      강원도: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      경주: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      여수: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      속초: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      강릉: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
    };

    // 도시 이름이 일치하는 이미지 찾기
    for (const [city, image] of Object.entries(cityImages)) {
      if (cityName.includes(city.toLowerCase())) {
        return image;
      }
    }

<<<<<<< HEAD
    // 일치하는 도시가 없으면 기본 호텔 이미지 반환
    return "https://source.unsplash.com/featured/?hotel,room";
=======
    // 일치하는 도시가 없으면 기본 숙소 이미지 반환
    return "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80";
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
  };

  const handleImageError = () => {
    console.log("이미지 로딩 실패:", imageUrl);
    setImageError(true);
  };

  return (
    <div className={styles.eventCard}>
<<<<<<< HEAD
      <Link to={linkUrl} className={styles.eventLink}>
=======
      <a href={linkUrl} className={styles.eventLink}>
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
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
<<<<<<< HEAD
      </Link>
=======
      </a>
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
    </div>
  );
};

export default EventCard;
