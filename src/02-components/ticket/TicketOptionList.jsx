import React from 'react';
import OptionCard from './OptionCard';

function TicketOptionList({ options, counts, onCountChange }) {
  return (
    <div className="td-options">
      {options.map((opt, i) => (
        <OptionCard
          key={i}
          option={opt}
          count={counts[i] || 0}
          onChange={cnt => onCountChange(i, cnt)}
          isSelected={counts[i] > 0}
        />
      ))}
    </div>
  );
}

export default TicketOptionList; 