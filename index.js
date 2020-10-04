'use strict';
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: server });

app.use(express.static(__dirname + "/public"))

wss.on('connection', function connection(ws) {
      console.log('A new client connected')
      ws.send('welcome new client');
      ws.on('message', function incoming(message) {
            var random = Math.random().toString(30).substring(10).toUpperCase();
            console.log('received: %s', message);
            ws.send(random);
      });
});

app.get('/', (req, resp) => {
      resp.send('service running')
});

const port = 3000;
server.listen(port, function () {
      console.log('Service running on port...' + port);
});