import React from "react";
import styles from "./styles.module.css";
import { FaTimesCircle } from "react-icons/fa";

function formatDate(dateStr, time) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[date.getDay()];
  return `${y}년 ${m}월 ${d}일 (${dayOfWeek}) ${time}`;
}

const PaymentModal = ({
  open,
  onClose,
  hotelName,
  roomName,
  checkIn,
  checkOut,
  nights,
  adults,
  refundable,
  pricePerNight, // USD 단가
  cityTax = 67.6,
  currency = "USD",
}) => {
  if (!open) return null;
  // 계산
  const roomCount = 1;
  const pricePerNightNum = Number(pricePerNight);
  const totalRoomPrice = pricePerNightNum * nights;
  const tax = Math.round(totalRoomPrice * 0.11);
  const discount = -tax;
  const finalPrice = totalRoomPrice + tax + discount;

  // 표기용 단위
  const currencySymbol = currency === "USD" ? "$" : "₩";

  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
          <FaTimesCircle size={28} />
        </button>
        <h2 className={styles.modalTitle}>결제 전, 확인하세요</h2>
        <div className={styles.roomName}>{roomName}</div>
        <div className={styles.infoTable}>
          <div>체크인</div>
          <div>{formatDate(checkIn, "16시 00분")}</div>
          <div>체크아웃</div>
          <div>{formatDate(checkOut, "12시 00분")}</div>
          <div>인원</div>
          <div>성인 {adults}명</div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.refundBadgeRow}>
          <span className={refundable ? styles.refundYes : styles.refundNo}>
            {refundable ? "환불가능" : "환불불가"}
          </span>
        </div>
        <div className={styles.nightsRow}>
          객실 {roomCount}개 x {nights}박
          <span className={styles.nightsPrice}>
            {currencySymbol}
            {totalRoomPrice.toFixed(2)}
          </span>
        </div>
        <div className={styles.priceDetailBox}>
          <div className={styles.priceRow}>
            <span>객실 이용료</span>
            <span>
              {currencySymbol}
              {(totalRoomPrice - tax).toFixed(2)}
            </span>
          </div>
          <div className={styles.priceRow}>
            <span>세금 및 수수료</span>
            <span>
              {currencySymbol}
              {tax.toFixed(2)}
            </span>
          </div>
        </div>
        <div className={styles.discountRow}>
          <span className={styles.discountLabel}>총 할인금액</span>
          <span className={styles.discountValue}>
            {currencySymbol}
            {discount.toFixed(2)}
          </span>
        </div>
        <div className={styles.zeroMarginBadgeRow}>
          <span className={styles.zeroMarginBadge}>제로마진</span> 할인
          <span className={styles.discountValue}>
            {currencySymbol}
            {discount.toFixed(2)}
          </span>
        </div>
        <div className={styles.finalPriceRow}>
          <span className={styles.finalPriceLabel}>최종 결제 금액</span>
          <span className={styles.finalPrice}>
            {currencySymbol}
            {finalPrice.toFixed(2)}
          </span>
        </div>
        <div className={styles.cityTaxRow}>
          <span>City Tax</span>
          <span>€{cityTax}</span>
        </div>
        <div className={styles.notice}>
          표시된 요금은 USD(미국 달러) 기준입니다.
          <br />
          현장 결제 금액은 현재 환율을 기준으로 하며, 여행시점에 따라 달라질 수
          있습니다.
        </div>
        <button className={styles.payBtn}>
          {currencySymbol}
          {finalPrice.toFixed(2)} / {nights}박 결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
