import { Spaceship } from "./spaceship.js";

export class Vitalis extends Spaceship {
  constructor(owner) {
    super("Vitalis", 3, 2, 3, 0, owner, { type: "ally" });
  }

  lockTarget(targets) {
    return targets.find(ship => ship.shield !== ship._maxShield);
  }

  fire(target) {
    if (!target) {
      console.log("Vitalis medical ship has no work to do this turn.")
      return
    }
    const isOverShielded = target.shield + this.power > target._maxShield;
    target.shield = isOverShielded
      ? target._maxShield
      : target.shield + this.power;

    console.log(`Vitalis technomedics restored part of ${target.name} shield [${target.shield}/${target._maxShield}]`);
  }
}
