// 도시 목록 데이터 - 지원하는 8개 도시만 포함
export const destinations = [
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

// 도시 코드 매핑 - 현재 지원하는 8개 도시
export const cityCodeMap = {
  PAR: "파리",
  TYO: "도쿄",
  SEL: "서울",
  BKK: "방콕",
  HNL: "호놀룰루 (하와이)",
  CEB: "세부",
  OSA: "오사카",
  SGN: "호치민",
};

// TripNet 추천 지역 데이터 - 지원하는 도시에 맞게 수정
export const popularDestinations = [
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

// 인기 지역 데이터 - 지원하는 8개 도시만 포함
export const popularRegions = [
  { name: "파리", link: "/search?region=PAR" },
  { name: "도쿄", link: "/search?region=TYO" },
  { name: "서울", link: "/search?region=SEL" },
  { name: "방콕", link: "/search?region=BKK" },
  { name: "호놀룰루", link: "/search?region=HNL" },
  { name: "세부", link: "/search?region=CEB" },
  { name: "오사카", link: "/search?region=OSA" },
  { name: "호치민", link: "/search?region=SGN" },
];
