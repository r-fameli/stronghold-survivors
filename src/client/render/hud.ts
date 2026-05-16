import { getAsset } from '../assets';
import { canvas, context } from './common';
import { BasicTurretConfig } from '../../shared/weapon-configs';
import { PlayerState } from '../state';

const BOX_SIZE = 64;
const PADDING = 10;
const IMAGE_SIZE = 40;

const EXP_BAR_HEIGHT = 20;
const EXP_BAR_BOTTOM = 10;

export function renderTurretCooldown(me: PlayerState) {
  const x = PADDING;
  const y = PADDING;

  // Box background
  context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  context.fillRect(x, y, BOX_SIZE, BOX_SIZE);

  // Cooldown progress (0 = just placed, 1 = ready)
  const progress = Math.max(0, Math.min(1, 1 - me.turretCooldown / BasicTurretConfig.COOLDOWN));

  // Tint overlay — grows from bottom
  if (progress > 0) {
    const tintHeight = BOX_SIZE * progress;
    context.fillStyle = 'rgba(52, 152, 219, 0.35)';
    context.fillRect(x, y + BOX_SIZE - tintHeight, BOX_SIZE, tintHeight);
  }

  // Turret icon centered
  const img = getAsset('turret-base.png');
  const imgOffset = (BOX_SIZE - IMAGE_SIZE) / 2;
  context.drawImage(img, x + imgOffset, y + imgOffset, IMAGE_SIZE, IMAGE_SIZE);
}

export function renderExpBar(me: PlayerState) {
  const barX = PADDING;
  const barY = canvas.height - EXP_BAR_HEIGHT - EXP_BAR_BOTTOM;
  const barWidth = Math.floor(canvas.width / 4);

  // Background
  context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  context.fillRect(barX, barY, barWidth, EXP_BAR_HEIGHT);

  // Fill
  const ratio = Math.min(1, me.exp / me.nextLevelExp);
  if (ratio > 0) {
    context.fillStyle = '#3498db';
    context.fillRect(barX, barY, barWidth * ratio, EXP_BAR_HEIGHT);
  }

  // Level text
  context.fillStyle = '#fff';
  context.font = 'bold 14px monospace';
  context.textAlign = 'left';
  context.textBaseline = 'middle';
  context.fillText(`Lvl ${me.level}`, barX + 6, barY + EXP_BAR_HEIGHT / 2);
}
