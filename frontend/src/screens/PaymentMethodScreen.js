import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
import GooglePayButton from '@google-pay/button-react';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  // const [paymentMethodName, setPaymentMethod] = useState(
  //   paymentMethod || 'PayPal'
  // );

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'GooglePay'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          {/* <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div> */}
          {/* <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div> */}
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="GooglePay"
              label="GooglePay"
              value="GooglePay"
              checked={paymentMethodName === 'GooglePay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="CashOnDelivery"
              label="Cash On Delivery (This method will turn on mid 2023)"
              value="CashOnDelivery"
              checked={paymentMethodName === 'CashOnDelivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          {/* <div className="mb-3">
            <Form.Check
              type="radio"
              id="Phonepe"
              label="Phonepe"
              value="Phonepe"
              checked={paymentMethodName === 'Phonepe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Paytm"
              label="Paytm"
              value="Paytm"
              checked={paymentMethodName === 'Paytm'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Amazon"
              label="Amazon"
              value="Amazon"
              checked={paymentMethodName === 'Amazon'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Freecharge"
              label="Freecharge"
              value="Freecharge"
              checked={paymentMethodName === 'Freecharge'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div> */}
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
