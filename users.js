const users = [];

const addUser = (id, name, room, host) => {
  const isUser = users.find((user) => user.room === room && user.name === name);
  // const isRoom = users.find((user) => user.room === room);

  if (isUser) {
    return { error: "name taken" };
  }

  // if (!isRoom) {
  //   return { error: "room does not exist" };
  // }

  const user = { id, room, name, host, buzzed: null };
  users.push(user);
  return { error: null, user };
};

const addHost = (id, room) => {
  users.push({ id, room, host: true });
};

const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room && !user.host);
};

const userBuzzed = (id, time) => {
  users.forEach((user) => (user.id === id ? (user.buzzed = time) : null));
};

const resetBuzz = () => {
  users.forEach((user) => (user.buzzed = null));
};

const removeUser = (id) => {
  const userIndex = users.indexOf((user) => user.id === id);
  users.splice(userIndex, 1);
};

module.exports = {
  addUser,
  getRoomUsers,
  addHost,
  userBuzzed,
  resetBuzz,
  removeUser,
};
