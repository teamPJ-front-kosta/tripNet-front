// 도시 목록 데이터 - 지원하는 도시만 포함
export const destinations = [
  "부산", // PUS
  "제주", // CJU
  "서울", // SEL
];

// 도시 코드 매핑 - 현재 지원하는 도시
export const cityCodeMap = {
  PUS: "부산",
  CJU: "제주",
  SEL: "서울",
};

// TripNet 추천 지역 데이터 - 국내 도시로 수정
export const popularDestinations = [
  {
    name: "서울",
    subtitle: "대한민국의 수도",
    image:
      "https://images.unsplash.com/photo-1538485399081-7c8ed7f0c1c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    link: "/domestic/search?cityCode=SEL",
  },
  {
    name: "부산",
    subtitle: "해운대와 광안대교의 도시",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    link: "/domestic/search?cityCode=PUS",
  },
  {
    name: "제주",
    subtitle: "아름다운 섬과 한라산",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    link: "/domestic/search?cityCode=CJU",
  },
];

// 인기 지역 데이터 - 국내 도시로 수정
export const popularRegions = [
  { name: "서울", link: "/search?region=SEL" },
  { name: "부산", link: "/search?region=PUS" },
  { name: "제주", link: "/search?region=CJU" },
];
