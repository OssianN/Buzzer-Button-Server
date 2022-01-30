const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http,  {
  cors: {
    origin: "http://localhost:3000"
  }
})

app.get('/', (req, res) => {
  res.json("hello world!");
});

io.on('connection', (socket) => {
  console.log('a user connected');
});


const port = process.env.PORT || 4000

http.listen(port, () => {
  console.log('server listen on port: ' + port);
})

