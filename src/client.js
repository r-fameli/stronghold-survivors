const socket = io();

// Game state
let gameState = {
  players: {},
  myPlayerId: null
};

// DOM elements
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const statusDiv = document.getElementById('status');

// Set canvas size
gameCanvas.width = 800;
gameCanvas.height = 600;

// Join a game
function joinGame(gameId) {
  socket.emit('join-game', gameId);
}

// Handle player movement
function handleKeyPress(event) {
  const speed = 5;
  let moveData = null;

  switch(event.key) {
    case 'ArrowUp':
    case 'w':
      moveData = { x: 0, y: -speed };
      break;
    case 'ArrowDown':
    case 's':
      moveData = { x: 0, y: speed };
      break;
    case 'ArrowLeft':
    case 'a':
      moveData = { x: -speed, y: 0 };
      break;
    case 'ArrowRight':
    case 'd':
      moveData = { x: speed, y: 0 };
      break;
  }

  if (moveData && gameState.myPlayerId) {
    socket.emit('player-move', {
      playerId: gameState.myPlayerId,
      ...moveData
    });
  }
}

// Draw game
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Draw all players
  Object.values(gameState.players).forEach(player => {
    ctx.fillStyle = player.id === gameState.myPlayerId ? '#00ff00' : '#ff0000';
    ctx.fillRect(player.x, player.y, 20, 20);
    
    // Draw player ID
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.fillText(player.id, player.x, player.y - 5);
  });

  requestAnimationFrame(draw);
}

// Socket event handlers
socket.on('connect', () => {
  gameState.myPlayerId = socket.id;
  statusDiv.textContent = `Connected as ${socket.id}`;
  joinGame('default-game');
});

socket.on('player-joined', (data) => {
  statusDiv.textContent = `Players in game: ${data.playerCount}`;
});

socket.on('player-moved', (data) => {
  if (data.playerId !== gameState.myPlayerId) {
    if (!gameState.players[data.playerId]) {
      gameState.players[data.playerId] = { x: 400, y: 300 };
    }
    gameState.players[data.playerId].x += data.x;
    gameState.players[data.playerId].y += data.y;
  }
});

socket.on('game-state-updated', (data) => {
  gameState.players = data.players || {};
});

socket.on('player-disconnected', (playerId) => {
  delete gameState.players[playerId];
  statusDiv.textContent = `Player ${playerId} disconnected`;
});

// Event listeners
document.addEventListener('keydown', handleKeyPress);

// Start game loop
draw();

// Initialize player position
gameState.players[gameState.myPlayerId] = { x: 400, y: 300 };