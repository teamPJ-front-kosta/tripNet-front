import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import FindId from "./pages/FindId";
import FindPassword from "./pages/Findpassword";
import AccountSettings from "./pages/AccountSettings";
import Main from "./pages/Main";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/account" element={<AccountSettings />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
