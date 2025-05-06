import React, { useState } from "react";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import styles from "./styles.module.css";
import PaymentModal from "../PaymentModal";

const dummyOptions = [
  {
    id: 1,
    refundable: false,
    optionName: "Room Only",
    price: 361072,
    originalPrice: 432974,
    marginType: "제로마진",
    taxIncluded: 1588718,
    rateType: "NON-REFUNDABLE RATE",
  },
  {
    id: 2,
    refundable: false,
    optionName: "Room Only",
    price: 401188,
    originalPrice: 481075,
    marginType: "제로마진",
    taxIncluded: 1765227,
    rateType: "NON-REFUNDABLE RATE",
  },
  {
    id: 3,
    refundable: true,
    optionName: "Room Only",
    price: 448255,
    originalPrice: 537514,
    marginType: "제로마진",
    taxIncluded: 1972321,
    rateType: "REFUNDABLE RATE",
    refundDeadline: "25년 7월 13일 06:59까지",
  },
  {
    id: 4,
    refundable: true,
    optionName: "Room Only",
    price: 498061,
    originalPrice: 597239,
    marginType: "제로마진",
    taxIncluded: 2191471,
    rateType: "REFUNDABLE RATE",
    refundDeadline: "25년 7월 13일 06:59까지",
  },
];

const HotelOptionDetail = ({
  checkIn = "2025-07-14",
  checkOut = "2025-07-18",
  nights = 4,
  adults = 2,
  roomName = "studio",
  roomImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
}) => {
  const [selectedOption, setSelectedOption] = useState(dummyOptions[0].id);
  const [showPayment, setShowPayment] = useState(false);

  const selected = dummyOptions.find((o) => o.id === selectedOption);

  return (
    <div className={styles.optionDetailContainer}>
      {/* 상단 필터 정보 */}
      <div className={styles.optionFilterBox}>
        <div className={styles.optionFilterRow}>
          <span className={styles.filterItem}>
            <AiOutlineCalendar className={styles.filterIcon} />
            7/14(월) ~ 7/18(금) · 4박
          </span>
          <span className={styles.filterItem}>
            <AiOutlineUser className={styles.filterIcon} />
            {adults}명
          </span>
        </div>
      </div>
      {/* 객실 썸네일+이름+날짜+인원 */}
      <div className={styles.roomSummaryBox}>
        <img src={roomImage} alt={roomName} className={styles.roomThumb} />
        <div className={styles.roomSummaryInfo}>
          <div className={styles.roomName}>{roomName}</div>
          <div className={styles.roomDatePeople}>
            7월 14일(월) ~ 7월 18일(금) · 4박
          </div>
          <div className={styles.roomDatePeople}>성인 {adults}명</div>
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
                  제로마진가 {opt.originalPrice.toLocaleString()}원
                </span>
                <span className={styles.optionPrice}>
                  {opt.price.toLocaleString()}원/박{" "}
                  <span className={styles.optionMargin}>{opt.marginType}</span>
                </span>
              </div>
              <div className={styles.optionTax}>
                세금 포함 총 {opt.taxIncluded.toLocaleString()}원
              </div>
            </div>
          </label>
        ))}
      </div>
      {/* 하단 예약하기 스티키 푸터 */}
      <div className={styles.stickyFooter}>
        <div>
          <span className={styles.stickyPrice}>
            {selected.price.toLocaleString()}원/박
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
        nights={nights}
        adults={adults}
        refundable={selected.refundable}
        pricePerNight={selected.price}
      />
    </div>
  );
};

export default HotelOptionDetail;
 