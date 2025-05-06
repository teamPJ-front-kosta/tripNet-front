```
✅ 전체 디렉터리 구조 및 역할 설명

src/
├── 01-assets/               # 이미지, 폰트 등 정적 리소스
│   └── images/
│       └── ticket/          # 티켓 상세에서 사용하는 이미지들
│
├── 02-components/           # 재사용 가능한 UI 컴포넌트 모음
│   ├── payment/             # 결제 페이지에서 사용하는 세부 컴포넌트
│   │   ├── AgreementCheckBox.jsx   # 약관 동의 영역
│   │   ├── OrderDiscountBox.jsx    # 쿠폰/포인트 입력 영역
│   │   ├── OrderSummary.jsx        # 주문 상품 요약
│   │   └── PaymentMethodBox.jsx    # 결제 수단 선택
│   │
│   └── ticket/              # 티켓 관련 컴포넌트
│       ├── TicketCard.jsx           # 티켓 카드 UI
│       ├── TicketDescription.jsx    # 설명 블록
│       ├── TicketBadgeGroup.jsx     # 뱃지 묶음
│       ├── TicketOption.jsx         # 개별 옵션 선택 버튼
│       └── TicketOptionList.jsx     # 옵션 전체 묶음
│
├── 03-pages/                # 실제 라우팅 대상이 되는 페이지
│   └── ticket/              # 티켓/결제 관련 페이지
│       ├── ticketPage.jsx           # 티켓 목록 페이지
│       ├── ticketDetail.jsx         # 티켓 상세페이지
│       ├── orderPage.jsx            # 결제페이지
│       └── ...                      # 기타 테스트/스타일 파일
│
├── 04-data/                 # 임시 더미 데이터 저장용
│   └── ticketDummy.js       # 티켓 상세용 mock 데이터
│
├── 05-utils/                # 유틸 함수, API, 커스텀 훅 등
│   ├── api/
│   │   └── ticketAPI.js     # getTicketDetail 등 axios 함수 분리
│   └── hooks/
│       └── ...              # 추후 커스텀 훅 추가 예정
│
├── App.js
├── index.js
└── ...

📦 각 주요 컴포넌트 설명 정리
📍 결제 페이지용 컴포넌트 (02-components/payment/)
파일명	                 역할
OrderSummary.jsx	    결제페이지 상단의 상품명, 옵션, 가격 요약
OrderDiscountBox.jsx	포인트 입력 / 쿠폰 코드 입력 영역
AgreementCheckBox.jsx	개인정보, 마케팅 동의 체크박스 영역
PaymentMethodBox.jsx	결제수단 선택 (계좌이체, 카드 등)

OrderPage.jsx에서 이 네 가지를 조립하고 상태는 useState로 상위에서 관리함.

📍 티켓 상세 컴포넌트 (02-components/ticket/)
파일명	                 역할
TicketCard.jsx	        티켓 목록의 개별 카드 UI
TicketOption.jsx	    옵션 1개 선택 버튼 (AFTER4 등)
TicketOptionList.jsx	전체 옵션 리스트 묶음
TicketDescription.jsx	장점, 설명 영역 정리
TicketBadgeGroup.jsx	뱃지 묶음 (e-ticket, 즉시확정 등)

📍 API & 데이터
위치	         설명
ticketAPI.js	getTicketDetail(id) 비동기 호출 (현재 setTimeout, 추후 axios 연결 예정)
ticketDummy.js	티켓 상세용 mock data 저장

폴더 구조는 01~05로 정리했고,
티켓 상세랑 결제 페이지는 컴포넌트를 최대한 분리해서 유지보수 편하게 구성했습니다.
API는 utils/api로 분리했고, 추후 커스텀 훅이나 공통 상태도 여기에 붙일 예정입니다.
현재는 더미 데이터 + useEffect 비동기 구조지만, 실제 API 연동은 ticketAPI.js만 수정하면 됩니다.
```