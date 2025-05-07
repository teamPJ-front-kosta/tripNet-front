import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountSettings.css";
import bcrypt from "bcryptjs";

function AccountSettings() {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState("");

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [editedPhone, setEditedPhone] = useState("010");

  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [receiveEmail, setReceiveEmail] = useState(false);
  const [receiveSMS, setReceiveSMS] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (!saved) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:3002/users/${saved.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setEditedName(data.name || "");
        setEditedEmail(data.email || "");
        setEditedPhone(data.phone || "010");
        setReceiveEmail(data.receiveEmail || false);
        setReceiveSMS(data.receiveSMS || false);
        setShareLocation(data.shareLocation || false);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  useEffect(() => {
    if (isEditingEmail && emailInputRef.current) {
      emailInputRef.current.focus();
      emailInputRef.current.select();
    }
  }, [isEditingEmail]);

  useEffect(() => {
    if (isEditingPhone && phoneInputRef.current) {
      phoneInputRef.current.focus();
      phoneInputRef.current.select();
    }
  }, [isEditingPhone]);

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.startsWith("010")) {
      if (input.length > 11) input = input.slice(0, 11);
      if (input.length >= 8) {
        input = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7)}`;
      } else if (input.length >= 4) {
        input = `${input.slice(0, 3)}-${input.slice(3)}`;
      }
      setEditedPhone(input);
    } else {
      setEditedPhone("010");
    }
  };

  const handleSaveInfo = async () => {
    if (!user) return;

    if (isEditingEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editedEmail)) {
        alert("❌ 올바른 이메일 형식을 입력하세요.");
        return;
      }
    }

    if (isEditingPhone) {
      const phoneRegex = /^010-\d{4}-\d{4}$/;
      if (!phoneRegex.test(editedPhone)) {
        alert("❌ 올바른 휴대폰 번호 형식이 아닙니다.");
        return;
      }
    }

    if (isEditingPassword) {
      if (!currentPassword || !newPassword) {
        setPasswordError("현재 비밀번호와 새 비밀번호를 모두 입력하세요.");
        return;
      }
      if (!bcrypt.compareSync(currentPassword, user.password)) {
        setPasswordError("❌ 현재 비밀번호가 일치하지 않습니다.");
        return;
      }

      const hashed = bcrypt.hashSync(newPassword, 10);
      await fetch(`http://localhost:3002/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: hashed,
          passwordLength: newPassword.length,
        }),
      });
    }

    const updated = {
      ...user,
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
      receiveEmail,
      receiveSMS,
      shareLocation,
    };

    const res = await fetch(`http://localhost:3002/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsEditingPhone(false);
      setIsEditingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setPasswordError("");
      alert("✅ 정보가 저장되었습니다.");
    } else {
      alert("❌ 정보 저장 실패");
    }
  };

  const handleDeleteAccount = async () => {
    if (!bcrypt.compareSync(deletePassword, user.password)) {
      setDeleteError("❌ 비밀번호가 일치하지 않습니다.");
      return;
    }

    const res = await fetch(`http://localhost:3002/users/${user.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      localStorage.removeItem("user");
      alert("✅ 계정이 삭제되었습니다.");
      navigate("/login");
    } else {
      alert("❌ 계정 삭제 실패");
    }
  };

  return (
    <section className="account-container">
      <div className="profile-header">
        <div className="profile-image" />
        <h3>{user?.name || "사용자 이름"}</h3>
        <p>{user?.email || "user@example.com"}</p>
        <div className="stats">
          <div>0원<br /><span>KRW</span></div>
          <div>0장<br /><span>내 쿠폰</span></div>
        </div>
      </div>

      <div className="account-section">
        {/* 이름 */}
        <div className="account-row left-align">
          <span>이름</span>
          <div>
            {isEditingName ? (
              <input ref={nameInputRef} className="edit-input" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
            ) : (
              <span>{user?.name || "-"}</span>
            )}
            <button onClick={() => setIsEditingName(true)}>변경</button>
          </div>
        </div>

        {/* 휴대폰 번호 */}
        <div className="account-row left-align">
          <span>휴대폰 번호</span>
          <div>
            {isEditingPhone ? (
              <input ref={phoneInputRef} className="edit-input" value={editedPhone} onChange={handlePhoneChange} />
            ) : (
              <span>{user?.phone || "-"}</span>
            )}
            <button onClick={() => setIsEditingPhone(true)}>변경</button>
          </div>
        </div>

        {/* 이메일 */}
        <div className="account-row left-align">
          <span>이메일</span>
          <div>
            {isEditingEmail ? (
              <input ref={emailInputRef} className="edit-input" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
            ) : (
              <span>{user?.email || "-"}</span>
            )}
            <button onClick={() => setIsEditingEmail(true)}>변경</button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="account-row left-align">
          <span>비밀번호</span>
          <div>
            <span>{"●".repeat(user?.passwordLength || 6)}</span>
            <button onClick={() => setIsEditingPassword(true)}>변경</button>
          </div>
        </div>

        {/* 비밀번호 변경 필드 */}
        {isEditingPassword && (
          <div className="password-edit-section">
            <input type="password" placeholder="현재 비밀번호" className="login-input" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder="새 비밀번호" className="login-input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
        )}

        {/* 수신 설정 */}
        <div className="account-row toggle-row">
          <span>이메일 수신</span>
          <input type="checkbox" checked={receiveEmail} onChange={(e) => setReceiveEmail(e.target.checked)} />
        </div>
        <div className="account-row toggle-row">
          <span>SMS 수신</span>
          <input type="checkbox" checked={receiveSMS} onChange={(e) => setReceiveSMS(e.target.checked)} />
        </div>
        <div className="account-row toggle-row">
          <span>위치 정보 수집</span>
          <input type="checkbox" checked={shareLocation} onChange={(e) => setShareLocation(e.target.checked)} />
        </div>
      </div>

      <button className="btn-login" onClick={handleSaveInfo} style={{ marginTop: "20px" }}>
        계정 정보 저장
      </button>

      <div className="delete-account" onClick={() => setShowDeleteConfirm(true)}>
        계정 삭제하기
      </div>

      {/* 삭제 모달 */}
      {showDeleteConfirm && (
        <>
          <div className="modal-overlay" />
          <div className="delete-confirm-box">
            <p>정말로 계정을 삭제하시겠습니까?</p>
            <input
              type="password"
              placeholder="현재 비밀번호"
              className="login-input"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
            {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
            <div className="delete-confirm-actions">
              <button className="btn-login" onClick={handleDeleteAccount}>네</button>
              <button className="btn-login" onClick={() => setShowDeleteConfirm(false)}>아니오</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default AccountSettings;
