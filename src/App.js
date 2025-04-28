import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import StayAbroad from './pages/StayAbroad';
import KoreanGuestHouse from './pages/KoreanGuestHouse';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<StayAbroad />} />
          <Route path="/stay-abroad" element={<StayAbroad />} />
          <Route path="/korean-guest-house" element={<KoreanGuestHouse />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
