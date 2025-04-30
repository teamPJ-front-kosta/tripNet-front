import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./02-components/Header";
import Footer from "./02-components/Footer";
import ForeignAccommodations from "./03-pages/ForeignAccommodations";
import KoreanGuestHouse from "./03-pages/KoreanGuestHouse";
import HotelDetail from "./03-pages/HotelDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ForeignAccommodations />} />
            <Route
              path="/foreign-accommodations"
              element={<ForeignAccommodations />}
            />
            <Route path="/korean-guest-house" element={<KoreanGuestHouse />} />
            <Route path="/hotel/:cityCode/:hotelId" element={<HotelDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
