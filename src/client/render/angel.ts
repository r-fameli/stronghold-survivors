import { getAsset } from '../assets';
import { context, worldToScreen, RenderObject } from './common';

export function renderAngel(me: RenderObject, angel: RenderObject) {
  const { x, y, direction, hp, maxHp, radius } = angel;
  const r = radius || 20;
  const { canvasX, canvasY } = worldToScreen(me, angel);

  // Sprite
  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(direction!);
  context.drawImage(
    getAsset('angel.png'),
    -r,
    -r,
    r * 2,
    r * 2,
  );
  context.restore();

  // HP bar
  const barWidth = 40;
  const barHeight = 5;
  const barX = canvasX - barWidth / 2;
  const barY = canvasY + r + 5;

  context.fillStyle = '#333';
  context.fillRect(barX, barY, barWidth, barHeight);

  context.fillStyle = '#e74c3c';
  context.fillRect(barX, barY, barWidth, barHeight);

  const hpRatio = Math.max(0, (hp || 0) / (maxHp || 1));
  context.fillStyle = '#2ecc71';
  context.fillRect(barX, barY, barWidth * hpRatio, barHeight);
}
