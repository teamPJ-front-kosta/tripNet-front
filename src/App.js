import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StayAbroad from "./pages/StayAbroad";
import KoreanGuestHouse from "./pages/KoreanGuestHouse";
import HotelDetail from "./pages/HotelDetail";
import DomesticAccommodation from "./pages/domesticAccommodation";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<StayAbroad />} />
            <Route path="/stay-abroad" element={<StayAbroad />} />
            <Route path="/korean-guest-house" element={<KoreanGuestHouse />} />
            <Route path="/hotel/:cityCode/:hotelId" element={<HotelDetail />} />
            <Route path="/domestic-accommodation" element={<DomesticAccommodation/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
