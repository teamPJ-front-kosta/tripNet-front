import React from 'react';

function SelectedSummary({ options, counts, onPay }) {
  const selected = options
    .map((opt, i) => ({ ...opt, count: counts[i] || 0 }))
    .filter(opt => opt.count > 0);
  const total = selected.reduce((sum, opt) => sum + opt.price * opt.count, 0);

  if (selected.length === 0) return null;

  return (
    <div className="selected-summary">
      <div className="selected-summary-list">
        {selected.map(opt => (
          <div key={opt.name} className="selected-summary-item">
            <span>{opt.name}</span>
            <span>{opt.count}개</span>
            <span>{(opt.price * opt.count).toLocaleString()}원</span>
          </div>
        ))}
      </div>
      <div className="selected-summary-total">
        총 여행 금액 <span>{total.toLocaleString()}원</span>
      </div>
      <button className="pay-btn" onClick={onPay}>결제하기</button>
    </div>
  );
}

export default SelectedSummary; 