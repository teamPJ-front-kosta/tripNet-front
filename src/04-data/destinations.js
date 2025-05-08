// 국내 도시 목록 데이터
export const domesticDestinations = ["서울", "부산", "제주", "인천", "강원도"];

// 해외 도시 목록 데이터 (8개 도시)
export const foreignDestinations = [
  "파리", // PAR
  "도쿄", // TYO
  "서울", // SEL
  "방콕", // BKK
  "호놀룰루", // HNL
  "하와이", // HNL 검색어 추가
  "세부", // CEB
  "오사카", // OSA
  "호치민", // SGN
];

// 국내 도시 코드 매핑
export const domesticCityCodeMap = {
  SEL: "서울",
  PUS: "부산",
  CJU: "제주",
};

// 해외 도시 코드 매핑 (8개 도시)
export const foreignCityCodeMap = {
  PAR: "파리",
  TYO: "도쿄",
  SEL: "서울",
  BKK: "방콕",
  HNL: "호놀룰루 (하와이)",
  CEB: "세부",
  OSA: "오사카",
  SGN: "호치민",
};

// 국내 TripNet 추천 지역 데이터
export const domesticPopularDestinations = [
  {
    name: "서울 그랜드 호텔",
    subtitle: "시내 중심가",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    link: "/domestic/hotel/SEL/SELHTL01",
  },
  {
    name: "부산 해운대 호텔",
    subtitle: "해변 전망",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    link: "/domestic/hotel/PUS/PUSHTL01",
  },
  {
    name: "제주 서귀포 호텔",
    subtitle: "제주 특가",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    link: "/domestic/hotel/CJU/CJUHTL01",
  },
];

// 해외 TripNet 추천 지역 데이터
export const foreignPopularDestinations = [
  {
    name: "파리 에펠탑 호텔",
    subtitle: "낭만의 도시",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    link: "/hotel/PAR/RTPARMAI",
  },
  {
    name: "알로하 리조트",
    subtitle: "선착순 최저가",
    image:
      "https://images.unsplash.com/photo-1542259009477-d625272157b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    link: "/hotel/HNL/HNLRES01",
  },
  {
    name: "방콕 시암 호텔",
    subtitle: "메가세일",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    link: "/hotel/BKK/BKKHTL01",
  },
];

// 국내 인기 지역 데이터
export const domesticPopularRegions = [
  { name: "서울", link: "/domestic/search?region=SEL" },
  { name: "부산", link: "/domestic/search?region=PUS" },
  { name: "제주", link: "/domestic/search?region=CJU" },
];

// 해외 인기 지역 데이터 (8개 도시)
export const foreignPopularRegions = [
  { name: "파리", link: "/search?region=PAR" },
  { name: "도쿄", link: "/search?region=TYO" },
  { name: "서울", link: "/search?region=SEL" },
  { name: "방콕", link: "/search?region=BKK" },
  { name: "호놀룰루", link: "/search?region=HNL" },
  { name: "세부", link: "/search?region=CEB" },
  { name: "오사카", link: "/search?region=OSA" },
  { name: "호치민", link: "/search?region=SGN" },
];
