import React from 'react';

function PaymentMethodBox({ method, setMethod }) {
  return (
    <div className="payment-method-box">
      <h3>결제 방법</h3>
      <label>
        <input type="radio" name="pay" value="account" checked={method === 'account'} onChange={() => setMethod('account')} /> 쾌계좌이체
      </label>
      <label>
        <input type="radio" name="pay" value="easy" checked={method === 'easy'} onChange={() => setMethod('easy')} /> 간편결제
      </label>
      <label>
        <input type="radio" name="pay" value="card" checked={method === 'card'} onChange={() => setMethod('card')} /> 신용/체크카드 결제
      </label>
      <label>
        <input type="radio" name="pay" value="overseas" checked={method === 'overseas'} onChange={() => setMethod('overseas')} /> 해외간편결제
      </label>
    </div>
  );
}

export default PaymentMethodBox; 