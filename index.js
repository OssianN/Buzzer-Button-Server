const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3001", "https://buzzer-button.netlify.app"],
  },
});
const {
  addUser,
  getRoomUsers,
  addHost,
  userBuzzed,
  resetBuzz,
  removeUser,
} = require("./users.js");

io.on("connection", (socket) => {
  console.log("User joined:", socket.id);

  socket.on("join host", ({ room }, callback) => {
    socket.join(room);
    addHost(socket.id, room);
    callback();
  });

  socket.on("join", ({ name, room, host }, callback) => {
    const { error, user } = addUser(socket.id, name, room, host);
    if (error) {
      return callback(error);
    }

    socket.join(room);
    callback(null, user);
    io.in(room).emit("host list", getRoomUsers(room));
  });

  socket.on("buzz", (user, time, callback) => {
    userBuzzed(user.Id, time);
    io.in(user.room).emit("buzzed", user.id, time);
    callback(time);
  });

  socket.on("reset buzz", (room) => {
    resetBuzz();
    io.in(room).emit("buzz has reset");
  });

  socket.on("disconnect", () => {
    console.log("User left:", socket.id);
    removeUser(socket.id);
  });
});

const port = process.env.PORT || 4000;

http.listen(port, () => {
  console.log("server listen on port: " + port);
});
