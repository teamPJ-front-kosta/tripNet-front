import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

// 컴포넌트 import
import HotelCard from "../../../02-components/HotelCard";
import ForeignSearchFilter from "../../../02-components/ForeignSearchFilter";
import SortSelector from "../../../02-components/SortSelector";
import { cityCodeMap } from "../../../04-data/destinations";

const DomesticSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // 검색 조건 상태
  const [searchCriteria, setSearchCriteria] = useState({
    location: searchParams.get("location") || "",
    cityCode: searchParams.get("cityCode") || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    adults: parseInt(searchParams.get("adults")) || 2,
    children: parseInt(searchParams.get("children")) || 0,
  });

  // 필터 상태
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 1000000 },
    rating: 0,
    facilities: [],
  });

  // 정렬 상태
  const [sortOption, setSortOption] = useState("recommended");

  // 호텔 데이터 상태
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("/api/domestic-accommodations")
      .then((res) => res.json())
      .then((data) => {
        // 데이터가 배열인지 확인
        if (!Array.isArray(data)) {
          console.error("Received data is not an array:", data);
          setHotels([]);
          return;
        }

        // cityCode별로 hotels만 평탄화
        const allHotels = data.flatMap((city) => {
          if (!city || !Array.isArray(city.hotels)) {
            console.warn("Invalid city data:", city);
            return [];
          }
          return city.hotels.map((hotel) => ({
            ...hotel,
            cityCode: city.cityCode,
          }));
        });
        setHotels(allHotels);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
        setHotels([]);
      });
  }, []);

  // location(한글 도시명) → cityCode 변환
  const codeFromLocation = React.useMemo(() => {
    if (searchCriteria.cityCode) return searchCriteria.cityCode;
    if (!searchCriteria.location) return "";
    // cityCodeMap: { PAR: "파리", ... }
    const found = Object.entries(cityCodeMap).find(
      ([code, name]) =>
        name.split(" ")[0] === searchCriteria.location.split(" ")[0]
    );
    return found ? found[0] : "";
  }, [searchCriteria.cityCode, searchCriteria.location]);

  // cityCode에 맞는 한글 도시명 반환
  const cityName = React.useMemo(() => {
    if (!codeFromLocation) return "";
    return cityCodeMap[codeFromLocation] || codeFromLocation;
  }, [codeFromLocation]);

  // 필터 변경 핸들러
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // TODO: 필터링 로직 구현
  };

  // 정렬 변경 핸들러
  const handleSortChange = (option) => {
    setSortOption(option);
    // TODO: 정렬 로직 구현
  };

  // offers가 있는 호텔만 필터링
  const filteredHotels = hotels.filter(
    (hotel) =>
      (codeFromLocation ? hotel.cityCode === codeFromLocation : true) &&
      hotel.offers &&
      hotel.offers.length > 0
  );

  return (
    <div className={styles.container}>
      {/* 검색 조건 요약 */}
      <div className={styles.searchSummary}>
        <h1>{cityName ? `${cityName} 숙소 검색 결과` : "숙소 검색 결과"}</h1>
        <p>
          {searchCriteria.checkIn && searchCriteria.checkOut
            ? `${searchCriteria.checkIn} - ${searchCriteria.checkOut}`
            : "-"}
          {` · 성인 ${searchCriteria.adults}명`}
          {searchCriteria.children > 0 && `, 아동 ${searchCriteria.children}명`}
        </p>
        <span className={styles.resultCount}>
          {filteredHotels.length}개의 숙소
        </span>
      </div>

      <div className={styles.content}>
        {/* 필터 섹션 */}
        <aside className={styles.filterSection}>
          <ForeignSearchFilter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* 메인 컨텐츠 */}
        <main className={styles.mainContent}>
          {/* 정렬 옵션 */}
          <div className={styles.sortSection}>
            <SortSelector
              currentSort={sortOption}
              onSortChange={handleSortChange}
            />
          </div>

          {/* 호텔 목록 */}
          <div className={styles.hotelList}>
            {filteredHotels.length === 0 ? (
              <div className={styles.noResult}>검색 결과가 없습니다.</div>
            ) : (
              filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.hotelId}
                  hotel={hotel}
                  onClick={() =>
                    navigate(`/domestic/hotel/${hotel.cityCode}/${hotel.hotelId}`, {
                      state: {
                        checkIn: searchCriteria.checkIn,
                        checkOut: searchCriteria.checkOut,
                        adults: searchCriteria.adults,
                      },
                    })
                  }
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DomesticSearchResults;
