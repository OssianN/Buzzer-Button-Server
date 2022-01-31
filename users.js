const users = [];
const rooms = [];

const addUser = (room, name) => {
  const isUser = users.find((user) => user.room === room && user.name === name);

  if (isUser) {
    return { error: "name taken" };
  }

  const user = { room, name };
  users.push(user);
  return { error: null, user };
};

const createRoom = (room) => {
  const isRoom = rooms.find((roomName) => roomName === room);

  if (isRoom) {
    return { error: "room taken" };
  }

  rooms.push(room);
  return { error: null, roomName: room };
};

module.exports = { addUser, createRoom };
