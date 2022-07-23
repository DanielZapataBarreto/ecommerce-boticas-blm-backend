import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import dbConnection from './config/mongo.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4201;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('Hello World'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/order', orderRoutes);

app.use('/api/v1/uploads', express.static(path.resolve('uploads')));

dbConnection();

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}, http://localhost:${PORT}`);
  console.log('Ready to receive requests');
});
