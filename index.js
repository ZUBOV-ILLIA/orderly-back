import express from 'express';
import cors from 'cors';
import { createWebSocketServer } from './websocket.js';
import productRouter from './routes/product.router.js';
import orderRouter from './routes/order.router.js';

const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/products', productRouter);
app.use('/orders', orderRouter);

const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

createWebSocketServer(server);
