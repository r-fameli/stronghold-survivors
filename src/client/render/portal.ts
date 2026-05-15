import { getAsset } from '../assets';
import { context, worldToScreen, RenderObject } from './common';

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
