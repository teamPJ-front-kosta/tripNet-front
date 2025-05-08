import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import "./Form.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ 엔터 키 눌렀을 때 로그인 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("이메일과 비밀번호를 모두 입력하세요.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3002/users?email=${form.email}`);
      const users = await res.json();

      const user = users[0];

      if (user && bcrypt.compareSync(form.password, user.password)) {
        alert("✅ 로그인 성공!");

        
        const audio = new Audio("/audio/sukuna.mp3");  
        audio.play();

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("login-success"));
        navigate("/");
      } else {
        alert("❌ 이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error("로그인 오류:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <section className="login-container">
      <h2 className="login-title">로그인</h2>
      <p className="login-desc">
        ID, 비번 없이 1초 😊 무료가입으로 간편하게 로그인하세요.
      </p>

      <a href="#" className="btn-kakao" onClick={(e) => {
        e.preventDefault();
        alert("카카오 로그인은 준비 중입니다.");
      }}>
        카카오 1초 로그인 · 무료가입
      </a>

      <a href="#" className="btn-naver" onClick={(e) => {
        e.preventDefault();
        alert("네이버 로그인은 준비 중입니다.");
      }}>
        네이버 1초 로그인 · 무료가입
      </a>

      <div className="login-divider"></div>

      <input
        name="email"
        placeholder="아이디"
        className="login-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown} // ✅ 추가
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        className="login-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown} // ✅ 추가
      />

      <button className="btn-login" onClick={handleLogin}>로그인</button>

      <div className="login-links">
        <span onClick={() => navigate("/find-id")} style={{ cursor: "pointer" }}>
          아이디 찾기
        </span> |{" "}
        <span onClick={() => navigate("/find-password")} style={{ cursor: "pointer" }}>
          비밀번호 찾기
        </span> |{" "}
        <span onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
          회원가입
        </span>
      </div>
    </section>
  );
}

export default Login;
