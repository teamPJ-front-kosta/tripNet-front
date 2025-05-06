import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TicketDescription from '../../02-components/ticket/TicketDescription';
import TicketBadgeGroup from '../../02-components/ticket/TicketBadgeGroup';
import TicketOptionList from '../../02-components/ticket/TicketOptionList';
import SelectedSummary from '../../02-components/ticket/SelectedSummary';
import { getTicketDetail } from '../../05-utils/api/ticketAPI';
import './ticketDetail.css';

function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [counts, setCounts] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getTicketDetail(id)
      .then(data => {
        setTicket(data);
        setCounts(Array(data.options.length).fill(0));
        setLoading(false);
      })
      .catch(err => {
        setError('티켓 정보를 불러오지 못했습니다.');
        setLoading(false);
      });
  }, [id]);

  const handleCountChange = (idx, value) => {
    setCounts(prev => prev.map((c, i) => (i === idx ? Math.max(value, 0) : c)));
  };

  const handlePay = () => {
    const selected = ticket.options
      .map((opt, i) => ({ ...opt, count: counts[i] || 0 }))
      .filter(opt => opt.count > 0);
    navigate('/order-page', { state: { ticketId: id, selectedOptions: selected } });
  };

  if (loading) return <div className="ticket-detail">로딩중...</div>;
  if (error) return <div className="ticket-detail error">{error}</div>;
  if (!ticket) return null;

  return (
    <div className="ticket-detail">
      <div className="td-header">
        <div className="td-title-wrap">
          <h1 className="td-title">{ticket.title}</h1>
          <div className="td-rating">
            <span className="td-stars">★ {ticket.rating}</span>
            <span className="td-review">({ticket.reviewCount})</span>
          </div>
        </div>
        <div className="td-price-box">
          <span className="td-original">{ticket.originalPrice.toLocaleString()}원</span>
          <span className="td-discount">{ticket.discount}%</span>
          <span className="td-price">{ticket.price.toLocaleString()}원</span>
          <button className="td-book-btn">예약하기</button>
        </div>
      </div>
      <TicketBadgeGroup badges={ticket.badges} />
      <div className="td-section">
        <h2>마이리얼트립에서 롯데월드 이용권 구매하면 무엇이 좋은가요?</h2>
        <TicketDescription description={ticket.description} />
      </div>
      <div className="td-section">
        <h3>유의사항</h3>
        <ul>
          {ticket.notice.map((n, i) => <li key={i}>{n}</li>)}
        </ul>
      </div>
      <div className="td-section">
        <h2>예약하기</h2>
        <TicketOptionList options={ticket.options} counts={counts} onCountChange={handleCountChange} />
        <SelectedSummary options={ticket.options} counts={counts} onPay={handlePay} />
      </div>
      <div className="td-section">
        <img
          className="td-info-img"
          src="https://d2ur7st6jjikze.cloudfront.net/offer_photos/70816/1100000/offer_70816_1100000_1713499632.jpg"
          alt="롯데월드 안내"
        />
      </div>
      <div className="td-section">
        <div className="td-review-summary">
          <span className="td-review-score">4.8</span>
          <span className="td-review-stars">★★★★★</span>
          <span className="td-review-count">후기 {ticket.reviewCount}개</span>
        </div>
        <div className="td-review-item">
          <div className="td-reviewer">김** <span>2025-05-03</span></div>
          <div className="td-review-content">
            인기많은건 줄이 너무 길어서 타지는 못했지만<br />
            밖에서 줄서서 기다리는 놀이기구는 더운날엔 좀 힘들어서<br />
            선크림 잘 바르고 선글라스 챙겨가면 더 좋을것 같아요
          </div>
        </div>
        <button className="td-review-more">후기 전체 보기</button>
      </div>
    </div>
  );
}

export default TicketDetail; 