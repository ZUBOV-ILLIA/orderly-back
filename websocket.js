import {WebSocketServer} from "ws";

export const createWebSocketServer = (server) => {
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
}
