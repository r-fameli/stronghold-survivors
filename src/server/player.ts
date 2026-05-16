import GameObject from './object';
import Constants from '../shared/constants';

const EXP_BASE_THRESHOLD = 100;

class Player extends GameObject {
  username: string;
  hp: number;
  score: number;
  turretCooldown: number;
  turretIdCounter: number;
  exp: number;
  level: number;
  nextLevelExp: number;

  constructor(id: string, username: string, x: number, y: number) {
    super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
    this.username = username;
    this.hp = Constants.PLAYER_MAX_HP;
    this.score = 0;
    this.turretCooldown = 0;
    this.turretIdCounter = 0;
    this.exp = 0;
    this.level = 1;
    this.nextLevelExp = EXP_BASE_THRESHOLD;
  }

  addExp(amount: number) {
    this.exp += amount;
    while (this.exp >= this.nextLevelExp) {
      this.exp -= this.nextLevelExp;
      this.level++;
      this.nextLevelExp = Math.floor(EXP_BASE_THRESHOLD * Math.pow(1.08, this.level - 1));
    }
  }

  update(dt: number) {
    super.update(dt);
    this.score += dt * Constants.SCORE_PER_SECOND;
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));
  }

  serializeForUpdate() {
    return {
      ...super.serializeForUpdate(),
      direction: this.direction,
      hp: this.hp,
      turretCooldown: this.turretCooldown,
      exp: this.exp,
      level: this.level,
      nextLevelExp: this.nextLevelExp,
    };
  }
}

export default Player;
