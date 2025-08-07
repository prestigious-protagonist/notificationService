const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const router = require("./routes/index");
const { connectedUsers, setIO } = require('./utils/socketManager');

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
setIO(io); // 🔑 THIS IS REQUIRED

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    connectedUsers.set(userId, socket.id);
    console.log(`🟢 User connected: ${userId}`);
  }

  socket.on('disconnect', () => {
    connectedUsers.forEach((sid, uid) => {
      if (sid === socket.id) connectedUsers.delete(uid);
    });
    console.log(`🔴 Socket disconnected: ${socket.id}`);
  });
});

app.use('/notificationService/routes', router);
app.get('/notificationService', (req, res) => res.send('WebSocket Server Running'));

server.listen(3007, () => {
  console.log('🔔 Notification WebSocket service running on port 3007');
});
