import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./02-components/Header";
import Footer from "./02-components/Footer";
import ForeignAccommodations from "./03-pages/ForeignAccommodations";
import KoreanGuestHouse from "./03-pages/KoreanGuestHouse";
import HotelDetail from "./03-pages/HotelDetail";
import DomesticAccommodations from "./03-pages/domesticAccommodation";
import SearchResults from "./03-pages/domesticAccommodation/jsx/searchResults";

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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
