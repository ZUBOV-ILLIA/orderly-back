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

// ================
import path from 'path';
import { uploadsDir, upload } from './multer.js';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(uploadsDir));

app.post('/upload', upload.single('avatar'), function (req, res) {
  res.send(req.file);
});

app.get('/download', function (req, res) {
  const filePath = path.join(uploadsDir, req.query.filename);
  res.sendFile(filePath, err => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});
// ================

const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

createWebSocketServer(server);
