import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import "./Form.css";

function FindPassword() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [stage, setStage] = useState(1); // 단계: 1=확인, 2=변경
  const navigate = useNavigate();

  // ✅ Enter 키 입력 시 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      stage === 1 ? handleCheckUser() : handleResetPassword();
    }
  };

  const handleCheckUser = async () => {
    const res = await fetch(
      `http://localhost:3002/users?name=${name}&email=${email}`
    );
    const users = await res.json();

    if (users.length === 1) {
      setUserId(users[0].id);
      setStage(2); // 비밀번호 재설정 단계로
    } else {
      alert("일치하는 계정을 찾을 수 없습니다.");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      alert("새 비밀번호를 입력하세요.");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    const res = await fetch(`http://localhost:3002/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: hashedPassword,
        passwordLength: newPassword.length,
      }),
    });

    if (res.ok) {
      alert("✅ 비밀번호가 성공적으로 변경되었습니다. 다시 로그인해 주세요.");
      navigate("/login");
    } else {
      alert("❌ 비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <section className="login-container">
      <h2 className="login-title">비밀번호 찾기</h2>
      <p className="login-desc">
        이름과 이메일을 입력하여 비밀번호를 재설정할 수 있어요.
      </p>

      {stage === 1 && (
        <>
          <input
            placeholder="이름"
            className="login-input"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            placeholder="이메일"
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn-login" onClick={handleCheckUser}>
            다음
          </button>
        </>
      )}

      {stage === 2 && (
        <>
          <input
            type="password"
            placeholder="새 비밀번호"
            className="login-input"
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn-login" onClick={handleResetPassword}>
            비밀번호 재설정
          </button>
        </>
      )}

      <div className="login-links">
        <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
          로그인으로 돌아가기
        </span>
      </div>
    </section>
  );
}

export default FindPassword;
