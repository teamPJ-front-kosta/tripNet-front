import React from "react";
import {
  MdWifi,
  MdLocalDrink,
  MdAirportShuttle,
  MdAccessTime,
} from "react-icons/md";
import { FaParking, FaWheelchair, FaStar } from "react-icons/fa";
import styles from "./styles.module.css";

// 날짜 포맷 변환 함수
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[date.getDay()];
  return `${month}월 ${day}일(${dayOfWeek})`;
}

const facilityIcons = {
  "무료 WiFi": <MdWifi />,
  자판기: <MdLocalDrink />,
  "공항 교통편(요금 별도)": <MdAirportShuttle />,
  "24시간 운영 프런트 데스크": <MdAccessTime />,
  "노외 주차장": <FaParking />,
  "휠체어 전용 통로": <FaWheelchair />,
};

const HotelSummaryCard = ({
  hotel,
  checkIn,
  checkOut,
  adults,
  children,
  onReserve,
}) => {
  if (!hotel) return null;
  const {
    hotelName,
    starRating = 4,
    hotelType = "호텔",
    rating = 4.2,
    reviewCount = 32,
    facilities = [
      "무료 WiFi",
      "자판기",
      "공항 교통편(요금 별도)",
      "24시간 운영 프런트 데스크",
      "노외 주차장",
      "휠체어 전용 통로",
    ],
    address = "1-2-2 Kinshi, Sumida-ku, Tokyo, Japan",
    images = hotel.imageUrl ? [hotel.imageUrl] : [],
  } = hotel;

  // 가격/날짜/인원 더미 (실제 데이터로 교체 가능)
  const price = 220527;
  const originalPrice = 264440;
  const marginType = "제로마진";

  // 날짜/인원 표시
  const datePeople = `${formatDate(checkIn)} ~ ${formatDate(
    checkOut
  )} · 성인 ${adults}명${children > 0 ? `, 아동 ${children}명` : ""}`;

  return (
    <section className={styles.summaryCard}>
      <div className={styles.imageSlider}>
        <img src={images[0]} alt={hotelName} className={styles.mainImage} />
      </div>
      <div className={styles.infoLeft}>
        <h2 className={styles.hotelName}>{hotelName}</h2>
        <div className={styles.hotelMeta}>
          <span>
            {starRating}성급 · {hotelType}
          </span>
          <span className={styles.ratingRow}>
            <FaStar className={styles.starIcon} /> {rating} · 후기 {reviewCount}
            개
          </span>
        </div>
        <div className={styles.facilitiesGrid}>
          {facilities.map((f, i) => (
            <div className={styles.facilityItem} key={i}>
              {facilityIcons[f] || <MdWifi />}
              <span>{f}</span>
            </div>
          ))}
        </div>
        <div className={styles.address}>
          <div>
            <strong>위치:</strong> 위도: {hotel.latitude}, 경도:{" "}
            {hotel.longitude}
          </div>
          <div>
            <strong>호텔 ID:</strong> {hotel.hotelId}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelSummaryCard;
