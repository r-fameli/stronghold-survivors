import { context } from './common';
import { MAP_SIZE, RenderObject } from './common';

export function renderMinimap(
  me: RenderObject,
  others: RenderObject[],
  portals: RenderObject[],
  angels: RenderObject[],
  turrets?: RenderObject[],
) {
  const minimapSize = 150;
  const minimapX = context.canvas.width - minimapSize - 10;
  const minimapY = context.canvas.height - minimapSize - 10;
  const scale = minimapSize / MAP_SIZE;

  // Background
  context.fillStyle = 'black';
  context.fillRect(minimapX, minimapY, minimapSize, minimapSize);

  context.strokeStyle = 'white';
  context.lineWidth = 2;
  context.strokeRect(minimapX, minimapY, minimapSize, minimapSize);

  // Portal
  if (portals && portals.length > 0) {
    context.fillStyle = 'blue';
    context.beginPath();
    context.arc(
      minimapX + minimapSize / 2,
      minimapY + minimapSize / 2,
      5, 0, 2 * Math.PI,
    );
    context.fill();
  }

  // Other players
  others.forEach(player => {
    context.fillStyle = 'green';
    context.beginPath();
    context.arc(
      minimapX + player.x * scale,
      minimapY + player.y * scale,
      2, 0, 2 * Math.PI,
    );
    context.fill();
  });

  // Angels
  if (angels) {
    angels.forEach(angel => {
      context.fillStyle = 'yellow';
      context.beginPath();
      context.arc(
        minimapX + angel.x * scale,
        minimapY + angel.y * scale,
        2, 0, 2 * Math.PI,
      );
      context.fill();
    });
  }

  // Turrets
  if (turrets) {
    turrets.forEach(turret => {
      context.fillStyle = '#4488ff';
      context.beginPath();
      context.arc(
        minimapX + turret.x * scale,
        minimapY + turret.y * scale,
        2, 0, 2 * Math.PI,
      );
      context.fill();
    });
  }

  // Local player
  context.fillStyle = 'white';
  context.beginPath();
  context.arc(
    minimapX + me.x * scale,
    minimapY + me.y * scale,
    3, 0, 2 * Math.PI,
  );
  context.fill();
}
