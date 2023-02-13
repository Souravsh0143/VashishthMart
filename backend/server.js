import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Razorpay Start
// const Razorpay = require('razorpay');

// const OrderSchema = mongoose.Schema({
//   isPaid: Boolean,
//   amount: Number,
//   razorpay: {
//     orderId: String,
//     paymentId: String,
//     signature: String,
//   },
// });

// app.post('/create-order', async (req, res) => {
//   try {
//     const instance = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_SECRET,
//     });
//     const options = {
//       amount: req.body.amount,
//       currency: 'INR',
//     };
//     const order = await instance.orders.create(options);
//     if (!order) return res.status(500).send('Some error occured');
//     res.send(order);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
// app.post('/pay-order', async (req, res) => {
//   try {
//     const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
//       req.body;
//     const newPayment = Order({
//       isPaid: true,
//       amount: amount,
//       razorpay: {
//         orderId: razorpayOrderId,
//         paymentId: razorpayPaymentId,
//         signature: razorpaySignature,
//       },
//     });
//     await newPayment.save();
//     res.send({
//       msg: 'Payment was successful',
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// });

// app.get('/list-orders', async (req, res) => {
//   const orders = await Order.find();
//   res.send(orders);
// });

// const Order = mongoose.model('Order', OrderSchema);

// End

app.get('/get-razorpay-key', (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get('/api/keys/gpay', (req, res) => {
  res.send(process.env.GOOGLE_PAY_MERCHANT_ID || '');
});
app.get('/api/keys/google', (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || '' });
});

app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
