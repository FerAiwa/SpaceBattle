import { Radar } from "./radar/radar.js";
import { getRandomInt } from "../utils/random.js";

export class Spaceship {
  constructor(name, hp, shield, power, movement, type, owner, targetSelector) {
    //Base
    this.id = null;
    this.name = name;
    this.hp = hp;
    this.shield = shield;
    this.movement = movement;
    this._maxHp = hp;
    this._maxShield = shield;
    this.power = power;
    this.type = type;
    this.owner = owner;

    this.targetSelector = targetSelector || { type: "enemy" };
    this.radar = new Radar();
  }

  get status() {
    return this.hp > 0 ? "active" : "destroyed";
  }

  get onDestroy() {
    return `${this.name}${this.id} blows up!! 💀${this.owner.emoji}`;
  }

  move(sector) {
    this.radar.updatePosition(sector);
  }

  findTargets() {
    const { type } = this.targetSelector;
    const targets = this.radar.findTargets(type, this.owner, this.id);
    //Primary, secondary?
    return targets
  }

  lockTarget(targets) {
    //For now, first target. Could be random, lowest hp, the deadliest....
    return targets[0];
  }

  receiveDamage(dmg) {
    let absortion = this.shield - dmg;
    if (absortion < 0) {
      //Ship gets damage
      this.shield = 0;
      this.hp += absortion;
      if (this.hp <= 0) {
        //Ship dies
        this.hp = 0;
        return this.onDestroy;
      }
    } else {
      //Shield Absorbes damage
      this.shield -= dmg;
      return `${this.owner.name}'s ${this.name} shield absorbed the impact. [ Shield: ${this.shield}/${this._maxShield} ]`;
    }
    return `[ HP: ${this.hp}/${this._maxHp} ]`
  }

  fire(target) {
    const { name, _id } = this;
    const { name: tname } = target;

    let RNG = getRandomInt(20);
    let result = RNG <= 1 ? "epicFail" : RNG < 8 ? "fail" : RNG <= 18 ? "impact" : "critical";

    let baseMsg = `${this.owner.emoji} ${name} `;
    const rngMessages = {
      epicFail: [`motors are overheatted! ♨ `],
      fail: [`shot missed `],
      impact: [`hits ${tname} 💥 `],
      critical: [`hits the ${target.name} reactor! 💥💯 `]
    };
    const completeMsg = baseMsg + rngMessages[result][0];

    let effect = "";
    switch (result) {
      case "epicFail":
        effect = this.receiveDamage(Math.floor(this.power / 2));
        break;
      case "impact":
        effect = target.receiveDamage(this.power);
        break;
      case "critical":
        effect = target.receiveDamage(this.power * 2);
    }
    return [completeMsg + effect];


    /*     const logMessage = {
          user: null,
          ship: null,
          rng: null,
          target: null,
          effect: null
        } */
  }

  restoreShield() { }
}
