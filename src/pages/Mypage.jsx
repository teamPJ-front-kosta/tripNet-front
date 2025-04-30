import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSocialLogin = localStorage.getItem("accessToken"); // 카카오, 네이버
    const isLocalLogin = localStorage.getItem("isLoggedIn") === "true"; // 일반 로그인

    if (!isSocialLogin && !isLocalLogin) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, []);

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      <p>회원정보 및 예약현황을 확인하세요.</p>
    </div>
  );
}

export default MyPage;
