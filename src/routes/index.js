const express = require('express');
const router = express.Router();
const { connectedUsers, getIO } = require('../utils/socketManager');

router.post('/connection-request', (req, res) => {
  const { toUserId, fromUserId } = req.body;
  console.log(req.body);
  
  const socketId = connectedUsers.get(toUserId);
  if (socketId) {
    const io = getIO();
    io.to(socketId).emit('connection-request', {
      from: fromUserId,
      message: 'You have a new connection request',
    });
    return res.status(200).json({ sent: true });
  }

  res.status(200).json({ sent: false, message: 'User not connected' });
});

module.exports = router;
