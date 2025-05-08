import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TicketTopSummary({ amadeusTickets }) {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = amadeusTickets?.find(t => String(t.id) === String(id));
    if (found) {
      setTicket(found);
    } else {
      // 외부 JSON 서버에서 조회
      fetch(`http://localhost:3001/dummyTickets/${id}`)
        .then(res => (res.ok ? res.json() : null))
        .then(data => setTicket(data))
        .catch(() => setTicket(null));
    }
    setLoading(false);
  }, [id, amadeusTickets]);

  if (loading) return <div>로딩 중...</div>;
  if (!ticket) return <div>해당 티켓 정보를 찾을 수 없습니다.</div>;

  return (
    <div
      className="td-top-summary"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: '24px 0',
        borderBottom: '1px solid #eee'
      }}
    >
      {ticket.pictures?.[0] && (
        <img
          src={ticket.pictures[0]}
          alt={ticket.name}
          style={{
            width: '100%',
            maxHeight: 240,
            objectFit: 'cover',
            borderRadius: 10
          }}
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ color: '#888', fontSize: 14 }}>
          {ticket.location?.name}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#222' }}>
          {ticket.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontSize: 15, color: '#2b96ed', fontWeight: 500 }}>
            ★ {ticket.rating}
            <span style={{ color: '#999', fontWeight: 400, marginLeft: 4 }}>
              ({ticket.reviewCount})
            </span>
          </span>

          {ticket.badges?.map((badge, i) => (
            <span key={i} style={{
              backgroundColor: '#f1f3f5',
              color: '#2b96ed',
              fontSize: 13,
              padding: '2px 10px',
              borderRadius: 12,
              fontWeight: 500
            }}>
              {badge}
            </span>
          ))}

          {ticket.validDate && (
            <span style={{ fontSize: 13, color: '#888' }}>
              유효기간(~{ticket.validDate})
            </span>
          )}
        </div>
        <div style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>
          {ticket.price?.amount}
          {ticket.price?.currencyCode && (
            <span style={{ fontSize: 15, color: '#888', marginLeft: 4 }}>
              {ticket.price.currencyCode}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketTopSummary;
