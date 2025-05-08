<<<<<<< HEAD
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
=======
// 도시 목록 데이터
export const destinations = [
  // 아시아
  "도쿄",
  "오사카",
  "교토",
  "후쿠오카",
  "삿포로",
  "나고야",
  "오키나와",
  "서울",
  "부산",
  "제주",
  "인천",
  "강원도",
  "방콕",
  "푸켓",
  "치앙마이",
  "파타야",
  "크라비",
  "후아힌",
  "베이징",
  "상하이",
  "홍콩",
  "마카오",
  "광저우",
  "하이난",
  "싱가포르",
  "타이페이",
  "가오슝",
  "타이중",
  "하노이",
  "호치민",
  "다낭",
  "나트랑",
  "푸꾸옥",
  "쿠알라룸푸르",
  "페낭",
  "코타키나발루",
  "랑카위",
  "발리",
  "자카르타",
  "보로부두르",
  "롬복",
  "마닐라",
  "세부",
  "보라카이",
  "팔라완",
  "뭄바이",
  "뉴델리",
  "아그라",
  "바라나시",
  "자이푸르",
  "몰디브",
  "네팔",
  "스리랑카",
  "몽골",

  // 유럽
  "파리",
  "니스",
  "마르세유",
  "리옹",
  "몽생미셸",
  "런던",
  "맨체스터",
  "에든버러",
  "리버풀",
  "옥스포드",
  "로마",
  "베네치아",
  "피렌체",
  "밀라노",
  "나폴리",
  "아말피",
  "바르셀로나",
  "마드리드",
  "세비야",
  "그라나다",
  "발렌시아",
  "아테네",
  "산토리니",
  "미코노스",
  "크레타",
  "이스탄불",
  "카파도키아",
  "파묵칼레",
  "안탈리아",
  "암스테르담",
  "로테르담",
  "헤이그",
  "베를린",
  "뮌헨",
  "프랑크푸르트",
  "함부르크",
  "쾰른",
  "취리히",
  "제네바",
  "루체른",
  "인터라켄",
  "비엔나",
  "잘츠부르크",
  "인스브루크",
  "프라하",
  "부다페스트",
  "바르샤바",
  "스톡홀름",
  "헬싱키",
  "모스크바",
  "상트페테르부르크",
  "키예프",

  // 북미/중남미
  "뉴욕",
  "로스앤젤레스",
  "시카고",
  "샌프란시스코",
  "라스베가스",
  "마이애미",
  "보스턴",
  "하와이",
  "괌",
  "토론토",
  "밴쿠버",
  "몬트리올",
  "퀘벡",
  "멕시코시티",
  "칸쿤",
  "로스카보스",
  "하바나",
  "푸에르토리코",
  "도미니카공화국",
  "리우데자네이루",
  "상파울루",
  "브라질리아",
  "부에노스아이레스",
  "산티아고",
  "리마",
  "보고타",
  "카르타헤나",

  // 오세아니아
  "시드니",
  "멜버른",
  "브리즈번",
  "골드코스트",
  "퍼스",
  "케언즈",
  "울룰루",
  "오클랜드",
  "퀸스타운",
  "웰링턴",
  "크라이스트처치",
  "피지",
  "타히티",
  "팔라우",

  // 중동/아프리카
  "두바이",
  "아부다비",
  "도하",
  "리야드",
  "예루살렘",
  "텔아비브",
  "카이로",
  "마라케시",
  "케이프타운",
  "요하네스버그",
  "나이로비",
  "모리셔스",
  "세이셸",
];

// 도시 코드 매핑
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
export const cityCodeMap = {
  PAR: "파리",
  TYO: "도쿄",
  SEL: "서울",
  BKK: "방콕",
<<<<<<< HEAD
  HNL: "호놀룰루 (하와이)",
=======
  HNL: "호놀룰루",
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
  CEB: "세부",
  OSA: "오사카",
  SGN: "호치민",
};

<<<<<<< HEAD
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
=======
// TripNet 추천 지역 데이터
export const popularDestinations = [
  {
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
    name: "알로하 리조트",
    subtitle: "선착순 최저가",
    image:
      "https://images.unsplash.com/photo-1542259009477-d625272157b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
<<<<<<< HEAD
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
=======
    link: "/hotel/HNL/123",
  },
  {
    name: "팜 프리미어 호텔",
    subtitle: "메가세일",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    link: "/hotel/BKK/124",
  },
  {
    name: "후쿠오카 리조트",
    subtitle: "나트랑 특가",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    link: "/hotel/OSA/125",
  },
];

// 인기 지역 데이터
export const popularRegions = [
  { name: "오사카", link: "/search?region=osaka" },
  { name: "후쿠오카", link: "/search?region=fukuoka" },
  { name: "도쿄", link: "/search?region=tokyo" },
  { name: "다낭", link: "/search?region=danang" },
  { name: "파리", link: "/search?region=paris" },
  { name: "로마", link: "/search?region=rome" },
  { name: "상포로", link: "/search?region=sapporo" },
  { name: "신베이", link: "/search?region=xinbei" },
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
];
