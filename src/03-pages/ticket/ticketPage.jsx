import React, { useState, useEffect } from "react";
import "./ticketPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// axios 기본 설정 (파일 최상단에 한 번만 설정)
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;             // credentials 설정

// 임시 더미 데이터
const dummyActivities = [
  {
    id: "dummy1",
    name: "[★특가/당일가능] 롯데월드 종일 중 티켓",
    location: { name: "서울" },
    description: "서울 잠실에 위치한 롯데월드에서 즐거운 하루를 보내보세요. 다양한 놀이기구와 공연을 즐길 수 있습니다.",
    rating: 5,
    reviewCount: 2840,
    price: { amount: "36500", currencyCode: "원" },
    pictures: ["https://placehold.co/300x200?text=롯데월드"],
    bookingLink: true
  },
  {
    id: "dummy2",
    name: "[★단독특가/당일가능] 롯데월드 아쿠아 아라봄 입장권",
    location: { name: "서울" },
    description: "아쿠아리움에서 다양한 해양생물을 만나보세요. 특별한 수중 공연도 관람하실 수 있습니다.",
    rating: 5,
    reviewCount: 734,
    price: { amount: "22000", currencyCode: "원" },
    pictures: ["https://placehold.co/300x200?text=아쿠아리움"],
    bookingLink: true
  },
  {
    id: "dummy3",
    name: "[★단독특가/당일가능] 롯데월드타워 전망대 서울스카이 입장권",
    location: { name: "서울" },
    description: "서울에서 가장 높은 전망대에서 도시의 멋진 전경을 감상해보세요.",
    rating: 5,
    reviewCount: 712,
    price: { amount: "21000", currencyCode: "원" },
    pictures: ["https://placehold.co/300x200?text=서울스카이"],
    bookingLink: true
  },
  {
    id: "dummy4",
    name: "[★단독특가] 롯데워터파크 미들시즌 종일권(5/1~5/23)",
    location: { name: "경상도" },
    description: "시원한 워터파크에서 즐거운 물놀이를 즐겨보세요. 다양한 워터슬라이드와 시설이 준비되어 있습니다.",
    rating: 4,
    reviewCount: 521,
    price: { amount: "21500", currencyCode: "원" },
    pictures: ["https://placehold.co/300x200?text=워터파크"],
    bookingLink: true
  }
];

function TicketPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerView = 4;
  const navigate = useNavigate();

  // 슬라이드 상태 계산
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === Math.ceil(activities.length / cardsPerView) - 1;

  useEffect(() => {
    let isMounted = true;  // 컴포넌트 마운트 상태 체크용

    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);  // 에러 상태 초기화
        
        // baseURL이 이미 설정되어 있으므로 상대 경로만 사용
        const response = await axios.get("/api/tickets");

        // 컴포넌트가 마운트된 상태일 때만 상태 업데이트
        if (isMounted) {
          if (response.data && response.data.length > 0) {
            setActivities([...response.data, ...dummyActivities]);
          } else {
            console.log("API 응답이 비어있어 더미 데이터만 표시합니다.");
            setActivities(dummyActivities);
          }
        }
      } catch (error) {
        console.error("API 호출 실패:", error);
        // 컴포넌트가 마운트된 상태일 때만 상태 업데이트
        if (isMounted) {
          setError("서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
          setActivities(dummyActivities);  // 에러 시 더미 데이터만 표시
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchActivities();

    // 클린업 함수
    return () => {
      isMounted = false;  // 컴포넌트 언마운트 시 플래그 변경
    };
  }, []);  // 빈 의존성 배열 유지

  const handlePrevSlide = () => {
    if (!isFirstSlide) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleNextSlide = () => {
    if (!isLastSlide) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  // 별점 렌더링 함수
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  // 가격 포맷팅 함수
  const formatPrice = (price) => {
    if (!price || !price.amount) return "가격 문의";
    const numericPrice = parseFloat(price.amount);
    return numericPrice.toLocaleString() + ` ${price.currencyCode}`;
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="ticket-page">
      {/* 상단 배너 영역 */}
      <section className="banner-section">
      <div className="search-box">
  <div className="search-wrapper">
    <input
      type="text"
      placeholder='"돈키호테 할인쿠폰"을 검색해보세요'
      className="search-input"
    />
    <button className="search-button">
      <svg xmlns="http://www.w3.org/2000/svg"
           fill="none" viewBox="0 0 24 24"
           strokeWidth="1.5" stroke="white">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 21L15.8 15.8M15.8 15.8A7.5 7.5 0 1 0 5.2 5.2a7.5 7.5 0 0 0 10.6 10.6Z" />
      </svg>
    </button>
  </div>
</div>
      </section>

      {/* 메인 콘텐츠 영역 */}
      <main className="main-content">
        {/* 액티비티 섹션 */}
        <section className="tour-section">
          <div className="section-header">
            <h2>
              전국 초특가 모음전
              <span role="img" aria-label="crown">👑</span>
            </h2>
            <a href="#" className="more-link">
              더 보기 <span>›</span>
            </a>
          </div>

          {loading ? (
            <div className="loading">로딩중...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="tour-slider-container">
              <button 
                className={`slider-button prev ${isFirstSlide ? 'hidden' : ''}`}
                onClick={handlePrevSlide}
              >
                ‹
              </button>
              <div className="tour-grid-wrapper">
                <div 
                  className="tour-grid"
                  style={{
                    transform: `translateX(-${currentSlide * (100 / Math.ceil(activities.length / cardsPerView))}%)`,
                  }}
                >
                  {activities.map((activity) => (
                    <div key={activity.id} className="tour-card" onClick={() => navigate(`/ticket/${activity.id}`)}>
                      <div className="tour-image">
                        <img 
                          src={activity.pictures?.[0] || 'https://placehold.co/300x200?text=No+Image'}
                          alt={activity.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/300x200?text=No+Image';
                          }}
                        />
                        {activity.bookingLink && <div className="ticket-badge">최저가 보장제</div>}
                      </div>
                      <div className="ticket-info">
                        <div className="location-info">
                          <span>{activity.location?.name || '위치 미정'}</span>
                          <span>·</span>
                          <span>서울</span>
                        </div>
                        <h3 className="ticket-title">{activity.name}</h3>
                        <div className="rating-wrap">
                          <span className="stars">{renderStars(activity.rating)}</span>
                          <span className="review-count">{activity.reviewCount}</span>
                        </div>
                        <div className="price-wrap">
                          <span className="original-price">64,000원</span>
                          <span className="price">{formatPrice(activity.price)}</span>
                          <span className="unit">/1인</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                className={`slider-button next ${isLastSlide ? 'hidden' : ''}`}
                onClick={handleNextSlide}
              >
                ›
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default TicketPage;