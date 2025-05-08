import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./02-components/Header";
import Footer from "./02-components/Footer";
import ForeignAccommodations from "./03-pages/ForeignAccommodations";
import DomesticSearchResults from "./03-pages/domesticAccommodation/domesticSearchResults";
import KoreanGuestHouse from "./03-pages/KoreanGuestHouse";
import HotelDetail from "./03-pages/HotelDetail";
import DomesticHotelDetail from "./03-pages/domesticAccommodation/domesticHotelDetail/index";
import HotelOptionDetail from "./03-pages/HotelDetail/HotelOptionDetail";
import DomesticHotelOptionDetail from "./03-pages/domesticAccommodation/domesticHotelDetail/HotelOptionDetail";
import DomesticAccommodation from "./03-pages/domesticAccommodation";
import ForeignSearchResults from "./03-pages/ForeignAccommodations/ForeignSearchResults/index.jsx";

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
          </Routes>
        </main>
        <Footer ref={footerRef} />
      </div>
    </Router>
  );
}

export default App;
