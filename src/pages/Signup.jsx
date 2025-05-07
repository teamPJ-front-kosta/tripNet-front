import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import "./Form.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secretQuestion: "아버지의 이름은?",
    secretAnswer: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Enter 키 입력 시 회원가입 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  const handleSignup = async () => {
    const { name, email, password, secretQuestion, secretAnswer } = form;

    if (!name || !email || !password || !secretAnswer) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3002/users?email=${email}`);
      const existingUsers = await res.json();

      if (existingUsers.length > 0) {
        alert("이미 가입된 이메일입니다.");
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // 회원가입 시 음성 재생
      const audio = new Audio("/audio/gojo.mp3");  // 음성 파일 경로
      audio.play();

      const createRes = await fetch("http://localhost:3002/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password: hashedPassword,
          passwordLength: password.length,
          secretQuestion,
          secretAnswer,
          receiveEmail: false,    
          receiveSMS: false,       
          shareLocation: false    
        }),
      });

      if (createRes.ok) {
        alert("✅ 회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        alert("❌ 회원가입 실패. 다시 시도해 주세요.");
      }
    } catch (err) {
      console.error("회원가입 오류:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <section className="login-container">
      <h2 className="login-title">회원가입</h2>
      <p className="login-desc">이름, 이메일, 비밀번호, 비밀질문을 입력하세요.</p>

      <input
        name="name"
        placeholder="이름"
        className="login-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <input
        name="email"
        placeholder="이메일"
        className="login-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        className="login-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <select
        name="secretQuestion"
        className="login-input"
        onChange={handleChange}
        value={form.secretQuestion}
        onKeyDown={handleKeyDown}
      >
        <option>아버지의 이름은?</option>
        <option>졸업한 초등학교 이름은?</option>
        <option>가장 좋아하는 음식은?</option>
        <option>내가 가장 아끼는 물건은?</option>
        <option>tripNet 개발자 이름은?</option>
      </select>
      <input
        name="secretAnswer"
        placeholder="비밀 질문에 대한 답변"
        className="login-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button className="btn-login" onClick={handleSignup}>
        회원가입
      </button>

      <div className="login-links">
        <span
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer" }}
        >
          로그인으로 돌아가기
        </span>
      </div>
    </section>
  );
}

export default Signup;
