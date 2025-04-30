// utils/socketManager.js

const connectedUsers = new Map();
let io = null;

function setIO(serverInstance) {
  io = serverInstance;
}

function getIO() {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}

module.exports = {
  connectedUsers,
  setIO,
  getIO,
};
