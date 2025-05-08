import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./02-components/Header";
import Footer from "./02-components/footer.jsx";

// 숙소/서비스 /로그인 관련
import KoreanGuestHouse from "./03-pages/KoreanGuestHouse";
import ForeignAccommodations from "./03-pages/ForeignAccommodations";
import DomesticAccommodation from "./03-pages/domesticAccommodation";
import DomesticSearchResults from "./03-pages/domesticAccommodation/domesticSearchResults";
import ForeignSearchResults from "./03-pages/ForeignAccommodations/ForeignSearchResults/index.jsx";
import HotelDetail from "./03-pages/HotelDetail";
import DomesticHotelDetail from "./03-pages/domesticAccommodation/domesticHotelDetail/index";
import HotelOptionDetail from "./03-pages/HotelDetail/HotelOptionDetail";
import DomesticHotelOptionDetail from "./03-pages/domesticAccommodation/domesticHotelDetail/HotelOptionDetail";

import Login from "./03-pages/Login";
import Signup from "./03-pages/Signup";
import FindId from "./03-pages/FindId";
import FindPassword from "./03-pages/Findpassword";
import AccountSettings from "./03-pages/AccountSettings";
import Main from "./03-pages/Main";

// 티켓 관련
import TicketPage from "./03-pages/ticket/ticketPage";
import TicketDetail from "./03-pages/ticket/ticketDetail";
import OrderPage from "./03-pages/ticket/orderPage";

// 티켓 전용 데이터
const amadeusTickets = [
  {
    id: "6378972",
    name: "Master Korean Food with a Chef [live online class]",
    location: { name: "서울" },
    rating: 4,
    reviewCount: 0,
    price: { amount: "15.0", currencyCode: "USD" },
    pictures: [
      "https://screen-api.vizeater.co/files/1428866/-/preview/-/progressive/yes/-/format/jpeg/image.jpg",
    ],
    badges: ["즉시확정", "최대 12개월 무이자 할부 가능"],
    validDate: "2025.06.30",
  },
];

function App() {
  const footerRef = useRef(null);

  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          {/* 홈페이지(메인) 라우트 */}
          <Route path="/" element={<Main />} />
          {/* 해외숙소는 별도 경로로만 접근 */}
          <Route
            path="/foreign-accommodations"
            element={<ForeignAccommodations />}
          />
          <Route path="/korean-guest-house" element={<KoreanGuestHouse />} />
          <Route
            path="/hotel/:cityCode/:hotelId"
            element={<HotelDetail footerRef={footerRef} />}
          />
          <Route
            path="/domestic/hotel/:cityCode/:hotelId"
            element={<DomesticHotelDetail footerRef={footerRef} />}
          />
          <Route
            path="/hotel/:cityCode/:hotelId/option/:roomId"
            element={<HotelOptionDetail />}
          />
          <Route
            path="/domestic/hotel/:cityCode/:hotelId/option/:roomId"
            element={<DomesticHotelOptionDetail />}
          />
          <Route path="/foreign" element={<ForeignAccommodations />} />
          <Route path="/korean" element={<KoreanGuestHouse />} />
          <Route path="/domestic" element={<DomesticAccommodation />} />
          <Route
            path="/domestic/search/results"
            element={<DomesticSearchResults />}
          />
          <Route
            path="/foreign/search/results"
            element={<ForeignSearchResults />}
          />

          {/* 티켓 관련 라우트 */}
          <Route path="/tour-ticket" element={<TicketPage />} />
          <Route
            path="/ticket/:id"
            element={<TicketDetail amadeusTickets={amadeusTickets} />}
          />
          <Route path="/order-page" element={<OrderPage />} />

          {/* 회원/계정 관련 라우트 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/find-id" element={<FindId />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/account" element={<AccountSettings />} />
        </Routes>
      </main>
      <Footer ref={footerRef} />
    </Router>
  );
}

export default App;
