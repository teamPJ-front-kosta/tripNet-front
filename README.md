# 🧭 tripNet 프론트엔드

![tripNet Frontend](https://via.placeholder.com/800x400?text=tripNet+Frontend)

`tripNet`은 국내·해외 숙소, 티켓/투어 상품을 검색하고 예약할 수 있는 웹 기반 여행 플랫폼입니다.
본 프로젝트는 **KOSTA 팀 프로젝트**로 진행되었으며, Amadeus API를 활용해 실시간 숙소 데이터를 제공합니다.

## ✨ 주요 기능

- 국내/해외 숙소 검색 및 필터링
- 호텔 상세 정보 페이지 + 지도 및 후기 섹션
- StickyFooter로 스크롤 위치 감지 고정 예약 버튼
- 예약 옵션 선택 및 결제 모달 시뮬레이션 (USD 기반)
- 로그인 기능 (json-server + bcrypt 연동)
- 인기 도시별 숙소 추천 배너 제공
- 투어/티켓 상품 탐색 (목업 데이터 기반)

## 🛠️ 기술 스택

| 영역       | 기술                                                  |
| ---------- | ----------------------------------------------------- |
| 프레임워크 | React                                                 |
| 라우팅     | React Router                                          |
| 스타일링   | CSS Modules, SCSS, CSS                                |
| API 통신   | Axios, fetch                                          |
| 백엔드     | Node.js + Express (`tripNet-backend` 리포지토리 별도) |
| 인증/보안  | bcryptjs, localStorage                                |
| 협업       | GitHub                                                |

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

접속 주소: [http://localhost:3000](http://localhost:3000)

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

## 🔐 로그인 기능 설명

- `json-server`에 저장된 사용자 이메일/비밀번호 기반 로그인 처리
- `bcryptjs`로 해시된 비밀번호 비교
- 로그인 성공 시:

  - localStorage에 로그인 상태 저장
  - sukuna 오디오 (`/audio/sukuna.mp3`) 재생
  - 로그인 이벤트 window에 dispatch → 상태 공유
  - 홈(`/`)으로 이동

- Enter 키 로그인 처리 지원
- 소셜 로그인 버튼 UI 제공 (클릭 시 안내 메시지)

## 🔌 API 연동

### 사용 API

- GET `/api/foreign-accommodations` – 해외 숙소 목록 조회
- GET `/api/foreign-accommodations/search?hotelId=...` – 특정 호텔 상세/옵션 조회
- GET `/api/tickets` – 투어/티켓 목업 JSON
- POST `/api/auth/kakao`, `/naver` – 소셜 로그인 연동 (예정)
- GET `/` – 서버 상태 확인

### 프록시 설정

```json
// package.json
"proxy": "http://localhost:3001"
```

개발 중 API 요청 시 CORS 문제 없이 백엔드로 연결됩니다.

## 🌿 브랜치 전략 & 협업 규칙

### 기본 브랜치

- **main**: 배포 가능한 안정 버전

### 작업 브랜치 예시

| 브랜치명                  | 담당자 |
| ------------------------- | ------ |
| bg                        | 병규   |
| hhs-domesticAccommodation | 환성   |
| hyeeun-pages              | 혜은   |
| yoonbin-ticket            | 윤빈   |

### 작업 규칙

- main 직접 커밋 ❌
- 항상 개인 브랜치 → PR → 리뷰 → merge
- 기능 단위로 커밋

> ⚠️ 모든 작업 브랜치는 `main` 브랜치에서 최신 상태를 기준으로 생성해야 합니다.
>
> ```bash
> git checkout main
> git pull origin main
> git checkout -b [작업브랜치명]
> ```

```bash
git checkout main
git pull origin main

git checkout 개인 브랜치
# 작업 후
git add .
git commit -m "해외 숙소 UI 구성"
git push origin 개인 브랜치
```

## 👥 팀원 소개

| 이름   | 역할                         |
| ------ | ---------------------------- |
| 조윤빈 | 티켓/투어 UI 개발            |
| 이병규 | 홈 페이지, 로그인 구현       |
| 황환성 | 국내 숙소, 지도 연동         |
| 이혜은 | 해외 숙소, 전체 기획 및 발표 |
