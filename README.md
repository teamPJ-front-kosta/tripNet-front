# tripNet 프론트엔드

![tripNet Frontend](https://via.placeholder.com/800x400?text=tripNet+Frontend)

## 📝 프로젝트 소개

tripNet은 전 세계 다양한 도시의 호텔과 숙소를 검색하고 예약할 수 있는 웹 애플리케이션입니다.  
본 프로젝트는 KOSTA 팀 프로젝트로 진행되었으며, 실시간 호텔 데이터는 Amadeus API를 통해 가져옵니다.

## ✨ 주요 기능

- 지역별 호텔 검색 및 추천
- 호텔 상세 정보 확인
- 비슷한 다른 호텔 추천
- (개발 예정) 호텔 예약 기능 연동

## 🔧 기술 스택

- **React**: 프론트엔드 라이브러리
- **React Router**: 클라이언트 사이드 라우팅
- **CSS Modules**: 컴포넌트별 스타일 관리
- **Axios**: API 통신
- **Node.js/Express (tripNet-backend)**: 백엔드 API 서버

## 🚀 설치 및 실행 방법

### 사전 요구사항

- Node.js (v14.0.0 이상)
- npm (v6.0.0 이상)
- tripNet-backend 서버 실행 필요

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/tripNet-front.git

# 디렉토리 이동
cd tripNet-front

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 서버 실행
npm start
```

접속: http://localhost:3000

### 빌드 (배포용)

```bash
# 프로덕션용 빌드
npm run build
```

※ 일반 로컬 개발자는 필요 없음

## 📂 디렉토리 구조

```
tripNet-front/
├── public/                 # 정적 파일
├── src/                    # 소스 코드
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── EventCard/      # 호텔 카드 컴포넌트
│   │   ├── Footer/         # 푸터
│   │   └── Header/         # 헤더
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── StayAbroad/     # 해외 숙소 페이지
│   │   └── HotelDetail/    # 호텔 상세 페이지
│   ├── App.js              # 메인 컴포넌트
│   └── index.js            # 엔트리 포인트
└── package.json            # 의존성 관리
```

## 🔗 API 연동

tripNet은 다음과 같은 API 엔드포인트를 사용합니다:

- **GET /api/accommodations**: 추천 숙소 목록 조회
- **GET /api/destinations**: 목적지 검색
- **GET /**: 서버 상태 확인

### API 호출 예시:

```javascript
// 추천 숙소 목록 가져오기
const fetchRecommendedHotels = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/accommodations");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("호텔 데이터 가져오기 실패:", error);
  }
};
```

## 🌿 브랜치 전략

tripNet 프로젝트는 다음 Git 브랜치 전략을 사용합니다:

### 기본 브랜치

- **main**: 최종 배포 가능한 안정된 코드

### 개인 작업 브랜치

- **bg**: 병규 (홈, 로그인 페이지)
- **hhs-domesticAccommodation**: 환성 (국내 숙소 페이지)
- **hyeeun-pages**: 혜은 (기획, 해외숙소 API 연동)
- **yoonbin-ticket**: 윤빈 (티켓/투어 페이지)

### ✅ 작업 규칙

- 직접 main에 커밋 금지
- 항상 개인 브랜치 → main으로 PR
- PR 작성할 때 설명 간단히 추가
- 커밋은 적당한 단위로 (너무 쪼개지 말기)

### 📚 기본 작업 흐름

```bash
# 1. main 최신 코드 가져오기
git checkout main
git pull origin main

# 2. 개인 작업 브랜치로 이동
git checkout hyeeun-pages

# 3. 작업 및 커밋
git add .
git commit -m "숙소 추천 UI 수정"

# 4. 개인 브랜치 Push
git push origin hyeeun-pages

# 5. GitHub에서 PR(Pull Request) 생성
```

### 🧩 주의사항

- PR 제목과 내용은 간결하고 명확하게
- 대규모 변경사항은 팀원과 상의 후 진행
- 필요시 새 브랜치 따서 작업 (ex. 디자인 수정 등)

## 👨‍💻 개발팀 소개

- **조윤빈**: 프론트엔드 개발
- **이병규**: 백엔드 개발
- **황환성**: 디자인 및 프론트엔드 개발
- **이혜은**: 프로젝트 관리 및 API 연동
