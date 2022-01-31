const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000", "https://buzzer-button.netlify.app"],
  },
});
const { addUser, createRoom } = require("./users.js");

io.on("connection", (socket) => {
  console.log("User joined:", socket.id);

  socket.on("create", ({ room, name }, callback) => {
    const { error } = createRoom(room);
    if (error) {
      return callback(error);
    }

    socket.join(room);
    io.in(room).emit("user joined", { name, room, host: true });
    io.in(room).emit("message", { msg: `hey, ${name} this is ${room}` });
  });

  socket.on("join", ({ name, room }) => {
    const { error } = addUser(room);
    if (error) {
      return callback(error);
    }

    socket.join(room);
    io.in(room).emit("user joined", { name, room });
    io.in(room).emit("message", { msg: `hey, ${name} this is ${room}` });
  });

  socket.on("disconnect", () => {
    console.log("User left:", socket.id);
  });
});

const port = process.env.PORT || 4000;

http.listen(port, () => {
  console.log("server listen on port: " + port);
});
