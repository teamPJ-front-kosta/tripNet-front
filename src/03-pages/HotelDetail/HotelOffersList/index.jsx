import React from "react";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import { FaBed, FaBath, FaUtensils, FaBell } from "react-icons/fa";
import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";

const HotelOffersList = ({ offers, checkIn, checkOut, adults, children }) => {
  const navigate = useNavigate();
  const { cityCode, hotelId } = useParams();
  // 날짜/인원 표시
  const getNights = (checkIn, checkOut) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    return Math.max(1, Math.round((outDate - inDate) / (1000 * 60 * 60 * 24)));
  };
  const nights = getNights(checkIn, checkOut);
  const dateStr = `${checkIn} ~ ${checkOut} · ${nights}박`;
  const peopleStr = `성인 ${adults}명${
    children > 0 ? ", 아동 " + children + "명" : ""
  }`;

  if (!offers || offers.length === 0) {
    return <div className={styles.empty}>예약 가능한 객실이 없습니다.</div>;
  }

  return (
    <div className={styles.offersListSection}>
      <h2 className={styles.roomListTitle}>객실 선택</h2>
      <div className={styles.filterSummaryBox}>
        <span className={styles.filterItem}>
          <AiOutlineCalendar className={styles.filterIcon} />
          {dateStr}
        </span>
        <span className={styles.filterItem}>
          <AiOutlineUser className={styles.filterIcon} />
          {peopleStr}
        </span>
      </div>
      <div className={styles.offersList}>
        {offers.map((offer) => (
          <div key={offer.id} className={styles.offerCard}>
            <div className={styles.roomImageWrapper}>
              <img
                src={offer.room?.imageUrl}
                alt={offer.room?.type || "객실 이미지"}
                className={styles.roomImage}
              />
            </div>
            <div className={styles.offerInfo}>
              <h4 className={styles.roomType}>{offer.room?.type}</h4>
              <div className={styles.roomMetaRow}>
                <span className={styles.roomMeta}>
                  <FaBed /> {offer.room?.typeEstimated?.bedType || "베드"}
                </span>
                <span className={styles.roomMeta}>
                  <AiOutlineUser /> 성인 {adults}명
                </span>
                <span className={styles.roomMeta}>
                  <FaBath /> 욕실
                </span>
                <span className={styles.roomMeta}>
                  <FaUtensils /> 미니주방
                </span>
                <span className={styles.roomMeta}>
                  <FaBell /> 모닝콜
                </span>
              </div>
              <div className={styles.roomDesc}>
                {offer.room?.description?.text}
              </div>
              <div className={styles.priceRow}>
                <span className={styles.price}>
                  {offer.price?.total
                    ? `$${offer.price.total} / 1박`
                    : "가격 정보 없음"}
                </span>
                <button
                  className={styles.optionBtn}
                  onClick={() =>
                    navigate(
                      `/hotel/${cityCode}/${hotelId}/option/${offer.id}`,
                      {
                        state: {
                          checkIn,
                          checkOut,
                          adults,
                          children,
                          room: offer.room,
                        },
                      }
                    )
                  }
                >
                  객실 옵션 보기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelOffersList;
