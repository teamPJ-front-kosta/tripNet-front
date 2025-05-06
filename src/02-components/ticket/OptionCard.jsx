import React from 'react';

function OptionCard({ option, count, onChange, isSelected }) {
  return (
    <div className={`td-option-card${isSelected ? ' selected' : ''}`}>
      <div>
        <div className="td-option-title">{option.name}</div>
        <div className="td-option-desc">{option.desc}</div>
      </div>
      <div className="td-option-price">
        <span className="td-option-original">{option.original.toLocaleString()}원</span>
        <span className="td-option-discount">{option.discount}%</span>
        <span className="td-option-final">{option.price.toLocaleString()}원</span>
      </div>
      <div className="td-option-qty">
        <button onClick={() => onChange(Math.max(count - 1, 0))}>-</button>
        <span>{count}</span>
        <button onClick={() => onChange(count + 1)}>+</button>
      </div>
    </div>
  );
}

export default OptionCard; 