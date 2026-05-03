const Constants = require('../shared/constants');

// Returns an array of bullets to be destroyed.
function applyCollisions(players, bullets, castles) {
  const destroyedBullets = [];
  
  // Bullet-player collisions
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < players.length; j++) {
      const bullet = bullets[i];
      const player = players[j];
      if (
        bullet.parentID !== player.id &&
        player.distanceTo(bullet) <= Constants.PLAYER_RADIUS + Constants.BULLET_RADIUS
      ) {
        destroyedBullets.push(bullet);
        player.takeBulletDamage();
        break;
      }
    }
  }
  
  // Player-castle collisions (prevent movement into castle)
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < castles.length; j++) {
      const player = players[i];
      const castle = castles[j];
      const distance = player.distanceTo(castle);
      
      if (distance < Constants.PLAYER_RADIUS + castle.radius) {
        // Push player away from castle
        const angle = Math.atan2(player.y - castle.y, player.x - castle.x);
        const targetDistance = Constants.PLAYER_RADIUS + castle.radius;
        player.x = castle.x + Math.cos(angle) * targetDistance;
        player.y = castle.y + Math.sin(angle) * targetDistance;
      }
    }
  }
  
  return destroyedBullets;
}

module.exports = applyCollisions;