import React, { useState } from 'react';
import OrderSummary from '../../02-components/payment/OrderSummary';
import OrderDiscountBox from '../../02-components/payment/OrderDiscountBox';
import AgreementCheckBox from '../../02-components/payment/AgreementCheckBox';
import PaymentMethodBox from '../../02-components/payment/PaymentMethodBox';

const dummyProduct = {
  title: '[★당일가능] 롯데월드 종일 종합이용권',
  option: 'AFTER4 종합이용권 1인',
  price: 35500
};

function OrderPage() {
  const [point, setPoint] = useState('');
  const [coupon, setCoupon] = useState('');
  const [agreements, setAgreements] = useState({ all: false, info: false, provide: false, marketing: false });
  const [method, setMethod] = useState('account');

  return (
    <div className="order-page-wrap">
      <OrderSummary product={dummyProduct} />
      <OrderDiscountBox point={point} setPoint={setPoint} coupon={coupon} setCoupon={setCoupon} />
      <AgreementCheckBox agreements={agreements} setAgreements={setAgreements} />
      <PaymentMethodBox method={method} setMethod={setMethod} />
      {/* 결제 버튼 등 추가 가능 */}
    </div>
  );
}

export default OrderPage; 