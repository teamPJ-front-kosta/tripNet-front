import React from 'react';

function AgreementCheckBox({ agreements, setAgreements }) {
  const handleAll = () => {
    const next = !agreements.all;
    setAgreements({ all: next, info: next, provide: next, marketing: next });
  };
  const handleOne = (key) => {
    setAgreements(prev => {
      const next = { ...prev, [key]: !prev[key] };
      next.all = next.info && next.provide && next.marketing;
      return next;
    });
  };
  return (
    <div className="agreement-box">
      <label>
        <input type="checkbox" checked={agreements.all} onChange={handleAll} /> 전체 약관 동의
      </label>
      <label>
        <input type="checkbox" checked={agreements.info} onChange={() => handleOne('info')} /> 개인정보 수집 및 이용 동의 (필수)
      </label>
      <label>
        <input type="checkbox" checked={agreements.provide} onChange={() => handleOne('provide')} /> 개인정보 제공 동의 (필수)
      </label>
      <label>
        <input type="checkbox" checked={agreements.marketing} onChange={() => handleOne('marketing')} /> 마케팅 이용 동의 (선택)
      </label>
    </div>
  );
}

export default AgreementCheckBox; 