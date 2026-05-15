import { getAsset } from '../assets';
import { context, worldToScreen, RenderObject } from './common';

export function renderTurret(me: RenderObject, turret: RenderObject) {
  const { x, y, direction, radius, remainingRatio, aimDirection } = turret;
  const r = radius || 20;
  const { canvasX, canvasY } = worldToScreen(me, turret);

  // Base
  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(direction!);
  context.drawImage(
    getAsset('turret-base.png'),
    -r,
    -r,
    r * 2,
    r * 2,
  );
  context.restore();

  // Head — sprite faces right
  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(aimDirection || 0);
  context.drawImage(
    getAsset('turret-head.png'),
    -r,
    -r,
    r * 2,
    r * 2,
  );
  context.restore();

  // Duration bar
  const barWidth = 30;
  const barHeight = 4;
  const barX = canvasX - barWidth / 2;
  const barY = canvasY + r + 5;

  context.fillStyle = '#333';
  context.fillRect(barX, barY, barWidth, barHeight);

  context.fillStyle = '#3498db';
  context.fillRect(barX, barY, barWidth * (remainingRatio || 0), barHeight);
}
