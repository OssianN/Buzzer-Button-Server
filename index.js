const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 4000;

app.get('/', (req, res) => {
  res.sendFile("hello world!");
});

io.on('connection', (socket) => {
  console.log('a user connected');
});


app.listen(process.env.PORT || port, () => console.log(`server running on port ${process.env.PORT || port}`));

