import { getAsset } from '../assets';
import { context } from './common';
import { BasicTurretConfig } from '../../shared/weapon-configs';
import { PlayerState } from '../state';

const BOX_SIZE = 64;
const PADDING = 10;
const IMAGE_SIZE = 40;

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
