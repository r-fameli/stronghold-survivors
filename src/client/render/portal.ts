import { getAsset } from '../assets';
import { canvas, context, worldToScreen, RenderObject } from './common';

export function renderPortal(me: RenderObject, portal: RenderObject) {
  const { canvasX, canvasY } = worldToScreen(me, portal);

  context.drawImage(
    getAsset('portal.png'),
    canvasX - 100,
    canvasY - 100,
    200,
    200,
  );
}

export function renderPortalHP(me: RenderObject, portal: RenderObject) {
  // Draw HP bar at top-center of screen for the portal
  const barWidth = 200;
  const barHeight = 16;
  const barX = (canvas.width - barWidth) / 2;
  const barY = 10;

  context.fillStyle = 'rgba(0, 0, 0, 0.6)';
  context.fillRect(barX, barY, barWidth, barHeight);

  const ratio = Math.max(0, (portal.hp || 0) / (portal.maxHp || 1));
  context.fillStyle = '#e74c3c';
  context.fillRect(barX, barY, barWidth, barHeight);

  context.fillStyle = '#2ecc71';
  context.fillRect(barX, barY, barWidth * ratio, barHeight);

  // Text
  context.fillStyle = '#fff';
  context.font = 'bold 12px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(`Portal ${Math.ceil(portal.hp || 0)}/${portal.maxHp}`, canvas.width / 2, barY + barHeight / 2);
}
