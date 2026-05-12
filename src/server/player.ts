import GameObject from './object';
import Turret from './weapons/turret';
import { TurretConfig } from './weapons/weapon-configs';
import Constants from '../shared/constants';

class Player extends GameObject {
  username: string;
  hp: number;
  score: number;
  turretCooldown: number;
  turretIdCounter: number;

  constructor(id: string, username: string, x: number, y: number) {
    super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
    this.username = username;
    this.hp = Constants.PLAYER_MAX_HP;
    this.score = 0;
    this.turretCooldown = 0;
    this.turretIdCounter = 0;
  }

  update(dt: number): Turret | null {
    super.update(dt);
    this.score += dt * Constants.SCORE_PER_SECOND;
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    this.turretCooldown -= dt * 1000;
    if (this.turretCooldown <= 0) {
      this.turretCooldown += TurretConfig.COOLDOWN;
      this.turretIdCounter++;
      const offset = Constants.PLAYER_RADIUS + TurretConfig.RADIUS + 10;
      const tx = this.x + Math.cos(this.direction) * offset;
      const ty = this.y + Math.sin(this.direction) * offset;
      return new Turret(
        `${this.id}_turret_${this.turretIdCounter}`,
        tx, ty,
        this.direction,
        TurretConfig,
      );
    }
    return null;
  }

  serializeForUpdate() {
    return {
      ...super.serializeForUpdate(),
      direction: this.direction,
      hp: this.hp,
    };
  }
}

export default Player;
