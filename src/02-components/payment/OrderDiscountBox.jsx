import React from 'react';

function OrderDiscountBox({ point, setPoint, coupon, setCoupon }) {
  return (
    <div className="order-discount-box">
      <h3>쿠폰/포인트</h3>
      <div>
        <input
          type="text"
          placeholder="쿠폰 코드 입력"
          value={coupon}
          onChange={e => setCoupon(e.target.value)}
        />
        <button>쿠폰 적용</button>
      </div>
      <div>
        <input
          type="number"
          placeholder="포인트 입력"
          value={point}
          onChange={e => setPoint(e.target.value)}
        />
        <button>포인트 사용</button>
      </div>
    </div>
  );
}

export default OrderDiscountBox; 