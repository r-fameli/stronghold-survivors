import GameObject from "../object";
import Constants from "../../shared/constants";
import { MobConfig } from "./mob-configs";

class Mob extends GameObject {
  hp: number;
  maxHp: number;
  targetX: number;
  targetY: number;
  radius: number;

  constructor(id: string, x: number, y: number, targetX: number, targetY: number, config: MobConfig) {
    super(id, x, y, 0, config.BASE_SPEED);
    this.hp = config.BASE_HEALTH;
    this.maxHp = config.BASE_HEALTH;
    this.targetX = targetX;
    this.targetY = targetY;
    this.radius = config.BASE_RADIUS;
  }

  update(dt: number): boolean {
    this.direction = Math.atan2(this.targetY - this.y, this.targetX - this.x);
    super.update(dt);

    const dx = this.x - this.targetX;
    const dy = this.y - this.targetY;
    return (dx * dx + dy * dy) < 400;
  }

  takeBulletDamage() {
    this.hp -= Constants.BULLET_DAMAGE;
  }

  serializeForUpdate() {
    return {
      ...super.serializeForUpdate(),
      direction: this.direction,
      hp: this.hp,
      maxHp: this.maxHp,
      radius: this.radius,
    };
  }
}

export default Mob;
