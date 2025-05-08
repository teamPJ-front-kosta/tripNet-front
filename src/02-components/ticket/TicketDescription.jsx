import React from 'react';

function TicketDescription({ description }) {
  return (
    <ul>
      {description.map((desc, i) => <li key={i}>{desc}</li>)}
    </ul>
  );
}

export default TicketDescription; 