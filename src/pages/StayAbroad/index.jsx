import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import EventCard from "../../components/EventCard";

const StayAbroad = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [recommendedHotels, setRecommendedHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destinationOptions, setDestinationOptions] = useState([]);

  // 추천 호텔 데이터 가져오기
  useEffect(() => {
    const fetchRecommendedHotels = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3001/api/accommodations"
        );
        const data = await response.json();

        // API 응답 데이터를 EventCard에 맞는 형식으로 변환
        const hotelCards = [];

        // 도시별 첫번째 호텔만 선택 (지역당 1개)
        data.forEach((cityData) => {
          if (cityData.hotels && cityData.hotels.length > 0) {
            // 각 도시의 첫 번째 호텔만 선택
            const hotel = cityData.hotels[0];
            hotelCards.push({
              id: hotel.hotelId,
              cityCode: cityData.cityCode,
              title: hotel.hotelName,
              subtitle: getCityName(cityData.cityCode),
              imageUrl: hotel.imageUrl,
              alt: `${hotel.hotelName} 이미지`,
              linkUrl: `/hotel/${cityData.cityCode}/${hotel.hotelId}`,
            });
          }
        });

        setRecommendedHotels(hotelCards);
        setError(null);
      } catch (err) {
        console.error("호텔 데이터 가져오기 실패:", err);
        setError(
          "데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요."
        );

        // 에러 발생 시 기본 데이터 설정
        setRecommendedHotels([
          {
            id: 1,
            cityCode: "PAR",
            title: "파리 센터 호텔",
            subtitle: "파리",
            imageUrl: "https://source.unsplash.com/featured/?paris,hotel",
            alt: "파리 호텔 이미지",
            linkUrl: "/hotel/PAR/1",
          },
          {
            id: 2,
            cityCode: "TYO",
            title: "도쿄 스카이 호텔",
            subtitle: "도쿄",
            imageUrl: "https://source.unsplash.com/featured/?tokyo,hotel",
            alt: "도쿄 호텔 이미지",
            linkUrl: "/hotel/TYO/2",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    // 목적지 옵션 가져오기
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/destinations");
        const data = await response.json();
        setDestinationOptions(data);
      } catch (err) {
        console.error("목적지 데이터 가져오기 실패:", err);
        // 기본 목적지 데이터 설정
        setDestinationOptions([
          "도쿄",
          "오사카",
          "서울",
          "제주",
          "방콕",
          "푸켓",
          "세부",
          "발리",
        ]);
      }
    };

    fetchRecommendedHotels();
    fetchDestinations();
  }, []);

  // 도시 코드에 따른 도시 이름 반환
  const getCityName = (cityCode) => {
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

    return cityNames[cityCode] || cityCode;
  };

  const handleLocationInputChange = (e) => {
    const value = e.target.value;
    setSearchLocation(value);

    if (value.trim() === "") {
      setFilteredOptions([]);
      setShowLocationOptions(false);
    } else {
      const filtered = destinationOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowLocationOptions(true);
    }
  };

  const handleLocationSelect = (location) => {
    setSearchLocation(location);
    setShowLocationOptions(false);
  };

  return (
    <div className={styles.mainClass}>
      <h1 className={styles.pageTitle}>해외 숙소</h1>

      <div className={styles.tabsWrapper}>
        <div className={styles.tabsContainer}>
          <div className={styles.tabActive}>호텔·그 외</div>
          <div className={styles.tab}>한인민박</div>
        </div>
      </div>

      <div className={styles.searchFormContainer}>
        <div className={styles.searchGroup}>
          <div className={styles.searchInput}>
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
              placeholder="어디로 떠나시나요?"
              value={searchLocation}
              onChange={handleLocationInputChange}
              onFocus={() => searchLocation && setShowLocationOptions(true)}
              className={styles.inputField}
            />
            {showLocationOptions && filteredOptions.length > 0 && (
              <div className={styles.locationDropdown}>
                {filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className={styles.locationOption}
                    onClick={() => handleLocationSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.searchInput}>
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
            <span className={styles.inputText}>언제 떠나시나요?</span>
          </div>

          <div className={styles.searchInput}>
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
            <span className={styles.inputText}>성인 2명</span>
          </div>
        </div>

        <button className={styles.searchButton}>검색</button>
      </div>

      <section className={styles.contentSection}>
        <div className={styles.eventSection}>
          <h2 className={styles.sectionTitle}>tripNet 추천 숙소</h2>
          <div className={styles.eventCardList}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>호텔 정보를 불러오는 중...</p>
              </div>
            ) : error ? (
              <div className={styles.errorContainer}>
                <p>{error}</p>
              </div>
            ) : recommendedHotels.length > 0 ? (
              recommendedHotels.map((hotel) => (
                <div key={hotel.id} className={styles.eventCardWrapper}>
                  <EventCard
                    title={hotel.title}
                    subtitle={hotel.subtitle}
                    imageUrl={hotel.imageUrl}
                    alt={hotel.alt}
                    linkUrl={hotel.linkUrl}
                  />
                </div>
              ))
            ) : (
              <div className={styles.noDataContainer}>
                <p>추천 숙소 정보가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StayAbroad;
