import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./styles.module.css";
import EventCard from "../../02-components/EventCard";

const HotelDetail = () => {
  const { cityCode, hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [similarHotels, setSimilarHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      setLoading(true);
      try {
        // API 호출하여 모든 호텔 데이터 가져오기
        const response = await fetch("/api/accommodations");
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

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        &larr; 목록으로 돌아가기
      </Link>

      {hotel && (
        <div className={styles.hotelDetail}>
          <div className={styles.hotelHeader}>
            <h1 className={styles.hotelTitle}>{hotel.hotelName}</h1>
            <p className={styles.hotelLocation}>{getCityName(cityCode)}</p>
          </div>

          <div className={styles.hotelImageContainer}>
            <img
              src={hotel.imageUrl}
              alt={`${hotel.hotelName} 이미지`}
              className={styles.hotelImage}
              onError={(e) => {
                console.log("상세 이미지 로딩 실패:", hotel.imageUrl);
                e.target.src = `https://source.unsplash.com/featured/?${getCityName(
                  cityCode
                )},hotel`;
              }}
            />
          </div>

          <div className={styles.hotelInfo}>
            <h2 className={styles.infoTitle}>호텔 정보</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <strong>위치:</strong>
                <p>
                  위도: {hotel.latitude}, 경도: {hotel.longitude}
                </p>
              </div>
              <div className={styles.infoItem}>
                <strong>호텔 ID:</strong>
                <p>{hotel.hotelId}</p>
              </div>
            </div>
          </div>

          {similarHotels.length > 0 && (
            <div className={styles.similarHotels}>
              <h2 className={styles.similarTitle}>
                {getCityName(cityCode)}의 다른 호텔
              </h2>
              <div className={styles.similarGrid}>
                {similarHotels.map((similarHotel) => (
                  <div
                    key={similarHotel.hotelId}
                    className={styles.similarHotelCard}
                  >
                    <EventCard
                      title={similarHotel.hotelName}
                      subtitle={getCityName(cityCode)}
                      imageUrl={similarHotel.imageUrl}
                      alt={`${similarHotel.hotelName} 이미지`}
                      linkUrl={`/hotel/${cityCode}/${similarHotel.hotelId}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.bookingSection}>
            <h2 className={styles.bookingTitle}>예약하기</h2>
            <p className={styles.bookingPrice}>
              ₩ {Math.floor(Math.random() * 300000) + 100000}/박
            </p>
            <button className={styles.bookingButton}>지금 예약하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetail;
