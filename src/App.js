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

function App() {
  const footerRef = useRef(null);

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
            <Route
              path="/hotel/:cityCode/:hotelId"
              element={<HotelDetail footerRef={footerRef} />}
            />
            <Route
              path="/hotel/:cityCode/:hotelId/option/:roomId"
              element={<HotelOptionDetail />}
            />
            <Route path="/foreign" element={<ForeignAccommodations />} />
            <Route path="/foreign/search" element={<ForeignSearchResults />} />
            <Route path="/korean" element={<KoreanGuestHouse />} />
        </Routes>
        </main>
        <Footer ref={footerRef} />
      </div>
    </Router>
  );
}

export default App;
