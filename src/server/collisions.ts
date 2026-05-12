import Constants from '../shared/constants';

interface Collidable {
  id: string;
  parentID?: string;
  x: number;
  y: number;
  radius?: number;
  distanceTo: (obj: Collidable) => number;
  takeBulletDamage?: () => void;
  hp?: number;
}

function applyCollisions(
  players: Collidable[],
  bullets: Collidable[],
  portals: Collidable[],
  angels: Collidable[],
): Collidable[] {
  const destroyedBullets: Collidable[] = [];

  // Bullet vs players
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < players.length; j++) {
      const bullet = bullets[i];
      const player = players[j];
      if (
        bullet.parentID !== player.id &&
        player.distanceTo(bullet) <= Constants.PLAYER_RADIUS + Constants.BULLET_RADIUS
      ) {
        destroyedBullets.push(bullet);
        player.takeBulletDamage!();
        break;
      }
    }
  }

  // Bullet vs angels
  for (let i = 0; i < bullets.length; i++) {
    if (destroyedBullets.includes(bullets[i])) continue;
    for (let j = 0; j < angels.length; j++) {
      const bullet = bullets[i];
      const angel = angels[j];
      if (
        bullet.parentID !== angel.id &&
        angel.distanceTo(bullet) <= (angel.radius || 20) + Constants.BULLET_RADIUS
      ) {
        destroyedBullets.push(bullet);
        angel.takeBulletDamage!();
        break;
      }
    }
  }

  // Player vs portal push
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < portals.length; j++) {
      const player = players[i];
      const portal = portals[j];
      const distance = player.distanceTo(portal);

      if (distance < Constants.PLAYER_RADIUS + portal.radius!) {
        const angle = Math.atan2(player.y - portal.y, player.x - portal.x);
        const targetDistance = Constants.PLAYER_RADIUS + portal.radius!;
        player.x = portal.x + Math.cos(angle) * targetDistance;
        player.y = portal.y + Math.sin(angle) * targetDistance;
      }
    }
  }

  return destroyedBullets;
}

export default applyCollisions;
