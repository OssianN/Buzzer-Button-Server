const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
  console.log('a user connected');
});


const port = process.env.PORT || 4000

http.listen(port, () => {
  console.log('server listen on port: ' + port);
})

