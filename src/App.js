import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from './02-components/Header';
import StayAbroad from './03-pages/StayAbroad';
import KoreanGuestHouse from './03-pages/KoreanGuestHouse';
import TicketPage from './03-pages/ticket/ticketPage';
import TicketDetail from './03-pages/ticket/ticketDetail';

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
          <Route path="/tour-ticket/:id" element={<TicketDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
