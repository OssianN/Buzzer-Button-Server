const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000", "https://buzzer-button.netlify.app"],
  },
});
const {
  addUser,
  createRoom,
  getRoomUsers,
  userBuzzed,
  resetBuzz,
} = require("./users.js");

io.on("connection", (socket) => {
  console.log("User joined:", socket.id);

  socket.on("create", ({ room }, callback) => {
    const { error } = createRoom(room);
    if (error) {
      return callback(error);
    }

    socket.join(room);
    callback();
  });

  socket.on("join", ({ name, room, host }, callback) => {
    const { error, user } = addUser(socket.id, name, room, host);
    if (error) {
      return callback(error);
    }

    socket.join(room);
    io.in(room).emit("host list", getRoomUsers(room));
    callback(null, user);
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
  });
});

const port = process.env.PORT || 4000;

http.listen(port, () => {
  console.log("server listen on port: " + port);
});
