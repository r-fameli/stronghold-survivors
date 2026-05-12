import GameObject from "../object";
import { TurretConfig } from "./weapon-configs";

class Turret extends GameObject {
  spawnTime: number;
  duration: number;
  radius: number;
  fireCooldown: number;
  attackRadius: number;
  fireCdInterval: number;

  constructor(id: string, x: number, y: number, dir: number, config: TurretConfig) {
    super(id, x, y, dir, 0);
    this.isMoving = false;
    this.spawnTime = Date.now();
    this.duration = config.DURATION;
    this.radius = config.RADIUS;
    this.fireCooldown = 0;
    this.attackRadius = config.ATTACK_RADIUS;
    this.fireCdInterval = config.FIRE_COOLDOWN;
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
