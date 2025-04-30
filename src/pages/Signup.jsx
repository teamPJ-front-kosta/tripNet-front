import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    // ✅ 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("유효한 이메일 주소를 입력하세요.");
      return;
    }

    // ✅ 이메일 중복 정확 비교
    const checkRes = await fetch("http://localhost:3002/users");
    const allUsers = await checkRes.json();
    const existingUser = allUsers.find(user => user.email === form.email);

    if (existingUser) {
      alert("이미 가입된 이메일입니다.");
      return;
    }

    // ✅ 회원가입 요청
    const res = await fetch("http://localhost:3002/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      alert("🎉 회원가입 성공!");
      setForm({ username: "", email: "", password: "" }); // 입력값 초기화
      setTimeout(() => navigate("/"), 100); // 홈으로 이동
    } else {
      alert("회원가입 실패!");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input
        name="username"
        placeholder="이름"
        value={form.username}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="이메일"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
      />
      <button onClick={handleSignup}>가입하기</button>
    </div>
  );
}

export default Signup;
