import { getAsset } from '../assets';
import { context, PLAYER_RADIUS, worldToScreen, RenderObject } from './common';

export function renderPlayer(me: RenderObject, player: RenderObject) {
  const { x, y, direction } = player;
  const { canvasX, canvasY } = worldToScreen(me, player);

  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(direction!);
  context.drawImage(
    getAsset('player.png'),
    -PLAYER_RADIUS,
    -PLAYER_RADIUS,
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  );
  context.restore();
}
