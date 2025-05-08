import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { format, parse } from 'date-fns';
import styles from '../css/searchResults.module.css';
import SearchModal from '../../../02-components/SearchModal';
import DateSelectorModal from '../../../02-components/DateSelectorModal';
import GuestSelector from '../../../02-components/GuestSelector';
import axios from 'axios';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL에서 검색 파라미터 가져오기
  const locationParam = searchParams.get('location');
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');
  const adultsParam = searchParams.get('adults');
  const childrenParam = searchParams.get('children');

  // 모달 상태
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestSelector, setShowGuestSelector] = useState(false);

  // 검색 관련 상태
  const [searchLocation, setSearchLocation] = useState(locationParam || '강동구');
  const [startDate, setStartDate] = useState(
    checkInParam ? parse(checkInParam, 'yyyy-MM-dd', new Date()) : null
  );
  const [endDate, setEndDate] = useState(
    checkOutParam ? parse(checkOutParam, 'yyyy-MM-dd', new Date()) : null
  );
  const [selectedDateRange, setSelectedDateRange] = useState(
    checkInParam && checkOutParam
      ? `${format(parse(checkInParam, 'yyyy-MM-dd', new Date()), 'MM월 dd일')} - ${format(parse(checkOutParam, 'yyyy-MM-dd', new Date()), 'MM월 dd일')}`
      : '날짜를 선택하세요'
  );

  // 인원 선택 관련 상태
  const [adultCount, setAdultCount] = useState(parseInt(adultsParam) || 2);
  const [childCount, setChildCount] = useState(parseInt(childrenParam) || 0);
  const [guestSummary, setGuestSummary] = useState('');
  const [childAges, setChildAges] = useState([]);

  // 검색 결과 상태
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 필터 상태
  const [filters, setFilters] = useState({
    freeCancellation: false,
    sortBy: 'recommended'
  });

  // 날짜 관련 함수들
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      setSelectedDateRange(
        `${format(start, "MM월 dd일")} - ${format(end, "MM월 dd일")}`
      );
    }
  };

  // 인원 관련 함수
  const updateGuestSummary = () => {
    let summary = `성인 ${adultCount}명`;
    if (childCount > 0) {
      summary += `, 청소년/아동 ${childCount}명`;
    }
    setGuestSummary(summary);
  };

  const getCityCode = (location) => {
    switch (location) {
      case '서울':
        return 'SEL';
      case '부산':
        return 'PUS';
      case '제주':
        return 'CJU';
      default:
        return location;
    }
  };

  // API 호출 함수
  const fetchAccommodations = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!startDate || !endDate) {
        return;
      }

      const formattedCheckIn = format(startDate, 'yyyy-MM-dd');
      const formattedCheckOut = format(endDate, 'yyyy-MM-dd');
      const cityCode = getCityCode(searchLocation);
      
      const response = await axios.get(
        `http://localhost:3001/api/domestic-accommodations/search-hotels/${cityCode}/${formattedCheckIn}/${formattedCheckOut}/${adultCount}/${childCount}`
      );

      const hotelData = response.data.data || [];
      console.log(hotelData);
      
      const formattedAccommodations = hotelData.map((hotel, index) => ({
        id: hotel.hotel.hotelId,
        name: hotel.hotel.name,
        type: `${hotel.hotel.rating || '게스트하우스'} · ${searchLocation}`,
        rating: hotel.hotel.rating || 0,
        reviewCount: Math.floor(Math.random() * 100),
        price: hotel.offers[0]?.price?.total || 0,
        taxIncluded: Math.floor(hotel.offers[0]?.price?.total * 1.1) || 0,
        imageUrl: `/images/accommodation${(index % 3) + 1}.jpg`,
        bookmarked: false,
        hasPromotion: Math.random() > 0.7,
        originalPrice: Math.floor(hotel.offers[0]?.price?.total * 1.3) || 0
      }));

      setAccommodations(formattedAccommodations);
    } catch (err) {
      setError('숙소 검색 중 오류가 발생했습니다.');
      console.error('Error fetching accommodations:', err);
    } finally {
      setLoading(false);
    }
  };

  // 검색 파라미터가 변경될 때마다 검색 실행
  useEffect(() => {
    if (startDate && endDate) {
      fetchAccommodations();
    }
  }, [searchLocation, startDate, endDate, adultCount, childCount]);

  // 검색 실행 함수
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchLocation) params.append("location", searchLocation);
    if (startDate && endDate) {
      params.append("checkIn", format(startDate, "yyyy-MM-dd"));
      params.append("checkOut", format(endDate, "yyyy-MM-dd"));
    }
    params.append("adults", adultCount);
    if (childCount > 0) params.append("children", childCount);

    navigate(`/domestic/search/results?${params.toString()}`);
  };

  // 상세 페이지로 이동하는 함수
  const goToDetailPage = (hotelId) => {
    const params = new URLSearchParams();
    params.append("location", searchLocation);
    params.append("checkIn", format(startDate, "yyyy-MM-dd"));
    params.append("checkOut", format(endDate, "yyyy-MM-dd"));
    params.append("adults", adultCount);
    params.append("children", childCount);
    
    navigate(`/domestic/hotel-details/${hotelId}?${params.toString()}`);
  };

  // 가격 포맷 함수
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 인원수가 변경될 때 헤더에 표시되는 내용 업데이트
  useEffect(() => {
    updateGuestSummary();
  }, [adultCount, childCount]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <div className={styles.searchItem} onClick={() => setShowSearchModal(true)}>
            <div className={styles.searchIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="m18.875 20.475-5.55-5.55c-.5.383-1.075.692-1.725.925-.65.233-1.342.35-2.075.35-1.85 0-3.417-.646-4.7-1.938C3.542 12.97 2.9 11.4 2.9 9.55c0-1.85.642-3.421 1.925-4.713C6.108 3.546 7.675 2.9 9.525 2.9s3.421.646 4.713 1.937c1.291 1.292 1.937 2.863 1.937 4.713 0 .733-.112 1.425-.337 2.075a5.726 5.726 0 0 1-.913 1.7l5.575 5.6c.2.2.3.454.3.763 0 .308-.108.57-.325.787a1.101 1.101 0 0 1-.812.325c-.325 0-.588-.108-.788-.325Z" fill="currentColor"/>
              </svg>
            </div>
            <div className={styles.searchContent}>
              <div className={styles.searchLabel}>여행지</div>
              <div className={styles.searchValue}>{searchLocation}</div>
            </div>
          </div>

          <div className={styles.searchDivider} />

          <div className={styles.searchItem} onClick={() => setShowDatePicker(true)}>
            <div className={styles.searchIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5.075 22.2c-.633 0-1.17-.22-1.612-.662a2.195 2.195 0 0 1-.663-1.613V6.075c0-.633.221-1.171.663-1.613A2.194 2.194 0 0 1 5.075 3.8H6v-.95c0-.3.104-.55.312-.75.209-.2.463-.3.763-.3s.554.104.763.312c.208.209.312.463.312.763V3.8h7.7v-.95c0-.3.104-.55.313-.75.208-.2.462-.3.762-.3s.554.104.763.312c.208.209.312.463.312.763V3.8h.925c.633 0 1.171.22 1.613.662.441.442.662.98.662 1.613v13.85c0 .633-.22 1.171-.662 1.613-.442.441-.98.662-1.613.662H5.075Zm0-2.275h13.85V10H5.075v9.925Z" fill="currentColor"/>
              </svg>
            </div>
            <div className={styles.searchContent}>
              <div className={styles.searchLabel}>일정</div>
              <div className={styles.searchValue}>{selectedDateRange}</div>
            </div>
          </div>

          <div className={styles.searchDivider} />

          <div className={styles.searchItem} onClick={() => setShowGuestSelector(true)}>
            <div className={styles.searchIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 12.25c-1.667 0-3.083-.583-4.25-1.75C6.583 9.333 6 7.917 6 6.25s.583-3.083 1.75-4.25C8.917.833 10.333.25 12 .25s3.083.583 4.25 1.75C17.417 3.167 18 4.583 18 6.25s-.583 3.083-1.75 4.25c-1.167 1.167-2.583 1.75-4.25 1.75Zm0-2.5c.967 0 1.783-.342 2.45-1.025.667-.683 1-1.508 1-2.475s-.333-1.792-1-2.475C13.783 2.592 12.967 2.25 12 2.25c-.967 0-1.792.342-2.475 1.025-.683.683-1.025 1.508-1.025 2.475s.342 1.792 1.025 2.475c.683.683 1.508 1.025 2.475 1.025Zm0 5.5c-3.533 0-6.708.875-9.525 2.625C-.342 19.625-.75 21.833-.75 24.5h2.5c0-2 .242-3.458.725-4.375.483-.917 1.392-1.708 2.725-2.375 1.333-.667 3.042-1 5.125-1s3.783.333 5.1 1c1.317.667 2.225 1.458 2.725 2.375.5.917.75 2.375.75 4.375h2.5c0-2.667-.417-4.875-1.25-6.625C17.583 16.125 14.4 15.25 12 15.25Z" fill="currentColor"/>
              </svg>
            </div>
            <div className={styles.searchContent}>
              <div className={styles.searchLabel}>숙박 인원</div>
              <div className={styles.searchValue}>{guestSummary}</div>
            </div>
          </div>

          <button className={styles.searchButton} onClick={handleSearch}>
            숙소 검색
          </button>
        </div>
      </div>

      <div className={styles.container}>
        {loading && <div className={styles.loading}>검색 중...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {!loading && !error && (
          <div className={styles.accommodationList}>
            {accommodations.length === 0 ? (
              <div className={styles.noResults}>검색 결과가 없습니다.</div>
            ) : (
              accommodations.map((accommodation) => (
                <div key={accommodation.id} className={styles.accommodationCard} onClick={() => goToDetailPage(accommodation.id)}>
                  <div className={styles.imageContainer}>
                    <img src={accommodation.imageUrl} alt={accommodation.name} />
                  </div>
                  <div className={styles.accommodationInfo}>
                    <div className={styles.nameRating}>
                      <h3>{accommodation.name}</h3>
                      <div className={styles.rating}>
                        ★ {accommodation.rating} ({accommodation.reviewCount})
                      </div>
                    </div>
                    <p className={styles.type}>{accommodation.type}</p>
                    <div className={styles.priceInfo}>
                      {accommodation.hasPromotion && (
                        <span className={styles.originalPrice}>
                          {formatPrice(accommodation.originalPrice)}원
                        </span>
                      )}
                      <span className={styles.price}>{formatPrice(accommodation.price)}원/박</span>
                      <span className={styles.taxIncluded}>
                        세금포함 {formatPrice(accommodation.taxIncluded)}원/박
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 모달 컴포넌트들 */}
      {showSearchModal && (
        <SearchModal
          searchLocation={searchLocation}
          handleLocationInputChange={(e) => setSearchLocation(e.target.value)}
          showLocationOptions={true}
          filteredOptions={[]}
          handleLocationSelect={(location) => {
            setSearchLocation(location);
            setShowSearchModal(false);
          }}
          recentSearches={[]}
          clearRecentSearches={() => {}}
          popularDestinations={[]}
          popularRegions={[]}
          getCountryFlag={() => {}}
          getLocationDescription={() => {}}
          onClose={() => setShowSearchModal(false)}
        />
      )}

      {showDatePicker && (
        <DateSelectorModal
          startDate={startDate}
          endDate={endDate}
          handleDateChange={handleDateChange}
          selectedDateRange={selectedDateRange}
          onClose={() => setShowDatePicker(false)}
          onApply={() => setShowDatePicker(false)}
        />
      )}

      {showGuestSelector && (
        <GuestSelector
          adultCount={adultCount}
          setAdultCount={setAdultCount}
          childCount={childCount}
          setChildCount={setChildCount}
          childAges={childAges}
          setChildAges={setChildAges}
          onClose={() => setShowGuestSelector(false)}
        />
      )}
    </div>
  );
};

export default SearchResults; 