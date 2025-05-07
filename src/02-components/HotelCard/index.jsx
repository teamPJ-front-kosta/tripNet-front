import React from "react";
import styles from "./styles.module.css";

const HotelCard = ({ hotel, onClick }) => {
  const { hotelName, imageUrl, offers } = hotel;
  // 가격 표시: offers가 있으면 첫 번째 offer의 가격, 없으면 "가격 정보 없음"
  const price =
    offers && offers.length > 0 ? offers[0].price?.total || "-" : null;

  return (
    <div className={styles.card} onClick={onClick}>
      {/* 호텔 이미지 */}
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={hotelName} className={styles.image} />
      </div>

      {/* 호텔 정보 */}
      <div className={styles.content}>
        {/* 호텔 이름 */}
        <div className={styles.header}>
          <h3 className={styles.name}>{hotelName}</h3>
        </div>

        {/* 가격 정보 */}
        <div className={styles.priceSection}>
          <span className={styles.price}>
            {price ? `$${price}` : "가격 정보 없음"}
          </span>
          {price && <span className={styles.night}>/ 1박</span>}
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
