# 🧭 tripNet 프론트엔드

![tripNet Frontend](https://via.placeholder.com/800x400?text=tripNet+Frontend)

`tripNet`은 국내·해외 숙소, 티켓/투어 상품을 검색하고 예약할 수 있는 웹 기반 여행 플랫폼입니다.  
본 프로젝트는 **KOSTA 팀 프로젝트**로 진행되었으며, Amadeus API를 활용해 실시간 숙소 데이터를 제공합니다.

## ✨ 주요 기능

- 국내/해외 숙소 검색
- 숙소 상세 페이지
- 인기 지역, 추천 배너 제공
- 투어/티켓 상품 탐색
- (개발 예정) 결제 및 예약 기능 연동

## 🛠️ 기술 스택

| 영역       | 기술                                                  |
| ---------- | ----------------------------------------------------- |
| 프레임워크 | React                                                 |
| 라우팅     | React Router                                          |
| 스타일링   | CSS Modules                                           |
| API 통신   | Axios                                                 |
| 백엔드     | Node.js + Express (별도 `tripNet-backend` 리포지토리) |
| 협업       | GitHub, Figma                                         |

## 🚀 설치 및 실행 방법

### 사전 요구사항

- Node.js (v14 이상)
- npm (v6 이상)
- 백엔드 서버 실행 (`tripNet-backend` 필요)

### 설치

```bash
git clone https://github.com/your-username/tripNet-front.git
cd tripNet-front
npm install
```

### 개발 서버 실행

```bash
npm start
```

접속 주소: http://localhost:3000

## 📁 디렉토리 구조

```
src/
├── 01-assets/               # 이미지, 배너, 폰트 등 정적 리소스
├── 02-components/           # 공통 UI 컴포넌트 (Header, Footer 등)
├── 03-pages/                # 페이지별 디렉토리 (URL 단위)
│   ├── Home/
│   ├── ForeignAccommodations/
│   ├── DomesticAccommodations/
│   ├── TourTickets/
│   ├── HotelDetail/
│   └── TourDetail/
├── 04-data/                 # 정적 데이터 및 더미 데이터
├── 05-utils/                # 공통 함수 유틸리티 (국기 출력, 날짜 등)
├── App.js                   # 전체 라우팅 및 Layout 설정
└── index.js                 # 앱 진입점
```

## 📖 디렉토리 설명

| 디렉토리       | 설명                                                             |
| -------------- | ---------------------------------------------------------------- |
| 01-assets/     | 이미지, 배너, 로고 등 import해서 쓰는 정적 리소스                |
| 02-components/ | Header, Footer, 공통 검색창 등 여러 페이지에서 공유되는 컴포넌트 |
| 03-pages/      | 각 기능별 페이지 단위 디렉토리 (기능별 역할 분담에 적합)         |
| 04-data/       | 더미 JSON 데이터나 지역 리스트 등 정적인 데이터                  |
| 05-utils/      | 국기 출력, 날짜 포맷 등 반복되는 함수들 저장                     |
| App.js         | 전체 앱 구조 및 라우팅 담당                                      |
| index.js       | React 앱 진입점 (root.render)                                    |

## 🔌 API 연동

### 사용 API

- GET `/api/accommodations`: 숙소 목록 조회
- GET `/api/destinations`: 목적지 검색
- GET `/`: 서버 상태 확인

### 예시 코드

```javascript
const fetchRecommendedHotels = async () => {
  try {
    const res = await fetch("/api/accommodations");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("숙소 데이터 실패", err);
  }
};
```

### 프록시 설정 (개발 중 CORS 문제 해결용)

```json
// package.json
"proxy": "http://localhost:3001"
```

개발 서버에서 `/api/xxx` 요청은 자동으로 백엔드로 프록시됩니다.

## 🌿 브랜치 전략 & 협업 규칙

### 기본 브랜치

- **main**: 배포 가능한 안정 버전

### 작업 브랜치 예시

| 브랜치명                  | 담당자 | 역할            |
| ------------------------- | ------ | --------------- |
| bg                        | 병규   | 홈, 로그인      |
| hhs-domesticAccommodation | 환성   | 국내 숙소       |
| hyeeun-pages              | 혜은   | 해외 숙소, 기획 |
| yoonbin-ticket            | 윤빈   | 투어/티켓       |

### 작업 규칙

- 직접 main에 커밋 ❌
- 항상 개인 브랜치 → PR → 리뷰 → merge
- PR 제목은 간단히, 커밋은 기능 단위로

### 기본 작업 흐름

```bash
git checkout main
git pull origin main

git checkout hyeeun-pages
# 작업
git add .
git commit -m "해외 숙소 검색 UI 수정"
git push origin hyeeun-pages
```

GitHub에서 PR 생성 → 리뷰 후 merge

## 👥 팀원 소개

| 이름   | 역할                         |
| ------ | ---------------------------- |
| 조윤빈 | 투어/티켓 UI 개발            |
| 이병규 | 홈 페이지, 로그인            |
| 황환성 | 국내 숙소, 지도 연동         |
| 이혜은 | 해외 숙소, 전체 기획 및 발표 |
