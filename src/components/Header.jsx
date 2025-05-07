import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLogin = () => {
      const isLogged = localStorage.getItem("isLoggedIn") === "true";
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setIsLoggedIn(isLogged);
      setUser(storedUser);
      setShowDropdown(false);
    };

    checkLogin(); // 초기 실행
    window.addEventListener("login-success", checkLogin);

    return () => {
      window.removeEventListener("login-success", checkLogin);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-search">
          <Link to="/" className="logo">
            <img
              src="/assets/logo.png"
              alt="TripNet 로고"
              style={{ height: "100px" }}
            />
          </Link>

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
            <div className="profile-menu-wrapper">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                alt="프로필"
                className="profile-icon"
                onClick={toggleDropdown}
                style={{ width: "36px", height: "36px", cursor: "pointer" }}
              />
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-user">
                    <strong>{user?.name || "사용자"}</strong>
                  </div>
                  <Link to="/mypage">나의 예약</Link>
                  <Link to="/account">계정 관리</Link>
                  <button onClick={handleLogout}>로그아웃</button>
                </div>
              )}
            </div>
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
        <a href="#">항공권</a>
        <a href="#">할인특가</a>
        <a href="#">해외골프</a>
        <a href="#">여행용품</a>
        <a href="#">렌터카</a>
        <a href="#">유심</a>
      </nav>
    </header>
  );
}

export default Header;
