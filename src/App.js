import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./02-components/Header";
import Footer from "./02-components/Footer";
import ForeignAccommodations from "./03-pages/ForeignAccommodations";
import ForeignSearchResults from "./03-pages/ForeignSearchResults";
import KoreanGuestHouse from "./03-pages/KoreanGuestHouse";
import HotelDetail from "./03-pages/HotelDetail";
import HotelOptionDetail from "./03-pages/HotelDetail/HotelOptionDetail";
import StayAbroad from './03-pages/StayAbroad';
import TicketPage from './03-pages/ticket/ticketPage';
import TicketDetail from './03-pages/ticket/ticketDetail';
import OrderPage from './03-pages/ticket/orderPage';

// 티켓 데이터
const amadeusTickets = [
  {
    id: "6378972",
    name: "Master Korean Food with a Chef [live online class]",
    location: { name: "서울" },
    rating: 4,
    reviewCount: 0,
    price: { amount: "15.0", currencyCode: "USD" },
    pictures: ["https://screen-api.vizeater.co/files/1428866/-/preview/-/progressive/yes/-/format/jpeg/image.jpg"],
    badges: ["즉시확정", "최대 12개월 무이자 할부 가능"],
    validDate: "2025.06.30",
  },
];

function App() {
  const footerRef = useRef(null);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ForeignAccommodations />} />
            <Route path="/foreign-accommodations" element={<ForeignAccommodations />} />
            <Route path="/korean-guest-house" element={<KoreanGuestHouse />} />
            <Route path="/hotel/:cityCode/:hotelId" element={<HotelDetail footerRef={footerRef} />} />
            <Route path="/hotel/:cityCode/:hotelId/option/:roomId" element={<HotelOptionDetail />} />
            <Route path="/foreign" element={<ForeignAccommodations />} />
            <Route path="/foreign/search" element={<ForeignSearchResults />} />
            <Route path="/korean" element={<KoreanGuestHouse />} />
            <Route path="/stay-abroad" element={<StayAbroad />} />
            <Route path="/tour-ticket" element={<TicketPage />} />
            <Route path="/ticket/:id" element={<TicketDetail amadeusTickets={amadeusTickets} />} />
            <Route path="/order-page" element={<OrderPage />} />
          </Routes>
        </main>
        <Footer ref={footerRef} />
      </div>
    </Router>
  );
}

export default App;
