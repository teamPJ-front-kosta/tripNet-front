import React, { useState } from "react";
import styles from "./styles.module.css";
import { cityCodeMap } from "../../04-data/destinations";
import { Link } from "react-router-dom";

// 도시명으로 도시코드 찾기 위한 역방향 매핑 추가
const cityToCodeMap = Object.entries(cityCodeMap).reduce(
  (acc, [code, city]) => {
    // 도시 이름에서 괄호 부분 제거하여 기본 매핑
    const baseName = city.split(" (")[0];
    acc[baseName] = code;

    // '하와이' 추가 매핑
    if (code === "HNL") {
      acc["하와이"] = code;
    }

    return acc;
  },
  {}
);

const SearchModal = ({
  searchLocation,
  handleLocationInputChange,
  showLocationOptions,
  filteredOptions,
  handleLocationSelect,
  recentSearches,
  clearRecentSearches,
  popularDestinations,
  popularRegions,
  getCountryFlag,
  getLocationDescription,
  onClose,
}) => {
  // 지원하지 않는 도시 검색 시 안내 메시지 표시 상태
  const [notSupportedMessage, setNotSupportedMessage] = useState(false);

  // 검색 입력 처리 수정 - 지원 도시만 필터링
  const handleInputChange = (e) => {
    const value = e.target.value;

    // 검색어가 없는 경우
    if (value.trim() === "") {
      setNotSupportedMessage(false);
      handleLocationInputChange(e); // 원래 핸들러 호출
      return;
    }

    // 기존 핸들러 호출하여 filteredOptions 업데이트
    handleLocationInputChange(e);

    // 지원 도시 확인 - cityCodeMap의 값(도시명) 중에 있는지 체크
    const supportedCities = Object.values(cityCodeMap);
    const matchedCities = supportedCities.filter((city) =>
      city.toLowerCase().includes(value.trim().toLowerCase())
    );

    // 매칭된 도시가 없으면 안내 메시지 표시
    setNotSupportedMessage(matchedCities.length === 0);
  };

  return (
    <div className={styles.searchModalOverlay} onClick={onClose}>
      <div
        className={styles.searchModalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.searchModalHeader}>
          <h3>목적지 검색</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <div className={styles.searchInputContainer}>
              <div className={styles.searchIcon}>
                <svg
                  width="24"
                  height="24"
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
                placeholder="파리, 도쿄, 서울 등 지원 도시만 검색 가능합니다"
                value={searchLocation}
                onChange={handleInputChange}
                className={styles.searchInput}
                autoFocus
              />
              {searchLocation && (
                <button
                  className={styles.clearButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange({ target: { value: "" } });
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.searchContent}>
          {/* 지원하지 않는 도시 검색 시 안내 메시지 */}
          {notSupportedMessage && (
            <div className={styles.notSupportedMessage}>
              현재 파리, 도쿄, 서울, 방콕, 호놀룰루, 세부, 오사카, 호치민 등 8개
              도시만 지원합니다.
            </div>
          )}

          {/* 검색 결과 표시 - 도시코드 추가 */}
          {showLocationOptions &&
            filteredOptions.length > 0 &&
            !notSupportedMessage && (
            <div className={styles.contentCenter}>
              <div className={styles.searchResults}>
                <div className={styles.resultsList}>
                  {filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      className={styles.resultItem}
                      onClick={() => handleLocationSelect(option)}
                    >
                      <div className={styles.locationFlag}>
                        {getCountryFlag(option)}
                      </div>
                      <div className={styles.locationInfo}>
                          <div className={styles.locationName}>
                            {option}{" "}
                            {cityToCodeMap[option] &&
                              `(${cityToCodeMap[option]})`}
                          </div>
                        <div className={styles.locationDescription}>
                          {getLocationDescription(option)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 검색창에 입력이 없을 때 기본 표시 내용 */}
          {!showLocationOptions && (
            <div className={styles.contentCenter}>
              <div className={styles.tripNetRecommend}>
                <h4 className={styles.sectionTitle}>TripNet 추천 지역</h4>
                <div className={styles.recommendedCards}>
                  {popularDestinations.map((destination, index) => {
                    // link: "/hotel/PAR/RTPARMAI" 형식에서 cityCode 추출
                    const match = destination.link.match(/\/hotel\/(\w+)\//);
                    const cityCode = match ? match[1] : "";
                    return (
                      <Link
                        to={`/foreign/search?cityCode=${cityCode}`}
                      key={index}
                      className={styles.recommendedCard}
                    >
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className={styles.recommendedImage}
                      />
                      <div className={styles.gradientOverlay}></div>
                      <div className={styles.recommendedInfo}>
                        <div className={styles.recommendedName}>
                          {destination.name}
                        </div>
                        <div className={styles.recommendedSubtitle}>
                          {destination.subtitle}
                        </div>
                      </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* 인기 지역 태그 */}
              <div className={styles.popularRegionsSection}>
                <h4 className={styles.sectionTitle}>인기 지역</h4>
                <div className={styles.regionTags}>
                  {popularRegions.map((region, index) => {
                    // region.link: "/search?region=PAR"에서 cityCode 추출
                    const match = region.link.match(/region=(\w+)/);
                    const cityCode = match ? match[1] : "";
                    return (
                      <Link
                        to={`/foreign/search?cityCode=${cityCode}`}
                      key={index}
                      className={styles.regionTag}
                    >
                      {region.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
