import React, { useState } from "react";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import styles from "./styles.module.css";
import PaymentModal from "../PaymentModal";
import { useLocation } from "react-router-dom";

const dummyOptions = [
  {
    id: 1,
    refundable: false,
    optionName: "Room Only",
    marginType: "제로마진",
    rateType: "NON-REFUNDABLE RATE",
  },
  {
    id: 2,
    refundable: false,
    optionName: "Room Only",
    marginType: "제로마진",
    rateType: "NON-REFUNDABLE RATE",
  },
  {
    id: 3,
    refundable: true,
    optionName: "Room Only",
    marginType: "제로마진",
    rateType: "REFUNDABLE RATE",
    refundDeadline: "25년 7월 13일 06:59까지",
  },
  {
    id: 4,
    refundable: true,
    optionName: "Room Only",
    marginType: "제로마진",
    rateType: "REFUNDABLE RATE",
    refundDeadline: "25년 7월 13일 06:59까지",
  },
];

const HotelOptionDetail = () => {
  const location = useLocation();
  const {
    checkIn,
    checkOut,
    adults,
    nights,
    room,
    priceUSD,
    originalPriceUSD,
  } = location.state || {};

  // nights 계산 (state에서 오면 사용, 없으면 계산)
  const calcNights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.round(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
          )
        )
      : 1;
  const finalNights = nights || calcNights;

  const [selectedOption, setSelectedOption] = useState(dummyOptions[0].id);
  const [showPayment, setShowPayment] = useState(false);

  const selected = dummyOptions.find((o) => o.id === selectedOption);

  // room 정보
  const roomName = room?.type || "객실";
  const roomImage =
    room?.imageUrl ||
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";

  // 실제 옵션 가격 계산 (USD, nights 곱하기)
  const price = Number(priceUSD);
  const originalPrice = Number((price * 1.1).toFixed(2));
  const totalPrice = price * finalNights;

  return (
    <div className={styles.optionDetailContainer}>
      {/* 상단 필터 정보 */}
      <div className={styles.optionFilterBox}>
        <div className={styles.optionFilterRow}>
          <span className={styles.filterItem}>
            <AiOutlineCalendar className={styles.filterIcon} />
            {checkIn && checkOut
              ? `${checkIn} ~ ${checkOut} · ${finalNights}박`
              : "-"}
          </span>
          <span className={styles.filterItem}>
            <AiOutlineUser className={styles.filterIcon} />
            {adults ? `성인 ${adults}명` : "성인 2명"}
          </span>
        </div>
      </div>
      {/* 객실 썸네일+이름+날짜+인원 */}
      <div className={styles.roomSummaryBox}>
        <img src={roomImage} alt={roomName} className={styles.roomThumb} />
        <div className={styles.roomSummaryInfo}>
          <div className={styles.roomName}>{roomName}</div>
          <div className={styles.roomDatePeople}>
            {checkIn && checkOut
              ? `${checkIn} ~ ${checkOut} · ${finalNights}박`
              : "-"}
          </div>
          <div className={styles.roomDatePeople}>
            {adults ? `성인 ${adults}명` : "성인 2명"}
          </div>
        </div>
      </div>
      {/* 옵션 리스트 */}
      <div className={styles.optionList}>
        <div className={styles.optionListTitle}>
          옵션 선택 <span className={styles.optionRequired}>필수</span>
        </div>
        {dummyOptions.map((opt) => (
          <label key={opt.id} className={styles.optionItem}>
            <input
              type="radio"
              name="roomOption"
              checked={selectedOption === opt.id}
              onChange={() => setSelectedOption(opt.id)}
            />
            <div className={styles.optionInfoBox}>
              <div className={styles.optionRefundRow}>
                {opt.rateType === "NON-REFUNDABLE RATE" ? (
                  <span className={styles.refundBadgeNo}>
                    <FaTimesCircle /> 환불 불가
                  </span>
                ) : (
                  <span className={styles.refundBadgeYes}>
                    <FaCheckCircle /> 예약 무료 취소 가능{" "}
                    <span className={styles.refundDeadline}>
                      ({opt.refundDeadline})
                    </span>
                  </span>
                )}
              </div>
              <div className={styles.optionName}>{opt.optionName}</div>
              <div className={styles.optionPriceRow}>
                <span className={styles.optionOriginalPrice}>
                  제로마진가 ${originalPrice.toFixed(2)}
                </span>
                <span className={styles.optionPrice}>
                  ${price.toFixed(2)} / {finalNights}박{" "}
                  <span className={styles.optionMargin}>{opt.marginType}</span>
                </span>
              </div>
              <div className={styles.optionTax}>
                세금 포함 총 ${(price * finalNights).toFixed(2)}
              </div>
            </div>
          </label>
        ))}
      </div>
      {/* 하단 예약하기 스티키 푸터 */}
      <div className={styles.stickyFooter}>
        <div>
          <span className={styles.stickyPrice}>
            ${totalPrice.toFixed(2)} / {finalNights}박
          </span>
          <span className={styles.stickyMargin}>제로마진</span>
        </div>
        <button
          className={styles.stickyReserveBtn}
          onClick={() => setShowPayment(true)}
        >
          예약하기
        </button>
      </div>
      <PaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        hotelName={roomName}
        roomName={roomName}
        checkIn={checkIn}
        checkOut={checkOut}
        nights={finalNights}
        adults={adults}
        refundable={selected.refundable}
        pricePerNight={price}
        currency="USD"
      />
    </div>
  );
};

export default HotelOptionDetail;
