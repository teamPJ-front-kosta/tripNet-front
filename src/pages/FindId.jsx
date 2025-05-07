import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

function FindId() {
  const [name, setName] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("아버지의 이름은?");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [foundEmail, setFoundEmail] = useState(null);
  const navigate = useNavigate();

  // ✅ Enter 키 입력 시 실행될 함수
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFindId();
    }
  };

  const handleFindId = async () => {
    if (!name || !secretAnswer) {
      alert("모든 정보를 입력하세요.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3002/users");
      const users = await res.json();

      const matched = users.find(
        (user) =>
          user.name === name &&
          user.secretQuestion === secretQuestion &&
          user.secretAnswer === secretAnswer
      );

      if (matched) {
        setFoundEmail(matched.email);
      } else {
        alert("❌ 일치하는 계정을 찾을 수 없습니다.");
        setFoundEmail(null);
      }
    } catch (err) {
      console.error("아이디 찾기 오류:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <section className="login-container">
      <h2 className="login-title">아이디(이메일) 찾기</h2>
      <p className="login-desc">가입 시 입력한 이름과 비밀 질문/답변을 입력하세요.</p>

      <input
        placeholder="이름"
        className="login-input"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <select
        className="login-input"
        value={secretQuestion}
        onChange={(e) => setSecretQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
      >
        <option>아버지의 이름은?</option>
        <option>초등학교 이름은?</option>
        <option>가장 좋아하는 음식은?</option>
        <option>내가 가장 아끼는 물건은?</option>
      </select>

      <input
        placeholder="비밀 질문에 대한 답변"
        className="login-input"
        onChange={(e) => setSecretAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button className="btn-login" onClick={handleFindId}>아이디 찾기</button>

      {foundEmail && (
        <p style={{ marginTop: "20px" }}>
          ✅ 등록된 이메일은 <strong>{foundEmail}</strong> 입니다.
        </p>
      )}

      <div className="login-links">
        <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
          로그인으로 돌아가기
        </span>
      </div>
    </section>
  );
}

export default FindId;
