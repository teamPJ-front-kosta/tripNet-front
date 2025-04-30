// 국가 코드에 따른 국기 이모지 반환 함수
export const getCountryFlag = (location) => {
  // 도시 이름으로 국가 예측 (단순화된 매핑)
  const locationLower = location.toLowerCase();

  if (
    locationLower.includes("서울") ||
    locationLower.includes("부산") ||
    locationLower.includes("제주")
  )
    return "🇰🇷";
  if (
    locationLower.includes("도쿄") ||
    locationLower.includes("오사카") ||
    locationLower.includes("후쿠오카")
  )
    return "🇯🇵";
  if (locationLower.includes("방콕") || locationLower.includes("푸켓"))
    return "🇹🇭";
  if (locationLower.includes("파리") || locationLower.includes("니스"))
    return "🇫🇷";
  if (locationLower.includes("런던") || locationLower.includes("맨체스터"))
    return "🇬🇧";
  if (
    locationLower.includes("로마") ||
    locationLower.includes("베네치아") ||
    locationLower.includes("밀라노")
  )
    return "🇮🇹";
  if (
    locationLower.includes("바르셀로나") ||
    locationLower.includes("마드리드")
  )
    return "🇪🇸";
  if (
    locationLower.includes("뉴욕") ||
    locationLower.includes("로스앤젤레스") ||
    locationLower.includes("하와이")
  )
    return "🇺🇸";
  if (locationLower.includes("베이징") || locationLower.includes("상하이"))
    return "🇨🇳";
  if (
    locationLower.includes("호치민") ||
    locationLower.includes("하노이") ||
    locationLower.includes("다낭")
  )
    return "🇻🇳";
  if (locationLower.includes("몽골")) return "🇲🇳";
  if (locationLower.includes("괌")) return "🇬🇺";

  // 기본 국기는 세계 국기
  return "🌎";
};

// 지역에 대한 간략한 설명 추가
export const getLocationDescription = (location) => {
  // 도시 이름으로 국가 예측 (단순화된 매핑)
  const locationLower = location.toLowerCase();

  if (
    locationLower.includes("서울") ||
    locationLower.includes("부산") ||
    locationLower.includes("제주")
  )
    return "대한민국";
  if (
    locationLower.includes("도쿄") ||
    locationLower.includes("오사카") ||
    locationLower.includes("후쿠오카")
  )
    return "일본";
  if (locationLower.includes("방콕") || locationLower.includes("푸켓"))
    return "태국";
  if (locationLower.includes("파리") || locationLower.includes("니스"))
    return "프랑스";
  if (locationLower.includes("런던") || locationLower.includes("맨체스터"))
    return "영국";
  if (
    locationLower.includes("로마") ||
    locationLower.includes("베네치아") ||
    locationLower.includes("밀라노")
  )
    return "이탈리아";
  if (
    locationLower.includes("바르셀로나") ||
    locationLower.includes("마드리드")
  )
    return "스페인";
  if (
    locationLower.includes("뉴욕") ||
    locationLower.includes("로스앤젤레스") ||
    locationLower.includes("하와이")
  )
    return "미국";
  if (locationLower.includes("베이징") || locationLower.includes("상하이"))
    return "중국";
  if (
    locationLower.includes("호치민") ||
    locationLower.includes("하노이") ||
    locationLower.includes("다낭")
  )
    return "베트남";
  if (locationLower.includes("몽골")) return "몽골";
  if (locationLower.includes("괌")) return "미국령";

  // 기본 설명
  return "인기 여행지";
};
