const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a room (for game sessions)
  socket.on('join-game', (gameId) => {
    socket.join(gameId);
    const clients = io.sockets.adapter.rooms.get(gameId);
    io.to(gameId).emit('player-joined', {
      playerId: socket.id,
      playerCount: clients.size
    });
  });

  // Handle player movement
  socket.on('player-move', (data) => {
    socket.broadcast.emit('player-moved', {
      playerId: socket.id,
      ...data
    });
  });

  // Handle game state updates
  socket.on('game-state-update', (data) => {
    socket.broadcast.emit('game-state-updated', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    socket.broadcast.emit('player-disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});