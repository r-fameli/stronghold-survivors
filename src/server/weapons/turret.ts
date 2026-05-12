import GameObject from "../object";
import { BaseWeaponConfig } from "./weapon-configs";

class Turret extends GameObject {
  spawnTime: number;
  duration: number;
  radius: number;

  constructor(id: string, x: number, y: number, dir: number, config: BaseWeaponConfig) {
    super(id, x, y, dir, 0);
    this.isMoving = false;
    this.spawnTime = Date.now();
    this.duration = config.DURATION;
    this.radius = config.RADIUS;
  }

  update(dt: number): boolean {
    return Date.now() - this.spawnTime > this.duration;
  }

  serializeForUpdate() {
    return {
      ...super.serializeForUpdate(),
      direction: this.direction,
      radius: this.radius,
      remainingRatio: Math.max(0, 1 - (Date.now() - this.spawnTime) / this.duration),
    };
  }
}

export default Turret;
