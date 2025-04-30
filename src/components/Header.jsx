import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 1. 세션 기반 소셜 로그인 상태 확인
    fetch("http://localhost:3001/profile", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Not logged in");
      })
      .then((data) => {
        // ✅ 서버에서 가져온 정보 localStorage에 저장
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data));
        setIsLoggedIn(true);
      })
      .catch(() => {
        // 2. 세션에 로그인 정보 없으면 localStorage 기반 확인 (자체 로그인)
        const isLogged = localStorage.getItem("isLoggedIn") === "true";
        const user = JSON.parse(localStorage.getItem("user"));
        if (isLogged && user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
  }, [location]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3001/logout", {
        method: "GET",
        credentials: "include",
      });

      const user = JSON.parse(localStorage.getItem("user")) || {};
      const provider = user.provider;

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);

      if (provider === "kakao") {
        const kakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
        const redirectUri = "http://localhost:5173";
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${kakaoRestApiKey}&logout_redirect_uri=${redirectUri}`;
        return;
      }

      if (provider === "naver") {
        const redirectUri = "http://localhost:5173";
        const logoutWindow = window.open(
          `https://nid.naver.com/nidlogin.logout?returl=${redirectUri}`,
          "_blank",
          "width=600,height=600"
        );
        const timer = setInterval(() => {
          if (logoutWindow.closed) {
            clearInterval(timer);
            navigate("/");
          }
        }, 500);
        return;
      }

      navigate("/");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-search">
          <div className="logo">MyRealTrip</div>
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="어디로 떠나시나요?"
            />
            <button className="search-button">
              <img
                src="https://dffoxz5he03rp.cloudfront.net/icons/ic_search_20x20_gray_500.svg"
                alt="검색"
              />
            </button>
          </div>
        </div>

        <div className="header-buttons">
          {isLoggedIn ? (
            <>
              <Link to="/mypage">
                <button className="mypage-button">마이페이지</button>
              </Link>
              <button className="logout-button" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="login-join">로그인 및 회원가입</button>
            </Link>
          )}
        </div>
      </div>

      <nav className="header-nav">
        <a href="#">해외 숙소</a>
        <a href="#">국내 숙소</a>
        <a href="#">투어·티켓</a>
        <a href="#">한인민박</a>
        <a href="#">가짜 항공권</a>
        <a href="#">가짜 할인특가</a>
        <a href="#">가짜 해외골프</a>
        <a href="#">가짜 여행용품</a>
        <a href="#">가짜 렌터카</a>
        <a href="#">가짜 유심</a>
      </nav>
    </header>
  );
}

export default Header;
