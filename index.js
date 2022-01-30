require('dotenv').config();
const express = require("express");
const app = express();
const server = require('http').Server(app);

const socketIo = require("socket.io");
const io = socketIo(server)

const port = 4000;

io.on('connection', (socket) => {
  console.log('a user connected');
});


app.listen(process.env.PORT || port, () => console.log(`server running on port ${process.env.PORT || port}`));

