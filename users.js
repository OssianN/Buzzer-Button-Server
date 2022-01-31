const users = [];
const rooms = [];

const addUser = (name, room, id) => {
  const isUser = users.find((user) => user.room === room && user.name === name);

  if (isUser) {
    return { error: "name taken" };
  }

  const user = { room, name, id };
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

const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = { addUser, createRoom, getRoomUsers };
