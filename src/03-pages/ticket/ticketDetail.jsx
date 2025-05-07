import React, { useState, useEffect } from 'react';
import './ticketDetail.css';
import TicketTopSummary from './ticketTopSummary';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// fallback mock 데이터
const fallbackTicket = {
  id: 'dummy',
  location: { name: '대한민국 > 경상도' },
  name: '[★당일가능] 롯데워터파크 미들시즌 종일권(~5/23)',
  rating: 5.0,
  reviewCount: 1,
  badges: ['최저가 보장제', '즉시확정', '최대 12개월 무이자 할부 가능'],
  price: { amount: 22000, currencyCode: '원' },
  validDate: '2025.05.23',
  options: [
    { name: '대인 종일권', desc: '만 13세 이상', original: 46000, price: 27000 },
    { name: '소인 종일권', desc: '36개월 이상~만 12세', original: 37000, price: 22000 },
  ],
  notice: [
    '국내 최대 규모의 실내 파도풀과 아일랜드 스파!',
    '미사용 티켓은 100% 환불 가능해요.',
    '카드사 및 카카오페이 최대 1.7만원 결제 할인 혜택 받기!',
  ],
  description: [
    '10만명 이상이 구매한 인기 상품입니다.',
    '무료취소 가능하며, 유효기간 내 자유롭게 사용하세요.',
  ],
  refund: [
    '유효기간 내 미사용티켓 100% 환불가능',
    '유효기간 후 미사용티켓 100% 환불불가',
    '사용한 티켓은 환불 불가능합니다.',
  ],
  info: {
    location: '대한민국 경상남도 김해시 장유로 555',
    useTime: '10:00~18:00',
    useMethod: ['상단 URL 클릭', 'QR코드 확인', '모바일티켓으로 입장'],
    extra: ['현장 상황 따라 변동 가능', '36개월 미만은 무료입장'],
    age: ['대인 : 만 13세 이상', '소인 : 36개월 이상 ~ 만 12세 이하'],
  },
  reviews: [
    {
      user: '힘**',
      date: '2025-05-05',
      score: 5,
      content: '야외는 안 열렸지만 저렴하게 잘 놀았어요.',
      photo: 'https://via.placeholder.com/120x80?text=Review',
    },
  ],
  related: [
    { title: '스파 더 스페이스', price: 9000, img: 'https://via.placeholder.com/180x120?text=Related' },
    { title: '블루원아쿠아폴리스', price: 18900, img: 'https://via.placeholder.com/180x120?text=Related' },
  ],
};

function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    axios.get(`/api/tickets/${id}`)
      .then(res => {
        setTicket(res.data);
        setCounts(Array(res.data.options?.length || 0).fill(0));
      })
      .catch(err => {
        console.error("티켓 로딩 실패:", err.message);
        setTicket(fallbackTicket);
        setCounts(Array(fallbackTicket.options.length).fill(0));
      });
  }, [id]);

  const handleScrollToReserve = () => {
    const el = document.getElementById('reserve');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCount = (idx, newCount) => {
    setCounts(prev => prev.map((c, i) => (i === idx ? Math.max(0, newCount) : c)));
  };

  const handlePay = () => {
    navigate("/order-page");
  };

  if (!ticket) return <div>로딩 중...</div>;

  return (
    <div className="td-layout">
      <div className="td-main">
        <TicketTopSummary amadeusTickets={[ticket]} />
        <main className="td-main">
          <div className="td-benefit-row">
            <div className="td-benefit-list">
              {ticket.badges?.map((b, i) => (
                <div key={i} className="td-benefit-item"><b>{b}</b></div>
              ))}
            </div>
            <div className="td-benefit-icons">
              <span>e-ticket</span>
              <span>유효기간(~{ticket.validDate}) 내 사용</span>
            </div>
          </div>

          <div className="td-info-box">
            <div className="td-info-title">{ticket.notice?.[0]}</div>
            <div className="td-info-desc">{ticket.notice?.slice(1).join('\n')}</div>
          </div>

          <section className="td-section" id="reserve">
            <h2>예약하기</h2>
            <div className="td-options-list">
              {ticket.options?.map((opt, i) => (
                <div className={`td-option-card${counts[i] > 0 ? ' selected' : ''}`} key={i}>
                  <div>
                    <div className="td-option-title">{opt.name}</div>
                    <div className="td-option-desc">{opt.desc}</div>
                  </div>
                  <div className="td-option-price">
                    <span className="td-option-original">{opt.original?.toLocaleString()}원</span>
                    <span className="td-option-final">{opt.price?.toLocaleString()}원</span>
                  </div>
                  <div className="td-option-qty">
                    <button onClick={() => handleCount(i, counts[i] - 1)}>-</button>
                    <span>{counts[i]}</span>
                    <button onClick={() => handleCount(i, counts[i] + 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
            {counts.some(c => c > 0) && (
              <div className="td-pay-summary">
                <div className="td-pay-total">
                  총 여행 금액 <span>{ticket.options.reduce((sum, opt, i) => sum + (opt.price * counts[i]), 0).toLocaleString()}원</span>
                </div>
                <button className="td-pay-btn" onClick={handlePay}>결제하기</button>
              </div>
            )}
          </section>

          {/* 이하 상품 소개, 환불 안내, 후기, 연관 상품은 ticket.description 등으로 대체 가능 */}
          {/* 필요 시 확장 */}
        </main>
      </div>
      <aside className="td-side">
        <div className="td-reserve-box">
          <div className="td-reserve-title">{ticket.name}</div>
          <div className="td-reserve-price-row">
            <span className="td-reserve-price">{ticket.price?.amount?.toLocaleString()}원</span>
            <span className="td-reserve-price-desc">부터</span>
          </div>
          <button className="td-side-reserve-btn" onClick={handleScrollToReserve}>예약하기</button>
        </div>
      </aside>
    </div>
  );
}

export default TicketDetail;
