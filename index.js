import express from 'express';
import cors from 'cors';
import { createWebSocketServer } from './websocket.js';
import productRouter from './routes/product.router.js';
import orderRouter from './routes/order.router.js';
import authRouter from './routes/auth.router.js';
import { authMiddleware } from './middleware/authMiddleware.js';

const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/products', authMiddleware, productRouter);
app.use('/orders', authMiddleware, orderRouter);

const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

createWebSocketServer(server);
