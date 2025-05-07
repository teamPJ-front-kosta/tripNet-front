import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { mockReviews } from "../../04-data/mockReviews";
import styles from "./styles.module.css";
import EventCard from "../../02-components/EventCard";
import HotelSummaryCard from "./HotelSummaryCard";
import HotelOffersList from "./HotelOffersList";
import HotelMap from "./HotelMap";
import StickyFooter from "../../02-components/StickyFooter";

const HotelDetail = ({ footerRef }) => {
  const { cityCode, hotelId } = useParams();
  const location = useLocation();
  const [hotel, setHotel] = useState(null);
  const [similarHotels, setSimilarHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const roomListRef = useRef(null);
  const [showFooter, setShowFooter] = useState(true);
  const [footerMode, setFooterMode] = useState("fixed"); // "fixed" or "stuck"
  const [footerHeight, setFooterHeight] = useState(0);
  const [footerVisible, setFooterVisible] = useState(false);

  // 검색 조건을 location.state에서 가져오고, 없으면 기본값
  const searchParams = location.state || {
    checkIn: "2025-06-16",
    checkOut: "2025-06-20",
    adults: 2,
    children: 0,
  };

  // 가격/날짜/인원/제로마진 정보 (HotelSummaryCard와 동일하게)
  const offers = hotel?.offers || [];
  const priceUSD = Number(offers[0]?.price?.total) || 0;
  const price =
    priceUSD > 0 ? `$${priceUSD.toFixed(2)} / 1박` : "가격 정보 없음";
  const marginType = "제로마진";
  const datePeople = `${formatDate(searchParams.checkIn)} ~ ${formatDate(
    searchParams.checkOut
  )} · 성인 ${searchParams.adults}명${
    searchParams.children > 0 ? `, 아동 ${searchParams.children}명` : ""
  }`;

  // 후기 캐러셀 상태
  const [reviewIndex, setReviewIndex] = useState(0); // 현재 첫 번째로 보이는 후기 인덱스
  const REVIEWS_PER_PAGE = 2;
  const maxIndex = Math.max(0, mockReviews.length - REVIEWS_PER_PAGE);

  const handlePrevReview = () => {
    setReviewIndex((prev) => Math.max(0, prev - REVIEWS_PER_PAGE));
  };
  const handleNextReview = () => {
    setReviewIndex((prev) => Math.min(maxIndex, prev + REVIEWS_PER_PAGE));
  };

  useEffect(() => {
    const fetchHotelData = async () => {
      setLoading(true);
      try {
        // API 호출하여 모든 호텔 데이터 가져오기
        const response = await fetch("/api/foreign-accommodations");
        const data = await response.json();

        // 현재 도시 코드에 맞는 도시 데이터 찾기
        const cityData = data.find((city) => city.cityCode === cityCode);

        if (!cityData || !cityData.hotels || cityData.hotels.length === 0) {
          throw new Error("해당 도시의 호텔 정보를 찾을 수 없습니다.");
        }

        // 현재 호텔 ID에 맞는 호텔 찾기
        const currentHotel = cityData.hotels.find((h) => h.hotelId === hotelId);

        if (!currentHotel) {
          throw new Error("해당 호텔 정보를 찾을 수 없습니다.");
        }

        // 다른 유사 호텔 찾기 (최대 2개)
        const otherHotels = cityData.hotels
          .filter((h) => h.hotelId !== hotelId)
          .slice(0, 2);

        setHotel(currentHotel);
        setSimilarHotels(otherHotels);
        setError(null);
      } catch (err) {
        console.error("호텔 데이터 가져오기 실패:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [cityCode, hotelId]);

  useEffect(() => {
    if (!roomListRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setShowFooter(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(roomListRef.current);
    return () => observer.disconnect();
  }, [roomListRef]);

  useEffect(() => {
    if (!footerRef?.current) return;
    const updateHeight = () =>
      setFooterHeight(footerRef.current.offsetHeight || 0);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [footerRef]);

  useEffect(() => {
    if (!footerRef?.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
        if (entry.isIntersecting) setFooterMode("stuck");
        else setFooterMode("fixed");
      },
      { threshold: 0.01 }
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [footerRef]);

  // 객실 선택 버튼 클릭 시 객실 리스트로 스크롤 이동
  const handleReserve = () => {
    if (roomListRef.current) {
      roomListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // 도시 코드를 한글 이름으로 변환
  const getCityName = (code) => {
    const cityNames = {
      PAR: "파리",
      TYO: "도쿄",
      SEL: "서울",
      BKK: "방콕",
      HNL: "호놀룰루",
      CEB: "세부",
      OSA: "오사카",
      SGN: "호치민",
    };
    return cityNames[code] || code;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>호텔 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2>오류가 발생했습니다</h2>
          <p>{error}</p>
          <Link to="/" className={styles.backButton}>
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  if (!hotel) return null;

  return (
    <div className={styles.container} style={{ position: "relative" }}>
      {/* '일정 다시 검색하기' 링크 삭제됨 */}

      {/* 1. 호텔 요약 카드 - detailSection 박스 */}
      <div className={styles.detailSection}>
        <HotelSummaryCard
          hotel={hotel}
          checkIn={searchParams.checkIn}
          checkOut={searchParams.checkOut}
          adults={searchParams.adults}
          children={searchParams.children}
        />
      </div>

      {/* 2. 지도/주소 섹션 - detailSection 박스 */}
      <div className={styles.detailSection}>
        <section className={styles.mapSection}>
          <h2 className={styles.sectionTitle}>숙소 위치</h2>
          <div className={styles.mapBox}>
            <HotelMap latitude={hotel.latitude} longitude={hotel.longitude} />
          </div>
          {hotel.address ? (
            <div className={styles.addressRow}>
              <span className={styles.addressIcon}>📍</span>
              <span className={styles.addressText}>{hotel.address}</span>
            </div>
          ) : (
            <div className={styles.addressRow} style={{ color: "#aaa" }}>
              주소 정보 없음
            </div>
          )}
        </section>
      </div>

      {/* 3. 후기/평점 섹션 - detailSection 박스 */}
      <div className={styles.detailSection}>
        <div className={styles.reviewHeader}>
          <span className={styles.reviewStar}>★</span>
          <span className={styles.reviewScore}>4.5</span>
          <span className={styles.reviewCount}>
            · 후기 {mockReviews.length}개
          </span>
        </div>
        <div style={{ position: "relative" }}>
          {/* 왼쪽 화살표: 첫 페이지가 아니면만 보임 */}
          {reviewIndex > 0 && (
            <button
              className={styles.reviewArrowLeft}
              onClick={handlePrevReview}
              aria-label="이전 후기"
            >
              &#8592;
            </button>
          )}
          {/* 후기 카드 캐러셀 */}
          <div
            className={styles.reviewList}
            style={{ overflow: "hidden", minHeight: 180 }}
          >
            {mockReviews
              .slice(reviewIndex, reviewIndex + REVIEWS_PER_PAGE)
              .map((r, i) => (
                <div className={styles.reviewCard} key={reviewIndex + i}>
                  <div className={styles.reviewCardHeader}>
                    <span className={styles.reviewCardStar}>★ {r.rating}</span>
                    <span className={styles.reviewCardDate}>{r.date}</span>
                  </div>
                  <div className={styles.reviewCardText}>{r.text}</div>
                  <div className={styles.reviewCardUser}>{r.user}</div>
                </div>
              ))}
          </div>
          {/* 오른쪽 화살표: 마지막 페이지가 아니면만 보임 */}
          {reviewIndex < maxIndex && (
            <button
              className={styles.reviewArrowRight}
              onClick={handleNextReview}
              aria-label="다음 후기"
            >
              &#8594;
            </button>
          )}
        </div>
        <button className={styles.reviewMoreBtn}>후기 모두 보기</button>
      </div>

      {/* 4. 객실 옵션 리스트 - detailSection 박스 */}
      <div className={styles.detailSection} ref={roomListRef}>
        <HotelOffersList
          offers={hotel.offers || []}
          checkIn={searchParams.checkIn}
          checkOut={searchParams.checkOut}
          adults={searchParams.adults}
          children={searchParams.children}
        />
      </div>

      {similarHotels.length > 0 && (
        <div className={styles.detailSection}>
          <h2 className={styles.similarTitle}>파리의 다른 호텔</h2>
          <div className={styles.similarGrid}>
            {similarHotels.map((similarHotel, idx) => (
              <div
                key={similarHotel.hotelId}
                className={styles.similarHotelCard}
              >
                <div className={styles.similarCardImageWrap}>
                  <img
                    src={similarHotel.imageUrl}
                    alt={similarHotel.hotelName}
                    className={styles.similarCardImage}
                  />
                </div>
                <div className={styles.similarCardInfo}>
                  <div className={styles.similarCardHotelName}>
                    {similarHotel.hotelName}
                  </div>
                  <div className={styles.similarCardRatingRow}>
                    <span className={styles.similarCardStar}>★</span>
                    <span className={styles.similarCardRating}>
                      {(4.2 + idx * 0.2).toFixed(1)}
                    </span>
                    <span className={styles.similarCardReviewCount}>
                      (1{idx}3{idx}개)
                    </span>
                  </div>
                  <div className={styles.similarCardPrice}>
                    {(500000 + idx * 10000).toLocaleString()}원/박
                  </div>
                  <div className={styles.similarCardGrade}>
                    4성급 · 아파트호텔
                  </div>
                  <div className={styles.similarCardMargin}>제로마진</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 하단 고정 푸터 */}
      <StickyFooter
        price={price}
        marginType={marginType}
        datePeople={datePeople}
        onReserve={handleReserve}
        visible={showFooter}
        footerMode={footerMode}
        style={{ bottom: footerVisible ? `${footerHeight}px` : 0 }}
      />
    </div>
  );
};

// 날짜 포맷 변환 함수 (HotelSummaryCard와 동일하게)
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[date.getDay()];
  return `${month}월 ${day}일(${dayOfWeek})`;
}

export default HotelDetail;
