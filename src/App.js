import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from './02-components/Header';
import StayAbroad from './03-pages/StayAbroad';
import KoreanGuestHouse from './03-pages/KoreanGuestHouse';
import TicketPage from './03-pages/ticket/ticketPage';
import TicketDetail from './03-pages/ticket/ticketDetail';
import OrderPage from './03-pages/ticket/orderPage';

// App.js 상단에 추가 (import 아래쯤)
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
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<StayAbroad />} />
          <Route path="/stay-abroad" element={<StayAbroad />} />
          <Route path="/korean-guest-house" element={<KoreanGuestHouse />} />
          <Route path="/tour-ticket" element={<TicketPage />} />
          {/* amadeusTickets를 prop으로 넘긴 라우트 2곳 모두 수정 */}
          <Route path="/ticket/:id" element={<TicketDetail amadeusTickets={amadeusTickets} />} />

          <Route path="/order-page" element={<OrderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
