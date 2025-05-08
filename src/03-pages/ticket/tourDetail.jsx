import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ticketDetail.css';

function TicketDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('상품소개');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // 각 섹션에 대한 ref 생성
  const headerRef = useRef(null);
  const productRef = useRef(null);
  const courseRef = useRef(null);
  const includeRef = useRef(null);
  const guideRef = useRef(null);
  const importantRef = useRef(null);
  const cancelRef = useRef(null);
  const reviewRef = useRef(null);

  // 탭 메뉴 정의
  const tabs = [
    { id: '상품소개', ref: productRef },
    { id: '코스', ref: courseRef },
    { id: '포함/불포함', ref: includeRef },
    { id: '이용안내', ref: guideRef },
    { id: '필수확인사항', ref: importantRef },
    { id: '취소/환불', ref: cancelRef },
    { id: '후기', ref: reviewRef }
  ];

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const productSectionTop = productRef.current?.offsetTop || 0;
      
      // 상품소개 섹션에 도달했을 때만 기능 버튼과 탭 메뉴 표시
      setIsScrolled(scrollPosition >= productSectionTop - 100);

      // 현재 보이는 섹션 찾기
      const currentPosition = scrollPosition + 100;
      for (const tab of tabs) {
        if (tab.ref.current) {
          const { offsetTop, offsetHeight } = tab.ref.current;
          if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tabs]);

  // 탭 클릭 핸들러
  const handleTabClick = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab?.ref.current) {
      const headerHeight = isScrolled ? 48 : 0;
      window.scrollTo({
        top: tab.ref.current.offsetTop - headerHeight,
        behavior: "smooth"
      });
    }
  };

  // 임시 데이터 (실제로는 props나 전역 상태로 관리해야 함)
  const activity = {
    id: "dummy1",
    name: "[봄맞이 이벤트] 고북수진과 만리장성 :: 나룻배와 함께하는 수향마을 야경 체험(무료중정)",
    rating: 4.8,
    reviewCount: 185,
    location: { name: "중국 · 베이징" },
    description: "북경 시내에서 2시간 거리에 위치 하있는 고북수진은 중국 감남의 대표적인 물의 마을 오견의 모습과 화북 지역의 전통 양식을 품 해 만든 민속마을 입니다.",
    price: { amount: "50000", currencyCode: "원" },
    pictures: [
      "https://placehold.co/800x400?text=고북수진+야경",
      "https://placehold.co/800x400?text=만리장성",
      "https://placehold.co/800x400?text=수향마을"
    ],
    bookingLink: true,
    details: {
      duration: "240분 소요",
      maxPeople: "최소 인원 6명",
      language: "한국어",
      transportation: "차량이동",
      schedule: [
        "5/2(목), 5/3(금), 5/4(일), 5/5(월)",
        "5/6(화), 5/11(일), 5/16(금), 5/23(금)",
        "5/25(일),6/6(금), 6/7(토), 7/5(토)"
      ],
      benefits: [
        "KB국민카드 10,000원 결제일 할인",
        "카카오페이 최대 17,000원 선착순 즉시 할인",
        "삼성카드 최대 15,000원 결제일 할인 + 추가 제휴 할인",
        "현대카드 M포인트 10% 사용가능 (최대 15,000 M포인트)",
        "토스페이 7만원 이상 3천원 할인",
        "하나카드 5% 즉시 할인 (최대 10,000원)",
        "비씨카드 10,000원 결제일 할인"
      ],
      meetingPoint: {
        name: "14, 15호선 왕징역(望京站) C출구앞",
        description: "지하철역 나오기 전 화장실 들러시길.. 역내오면 나오면 화장실 없습니다."
      },
      importantInfo: [
        "최소출발 인원은 6인입니다.",
        "3일전까지 취소 인원이 되지 않을 경우 투어는 취소될 수 있습니다.",
        "북경에서는 카톡과 유비톡시 국금지도가 열리지 않습니다.",
        "카톡대신 위챗, 알리페이를 다운로드해오시기 바랍니다."
      ],
      cancellationPolicy: {
        rules: [
          "여행시작 30일 전까지 (~30) 통보시 : 여행 요금 전액 환불",
          "여행시작 20일 전까지 (29~20) 통보시 : 상품 요금의 20% 공제",
          "여행시작 7일 전까지 (19~7) 통보시 : 상품 요금의 30% 공제",
          "여행시작 4일 전까지 (6~4) 통보시 : 상품 요금의 50%공제",
          "여행시작 당일까지 (3~당일) 통보시 : 취소/환불 불가"
        ]
      }
    }
  };

  // 별점 렌더링 함수
  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  // 가격 포맷팅 함수
  const formatPrice = (price) => {
    if (!price || !price.amount) return "가격 문의";
    const numericPrice = parseFloat(price.amount);
    return numericPrice.toLocaleString() + ` ${price.currencyCode}`;
  };

  // 상단 기능 버튼 데이터
  const functionButtons = [
    { id: 'save', label: '저장' },
    { id: 'inquiry', label: '문의' },
    { id: 'course', label: '코스' },
    { id: 'meetingPoint', label: '만나는장소' },
    { id: 'inclusion', label: '포함/불포함' },
    { id: 'cancellation', label: '환불정책' },
    { id: 'share', label: '공유' }
  ];

  return (
    <div className="ticket-detail">
      {/* 헤더 영역 */}
      <div ref={headerRef} className="product-header">
        {/* 이미지 슬라이더 */}
        <div className="main-image-slider">
          <div className="main-image">
            <img src={activity.pictures[0]} alt={activity.name} />
          </div>
          <div className="side-images">
            {activity.pictures.slice(1, 5).map((pic, index) => (
              <div key={index} className="side-image">
                {index === 2 && <span className="image-label">후기사진</span>}
                <img src={pic} alt={`${activity.name} ${index + 2}`} />
                {index === 3 && (
                  <button className="more-images">
                    <span>사진 더보기</span>
                    <span>〉</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 네비게이션 */}
        <nav className="detail-nav">
          <button className="back-button">←</button>
          <div className="nav-right">
            <button className="home-button">⌂</button>
            <button className="bookmark-button">♡</button>
            <button className="share-button">↗</button>
          </div>
        </nav>

        {/* 경로 표시 */}
        <div className="breadcrumb">
          <span>{activity.location.name}</span>
          <span>〉</span>
          <span>투어·티켓</span>
        </div>

        {/* 제목과 평점 오버레이 */}
        <div className="product-header-content">
          <h1 className="title">{activity.name}</h1>
          <div className="rating">
            <span className="stars">{renderStars(activity.rating)}</span>
            <span className="score">{activity.rating}</span>
            <span className="review-count">· 후기 {activity.reviewCount}개</span>
          </div>
        </div>
      </div>

      {/* 상단 기능 버튼 */}
      <div className="quick-menu">
        <div className="quick-menu-inner">
          {functionButtons.map(button => (
            <button
              key={button.id}
              className="quick-menu-button"
              onClick={() => handleTabClick(button.id)}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className={`tab-menu ${isScrolled ? 'sticky' : ''}`}>
        <div className="tab-menu-inner">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.id}
            </button>
          ))}
        </div>
      </div>

      {/* 섹션들 */}
      <div className="sections-container">
        <section ref={productRef} className="product-description">
          <h2>상품 소개</h2>
          <p>{activity.description}</p>
          <div className="product-images">
            {activity.pictures.map((pic, index) => (
              <img key={index} src={pic} alt={`상품 이미지 ${index + 1}`} />
            ))}
          </div>
        </section>

        <section ref={courseRef} className="course-info">
          <h2>코스</h2>
          <div className="meeting-point">
            <h3>만나는 장소</h3>
            <p className="location-name">{activity.details.meetingPoint.name}</p>
            <p className="location-description">{activity.details.meetingPoint.description}</p>
          </div>
        </section>

        {/* 포함/불포함 */}
        <section ref={includeRef} className="inclusion">
          <h2>포함/불포함</h2>
          <div className="inclusion-content">
            <div className="included">
              <h3>포함 사항</h3>
              <ul>
                <li>전용 차량/한국어가이드</li>
                <li>고북수진 입장료</li>
              </ul>
            </div>
            <div className="not-included">
              <h3>불포함 사항</h3>
              <ul>
                <li>개인 경비</li>
                <li>선택 관광 비용</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 이용 안내 */}
        <section ref={guideRef} className="usage-guide">
          <h2>이용 안내</h2>
          <div className="tour-info">
            <div className="info-item">
              <span className="icon">⏱</span>
              <span>{activity.details.duration}</span>
            </div>
            <div className="info-item">
              <span className="icon">👥</span>
              <span>{activity.details.maxPeople}</span>
            </div>
            <div className="info-item">
              <span className="icon">🗣</span>
              <span>{activity.details.language}</span>
            </div>
          </div>
        </section>

        {/* 필수 확인 사항 */}
        <section ref={importantRef} className="important-info">
          <h2>필수 확인 사항</h2>
          <ul>
            {activity.details.importantInfo.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </section>

        {/* 취소/환불 규정 */}
        <section ref={cancelRef} className="cancellation-policy">
          <h2>취소/환불 규정</h2>
          <ul>
            {activity.details.cancellationPolicy.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </section>

        {/* 후기 섹션 */}
        <section ref={reviewRef} className="reviews">
          <h2>후기</h2>
          <div className="review-summary">
            <div className="rating-large">
              <span className="score">{activity.rating}</span>
              <span className="stars">{renderStars(activity.rating)}</span>
            </div>
            <span className="review-count">후기 {activity.reviewCount}개</span>
          </div>
          <div className="review-list">
            <div className="review-item">
              <div className="review-header">
                <span className="reviewer">홍길동</span>
                <span className="review-date">2024.02.20</span>
              </div>
              <div className="review-rating">
                {renderStars(5)}
              </div>
              <p className="review-content">
                정말 좋은 여행이었습니다. 가이드님도 친절하시고 설명도 자세히 해주셔서 만족스러웠어요.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 하단 고정 예약 버튼 */}
      <div className="booking-footer">
        <div className="price">
          <span className="amount">{formatPrice(activity.price)}</span>
          <span className="per-person">/ 1인</span>
        </div>
        <button className="booking-button">옵션 선택</button>
      </div>
    </div>
  );
}

export default TicketDetail; 