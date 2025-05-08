import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// 새로 만든 컴포넌트 임포트
import GuestSelector from "./components/GuestSelector";
import DateSelectorModal from "./components/DateSelectorModal";
import SearchModal from "./components/SearchModal";
import HotelListSection from "./components/HotelListSection";

// 분리된 데이터 및 유틸리티 임포트
import {
  destinations,
  cityCodeMap,
  popularDestinations,
  popularRegions,
} from "./components/data/destinations";
import {
  getCountryFlag,
  getLocationDescription,
} from "../../05-utils/countryUtils";

const ForeignAccommodations = () => {
  // 검색 관련 상태
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCityCode, setSelectedCityCode] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState(destinations);

  // 모달 상태
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestSelector, setShowGuestSelector] = useState(false);

  // 날짜 선택 관련 상태
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState("");

  // 인원 선택 관련 상태
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [guestSummary, setGuestSummary] = useState("성인 2명");
  const [childAges, setChildAges] = useState([]);

  // 호텔 데이터 상태
  const [recommendedHotels, setRecommendedHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 외부 클릭 감지를 위한 ref
  const guestSelectorRef = useRef(null);

  // 인원수가 변경될 때 헤더에 표시되는 내용 업데이트
  useEffect(() => {
    updateGuestSummary();
  }, [adultCount, childCount]);

  // 외부 클릭 감지 Effect
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        guestSelectorRef.current &&
        !guestSelectorRef.current.contains(event.target)
      ) {
        setShowGuestSelector(false);
      }
    }

    if (showGuestSelector) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showGuestSelector]);

  // 호텔 데이터 가져오기
  useEffect(() => {
    fetchRecommendedHotels();
  }, []);

  // 추천 호텔 데이터 가져오기
  const fetchRecommendedHotels = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/domestic-accommodations");
      const data = await response.json();
      console.log("Response:", data); 
      // API 응답이 배열인지 확인
      if (!Array.isArray(data)) {
        throw new Error("Invalid API response format");
      }

      // 각 도시코드별 첫 번째 호텔만 추출
      const hotelCards = [];

      // 지원하는 도시코드 목록
      const supportedCityCodes = ["SEL", "PUS", "CJU"];

      // 각 도시코드별로 첫 번째 호텔만 추출
      supportedCityCodes.forEach((cityCode) => {
        const cityData = data.find((city) => city.cityCode === cityCode);

        if (cityData?.hotels?.length > 0) {
          const hotel = cityData.hotels[0];

          if (hotel && hotel.hotelId && hotel.hotelName) {
            hotelCards.push({
              hotelId: hotel.hotelId,
              hotelName: hotel.hotelName,
              cityCode: cityCode,
              subtitle: getCityName(cityCode),
              imageUrl: hotel.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
              alt: `${hotel.hotelName} 이미지`,
              linkUrl: `/domestic/hotel/${cityCode}/${hotel.hotelId}`,
            });
          }
        }
      });

      setRecommendedHotels(hotelCards);
      setError(null);
    } catch (err) {
      console.error("호텔 데이터 가져오기 실패:", err);
      setError("데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");

      // 에러 발생 시 기본 데이터 설정
      setRecommendedHotels([
        {
          hotelId: "SELHTL01",
          hotelName: "서울 그랜드 호텔",
          cityCode: "SEL",
          subtitle: "서울",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
          alt: "서울 호텔 이미지",
          linkUrl: "/domestic/hotel/SEL/SELHTL01",
        },
        {
          hotelId: "PUSHTL01",
          hotelName: "부산 해운대 호텔",
          cityCode: "PUS",
          subtitle: "부산",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
          alt: "부산 호텔 이미지",
          linkUrl: "/domestic/hotel/PUS/PUSHTL01",
        },
        {
          hotelId: "CJUHTL01",
          hotelName: "제주 서귀포 호텔",
          cityCode: "CJU",
          subtitle: "제주",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
          alt: "제주 호텔 이미지",
          linkUrl: "/domestic/hotel/CJU/CJUHTL01",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 도시 코드에 따른 도시 이름 반환
  const getCityName = (cityCode) => {
    return cityCodeMap[cityCode] || cityCode;
  };

  // 검색어 입력 처리 (동기화)
  const handleLocationInputChange = (e) => {
    const value = e.target.value;
    setSearchLocation(value);

    if (value.trim() === "") {
      setFilteredOptions([]);
      setShowLocationOptions(false);
      setSelectedCityCode("");
      return;
    }

    // 검색 결과 필터링
    const filtered = Object.values(cityCodeMap)
      .filter((city) => city.includes(value.trim()))
      .slice(0, 10);
    
    setFilteredOptions(filtered);
    setShowLocationOptions(true);

    // 정확한 매칭이 있는 경우에만 도시 코드 설정
    const exactMatch = Object.entries(cityCodeMap).find(
      ([code, name]) => name === value.trim()
    );
    if (exactMatch) {
      setSelectedCityCode(exactMatch[0]);
    } else {
      setSelectedCityCode("");
    }
  };

  // 위치 선택 처리
  const handleLocationSelect = (location) => {
    setSearchLocation(location);
    setShowLocationOptions(false);

    // cityCode 추출 및 상태 저장
    const code = Object.entries(cityCodeMap).find(
      ([code, name]) => name === location
    )?.[0];

    if (code) {
      console.log("Selected cityCode:", code); // 디버깅용
      setSelectedCityCode(code);
    } else {
      console.warn("No cityCode found for location:", location); // 디버깅용
    }

    // 최근 검색어에 추가
    if (!recentSearches.includes(location)) {
      setRecentSearches([location, ...recentSearches.slice(0, 4)]);
    }
  };

  // 모달 토글 함수들
  const openSearchModal = () => setShowSearchModal(true);
  const closeSearchModal = () => setShowSearchModal(false);
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    if (showGuestSelector) setShowGuestSelector(false);
  };
  const toggleGuestSelector = () => {
    setShowGuestSelector(!showGuestSelector);
    if (showDatePicker) setShowDatePicker(false);
  };

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

  const clearDateSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedDateRange("");
  };

  // 인원 관련 함수들
  const updateGuestSummary = () => {
    let summary = `성인 ${adultCount}명`;
    if (childCount > 0) {
      summary += `, 청소년/아동 ${childCount}명`;
    }
    setGuestSummary(summary);
  };

  const resetGuestCount = (e) => {
    e.stopPropagation();
    setAdultCount(2);
    setChildCount(0);
    setChildAges([]);
    setGuestSummary("성인 2명");
  };

  // 검색 실행 함수
  const handleSearch = () => {
    const params = new URLSearchParams();

    // cityCode가 없으면 검색 불가
    if (!selectedCityCode) {
      alert("도시를 선택해주세요.");
      return;
    }

    // cityCode는 반드시 추가
    params.append("cityCode", selectedCityCode);

    if (startDate && endDate) {
      params.append("checkIn", format(startDate, "yyyy-MM-dd"));
      params.append("checkOut", format(endDate, "yyyy-MM-dd"));
    }
    params.append("adults", adultCount);
    if (childCount > 0) params.append("children", childCount);

    console.log("Search URL:", `/domestic/search/results?${params.toString()}`); // 디버깅용
    navigate(`/domestic/search/results?${params.toString()}`);
  };

  const navigate = useNavigate();

  return (
    <div className={styles.mainClass}>
      <h1 className={styles.pageTitle}>국내 숙소</h1>

      <div className={styles.searchFormContainer}>
        <div className={styles.searchGroup}>
          {/* 검색 장소 입력 */}
          <div className={styles.searchInput} onClick={openSearchModal}>
            <div className={styles.iconWrapper}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m18.875 20.475-5.55-5.55c-.5.383-1.075.692-1.725.925-.65.233-1.342.35-2.075.35-1.85 0-3.417-.646-4.7-1.938C3.542 12.97 2.9 11.4 2.9 9.55c0-1.85.642-3.421 1.925-4.713C6.108 3.546 7.675 2.9 9.525 2.9s3.421.646 4.713 1.937c1.291 1.292 1.937 2.863 1.937 4.713 0 .733-.112 1.425-.337 2.075a5.726 5.726 0 0 1-.913 1.7l5.575 5.6c.2.2.3.454.3.763 0 .308-.108.57-.325.787a1.101 1.101 0 0 1-.812.325c-.325 0-.588-.108-.788-.325ZM9.525 13.9c1.217 0 2.25-.421 3.1-1.263.85-.841 1.275-1.87 1.275-3.087s-.425-2.246-1.275-3.088c-.85-.841-1.883-1.262-3.1-1.262s-2.246.42-3.087 1.262c-.842.842-1.263 1.871-1.263 3.088s.421 2.246 1.263 3.087c.841.842 1.87 1.263 3.087 1.263Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="서울, 부산, 제주 도시만 검색 가능합니다"
              value={searchLocation}
              readOnly
              className={styles.inputField}
            />
          </div>

          {/* 날짜 선택 */}
          <div className={styles.searchInput} onClick={toggleDatePicker}>
            <div className={styles.iconWrapper}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.075 22.2c-.633 0-1.17-.22-1.612-.662a2.195 2.195 0 0 1-.663-1.613V6.075c0-.633.221-1.171.663-1.613A2.194 2.194 0 0 1 5.075 3.8H6v-.95c0-.3.104-.55.312-.75.209-.2.463-.3.763-.3s.554.104.763.312c.208.209.312.463.312.763V3.8h7.7v-.95c0-.3.104-.55.313-.75.208-.2.462-.3.762-.3s.554.104.763.312c.208.209.312.463.312.763V3.8h.925c.633 0 1.171.22 1.613.662.441.442.662.98.662 1.613v13.85c0 .633-.22 1.171-.662 1.613-.442.441-.98.662-1.613.662H5.075Zm0-2.275h13.85V10H5.075v9.925Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className={styles.inputText}>
              {selectedDateRange || "언제 떠나시나요?"}
            </span>
            {selectedDateRange && (
              <button
                className={styles.clearDateButton}
                onClick={(e) => {
                  e.stopPropagation();
                  clearDateSelection();
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* 인원 선택 */}
          <div
            className={styles.searchInput}
            onClick={toggleGuestSelector}
            ref={guestSelectorRef}
          >
            <div className={styles.iconWrapper}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12.25c-1.667 0-3.083-.583-4.25-1.75C6.583 9.333 6 7.917 6 6.25s.583-3.083 1.75-4.25C8.917.833 10.333.25 12 .25s3.083.583 4.25 1.75C17.417 3.167 18 4.583 18 6.25s-.583 3.083-1.75 4.25c-1.167 1.167-2.583 1.75-4.25 1.75Zm0-2.5c.967 0 1.783-.342 2.45-1.025.667-.683 1-1.508 1-2.475s-.333-1.792-1-2.475C13.783 2.592 12.967 2.25 12 2.25c-.967 0-1.792.342-2.475 1.025-.683.683-1.025 1.508-1.025 2.475s.342 1.792 1.025 2.475c.683.683 1.508 1.025 2.475 1.025Zm0 5.5c-3.533 0-6.708.875-9.525 2.625C-.342 19.625-.75 21.833-.75 24.5h2.5c0-2 .242-3.458.725-4.375.483-.917 1.392-1.708 2.725-2.375 1.333-.667 3.042-1 5.125-1s3.783.333 5.1 1c1.317.667 2.225 1.458 2.725 2.375.5.917.75 2.375.75 4.375h2.5c0-2.667-.417-4.875-1.25-6.625C17.583 16.125 14.4 15.25 12 15.25Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className={styles.inputText}>{guestSummary}</span>
            {(adultCount !== 2 || childCount !== 0) && (
              <button
                className={styles.clearDateButton}
                onClick={resetGuestCount}
              >
                ✕
              </button>
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
        </div>

        <button className={styles.searchButton} onClick={handleSearch}>
          검색
        </button>
      </div>

      {/* 모달 컴포넌트 */}
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

      {showSearchModal && (
        <SearchModal
          searchLocation={searchLocation}
          handleLocationInputChange={handleLocationInputChange}
          showLocationOptions={showLocationOptions}
          filteredOptions={filteredOptions}
          handleLocationSelect={handleLocationSelect}
          recentSearches={recentSearches}
          clearRecentSearches={() => setRecentSearches([])}
          popularDestinations={popularDestinations}
          popularRegions={popularRegions}
          getCountryFlag={getCountryFlag}
          getLocationDescription={getLocationDescription}
          onClose={closeSearchModal}
        />
      )}

      {/* 호텔 목록 섹션 */}
      <HotelListSection
        loading={loading}
        error={error}
        hotels={recommendedHotels}
      />
    </div>
  );
};

export default ForeignAccommodations;
