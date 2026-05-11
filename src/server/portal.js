const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Portal extends ObjectClass {
  constructor(id, x, y) {
    super(id, x, y, 0, 0);
    this.radius = 100;
  }

  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      radius: this.radius,
    };
  }
}

module.exports = Portal;