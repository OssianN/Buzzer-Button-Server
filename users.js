const users = [];
const rooms = [];

const addUser = (id, name, room, host) => {
  const isUser = users.find((user) => user.room === room && user.name === name);

  if (isUser) {
    return { error: "name taken" };
  }

  const user = { id, room, name, host, buzzed: null };
  users.push(user);
  return { error: null, user };
};

const createRoom = (room) => {
  const isRoom = rooms.find((roomName) => roomName === room);

  if (isRoom) {
    return { error: "room taken" };
  }

  rooms.push(room);
  return { error: null };
};

const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};

const userBuzzed = (id, time) => {
  users.forEach((user) => (user.id === id ? (user.buzzed = time) : null));
};

const resetBuzz = () => {
  users.forEach((user) => (user.buzzed = null));
};

module.exports = { addUser, createRoom, getRoomUsers, userBuzzed, resetBuzz };
