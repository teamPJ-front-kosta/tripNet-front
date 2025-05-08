import React from 'react';

function OrderSummary({ product }) {
  return (
    <div className="order-summary-box">
      <h3>주문 상품</h3>
      <div>{product.title}</div>
      <div>{product.option}</div>
      <div>{product.price.toLocaleString()}원</div>
    </div>
  );
}

export default OrderSummary; 