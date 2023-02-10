import React from 'react';
import GooglePayButton from '@google-pay/button-react';

<script
  async
  src="https://pay.google.com/gp/p/js/pay.js"
  onload="console.log('TODO: add onload function')"
></script>;

const GooglePay = async () => {
  return (
    <div className="App">
      <GooglePayButton
        environment="PRODUCTION"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: [
                  'MASTERCARD',
                  'DISCOVER',
                  'VISA',
                  'MAESTRO',
                ],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'PRODUCTION',
                  gatewayMerchandId: 'productionGatewayMerchantId',
                },
              },
            },
          ],

          merchantInfo: {
            merchantId: 'BCR2DN4TXLNKTAYM',
            merchantName: 'VashishthMart',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '1',
            currencyCode: 'INR',
            countryCode: 'IN',
          },
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log('Load Payment Data', paymentRequest);
        }}
      />
    </div>
  );
};
export default GooglePay;
