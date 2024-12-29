import express from 'express'
import cors from 'cors';
import {WebSocketServer} from "ws";

const app = express()
const port = 3005

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({ clientsLength: wss.clients.size }));
  });

  ws.on('close', () => {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({ clientsLength: wss.clients.size }));
    });
  });

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
});



