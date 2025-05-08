import React from 'react';

function TicketBadgeGroup({ badges }) {
  return (
    <div className="td-badges">
      {badges.map((b, i) => (
        <span className="td-badge" key={i}>{b}</span>
      ))}
    </div>
  );
}

export default TicketBadgeGroup; 