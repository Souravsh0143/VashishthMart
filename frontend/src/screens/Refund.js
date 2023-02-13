import React from 'react';
import { Helmet } from 'react-helmet-async';

const Refund = () => {
  return (
    <div>
      <Helmet>
        <title>Cancellation and Refund Policy</title>
      </Helmet>
      <h1>Cancellation and Refund Policy</h1>
      <p>
        Do you have questions about the VashishthMart returns policy? This
        simple guide will help you understand how the VashishthMart product
        returns process works, making your shopping and returns experience
        smooth and convenient.
      </p>
      <p>
        Online shopping is simple and quick. You might enjoy the comfort and
        convenience of buying your favourite products in a few clicks or taps.
        Sometimes, however, when your order arrives, you may realize that the
        product is not exactly what you expected. It may not be of the right
        size or color, or in rare cases you might find that it is defective or
        damaged and we understand that sometimes things don't go as planned, and
        you may need to cancel your order. If you would like to cancel an order,
        please contact us as soon as possible. If your order has not yet been
        shipped, we will be able to cancel it and issue a full refund. If you
        have already received your order and are not satisfied, you may be
        eligible for a refund or exchange. Our return policy lasts [15 days],
        and items must be returned in their original condition, with all
        packaging and tags intact. Please note that in some cases, a restocking
        fee may be applied, or we may not be able to offer a full refund for
        items that are not returned in their original condition. If you receive
        a defective item, we will be happy to offer a replacement or a full
        refund. If you have any questions about our Cancellation & Refund
        Policy, please contact us and we will be happy to assist you.
      </p>

      <p>
        Email: &nbsp;
        <a className="linkstyle1" href="mailto:help.vashishthmart@gmail.com">
          help.vashishthmart@gmail.com
        </a>
        <br />
        Contact :{' '}
        <a className="linkstyle1" href="tel:+918708886015">
          +918708886015{' '}
        </a>
      </p>
      <h6>Sincerely, The VashishthMart Team</h6>
    </div>
  );
};

export default Refund;
