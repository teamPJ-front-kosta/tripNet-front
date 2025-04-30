import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("이메일과 비밀번호를 모두 입력하세요.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }
  
    const res = await fetch("http://localhost:3002/users");
    const users = await res.json();
  
    const matchedUser = users.find(
      (user) => user.email === form.email && user.password === form.password
    );
  
    if (matchedUser) {
      alert("✅ 로그인 성공!");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(matchedUser));
  
      // ✅ 로그인 성공 이벤트 발생
      window.dispatchEvent(new Event("login-success"));
  
      navigate("/");
    } else {
      alert("❌ 이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };
  

  return (
    <section className="login-container">
      <h2 className="login-title">로그인</h2>
      <p className="login-desc">
        ID, 비번 없이 1초 😊 무료가입으로 간편하게 로그인하세요.
        <br />
        마이리얼트립 회원은 다양한 혜택을 누릴 수 있습니다.
      </p>

      <a href="http://localhost:3001/auth/kakao" className="btn-kakao">
        카카오 1초 로그인 · 무료가입
      </a>

      <a
        href="http://localhost:3001/auth/naver"
        className="btn-naver"
        onClick={() => {
          // 네이버 세션 쿠키 강제 삭제 후 재인증 유도
          window.location.href = "https://nid.naver.com/nidlogin.logout";
          setTimeout(() => {
            window.location.href = "http://localhost:3001/auth/naver";
          }, 500);
        }}
      >
        네이버 1초 로그인 · 무료가입
      </a>

      <div className="login-divider"></div>

      <input
        name="email"
        placeholder="아이디"
        className="login-input"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        className="login-input"
        onChange={handleChange}
      />

      <button className="btn-login" onClick={handleLogin}>
        로그인
      </button>

      <div className="login-links">
        <span onClick={() => navigate("/find-id")} style={{ cursor: "pointer" }}>
          아이디 찾기
        </span>{" "}
        |{" "}
        <span onClick={() => navigate("/find-password")} style={{ cursor: "pointer" }}>
          비밀번호 찾기
        </span>{" "}
        |{" "}
        <span onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
          회원가입
        </span>
      </div>
    </section>
  );
}

export default Login;
