import "../css/search_where.css";
import { useEffect, useRef } from "react";

function Search_where() {
  const locations = ["제주", "김원", "부산", "서울", "전남", "경기"];
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        document.getElementById("Search_where").hidden = true;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activeButton = () => {
    document.getElementById("search_span").innerHTML = document.getElementById("search_where_input").value;
    document.getElementById("search_span").style.cssText = "color: black";
    document.getElementById("Search_where").hidden = true;
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      activeButton();
    }
  };

  const recentSearches = [
    {
      flag: "🇰🇷",
      location: "강동구",
      subtext: "한국, 서울"
    }
  ];

  return (
    <div className="search_where_div">
      <div className="search_where_container" ref={containerRef}>
        <div className="search_input_wrapper">
          <div className="search_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="search-icon"
              color="#666d75"
            >
              <path d="m18.875 20.475-5.55-5.55c-.5.383-1.075.692-1.725.925-.65.233-1.342.35-2.075.35-1.85 0-3.417-.646-4.7-1.938C3.542 12.97 2.9 11.4 2.9 9.55c0-1.85.642-3.421 1.925-4.713C6.108 3.546 7.675 2.9 9.525 2.9s3.421.646 4.713 1.937c1.291 1.292 1.937 2.863 1.937 4.713 0 .733-.112 1.425-.337 2.075a5.726 5.726 0 0 1-.913 1.7l5.575 5.6c.2.2.3.454.3.763 0 .308-.108.57-.325.787a1.101 1.101 0 0 1-.812.325c-.325 0-.588-.108-.788-.325ZM9.525 13.9c1.217 0 2.25-.421 3.1-1.263.85-.841 1.275-1.87 1.275-3.087s-.425-2.246-1.275-3.088c-.85-.841-1.883-1.262-3.1-1.262s-2.246.42-3.087 1.262c-.842.842-1.263 1.871-1.263 3.088s.421 2.246 1.263 3.087c.841.842 1.87 1.263 3.087 1.263Z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="여행지나 숙소명 검색"
            onKeyDown={activeEnter}
            id="search_where_input"
            autoComplete="off"
          />
        </div>

        <div className="search_content">
          <button className="location_button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
            </svg>
            내 주변으로 검색
          </button>

          <div className="recent_searches">
            <h4>최근 검색</h4>
            {recentSearches.map((item, index) => (
              <div key={index} className="recent_search_item">
                <span className="flag">{item.flag}</span>
                <div className="location_info">
                  <span className="location">{item.location}</span>
                  <span className="subtext">{item.subtext}</span>
                </div>
                <svg
                  className="arrow-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            ))}
          </div>

          <div className="popular_locations">
            <h4>인기 지역</h4>
            <div className="location_buttons">
              {locations.map((location, index) => (
                <button key={index} className="location_tag">
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search_where;
