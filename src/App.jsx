import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import MainBanner from "./components/MainBanner";
import Login from "./pages/Login";
import "./App.css";
import Mypage from "./pages/Mypage";
import Signup from "./pages/Signup";
import FindId from "./pages/FindId";
import FindPassword from "./pages/Findpassword"

// 내부 레이아웃 (Header 유지, 페이지별로 Main 구성)
function AppLayout() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <>
      <Header />
      {isMainPage && <MainBanner />}

      <main>
        <Routes>
          <Route path="/" element={<div>메인페이지입니다</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/find-id" element={<FindId />} />
          <Route path="/find-password" element={<FindPassword />} />
        </Routes>
      </main>
    </>
  );
}


// 전체 라우팅 감싸기
function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

