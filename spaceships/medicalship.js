import { Spaceship } from "./spaceship.js";

export class Medicalship extends Spaceship {
  constructor(name, hp, shield, power, movement, type, owner) {
    super(name, hp, shield, power, movement, type, owner, { type: "ally" });
    console.log(this)
  }

  lockTarget(targets) {
    const target = targets.find(ship => ship.shield < ship._maxShield);
    return target
  }

  fire(target) {
    const isOverShielded = target.shield + this.power > target._maxShield;
    target.shield = isOverShielded
      ? target._maxShield
      : target.shield + this.power;

    return [`${this.name} technomedics restored part of ${target.name} shield [${target.shield}/${target._maxShield}]`];
  }
}
