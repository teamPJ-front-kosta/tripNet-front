<<<<<<< HEAD
import React, { useRef } from "react";
=======
import React from "react";
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./02-components/Header";
import Footer from "./02-components/Footer";
import ForeignAccommodations from "./03-pages/ForeignAccommodations";
<<<<<<< HEAD
import DomesticSearchResults from "./03-pages/domesticAccommodation/domesticSearchResults";
import KoreanGuestHouse from "./03-pages/KoreanGuestHouse";
import HotelDetail from "./03-pages/HotelDetail";
import DomesticHotelDetail from "./03-pages/domesticAccommodation/domesticHotelDetail/index";
import HotelOptionDetail from "./03-pages/HotelDetail/HotelOptionDetail";
import DomesticHotelOptionDetail from "./03-pages/domesticAccommodation/domesticHotelDetail/HotelOptionDetail";
import DomesticAccommodation from "./03-pages/domesticAccommodation";
=======
import KoreanGuestHouse from "./03-pages/KoreanGuestHouse";
import HotelDetail from "./03-pages/HotelDetail";
import DomesticAccommodations from "./03-pages/domesticAccommodation";
import SearchResults from "./03-pages/domesticAccommodation/jsx/searchResults";
import HotelDetails from "./03-pages/domesticAccommodation/jsx/hotelDetails";
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1

function App() {
  const footerRef = useRef(null);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
<<<<<<< HEAD
        <Routes>
=======
          <Routes>
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
            <Route path="/" element={<ForeignAccommodations />} />
            <Route
              path="/foreign-accommodations"
              element={<ForeignAccommodations />}
            />
<<<<<<< HEAD
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
            <Route path="/domestic/search/results" element={<DomesticSearchResults />} />
        </Routes>
        </main>
        <Footer ref={footerRef} />
=======
            <Route
              path="/domestic-accommodations"
              element={<DomesticAccommodations />}
            />
            <Route path="/korean-guest-house" element={<KoreanGuestHouse />} />
            <Route path="/hotel/:cityCode/:hotelId" element={<HotelDetail />} />
            <Route
              path="/domestic/search/results"
              element={<SearchResults />}
            />
            <Route
              path="/domestic/hotel-details/:hotelId"
              element={<HotelDetails />}
            />
          </Routes>
        </main>
        <Footer />
>>>>>>> 802e1845c523473f5d3702e20a056428b34381d1
      </div>
    </Router>
  );
}

export default App;
