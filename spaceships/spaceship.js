import { Radar } from "./radar/radar.js";
import { getRandomInt } from "../utils/random.js";

export class Spaceship {
  constructor(name, hp, shield, power, type, owner, targetSelector) {
    //Base
    this.id = null;
    this.name = name;
    this.hp = hp;
    this.shield = shield;
    this._maxShield = shield;
    this.power = power;
    this.type = type;
    this.owner = owner;

    this.targetSelector = targetSelector || { type: "enemy" };
    this.radar = new Radar();
  }

  get status() {
    return this.hp > 0 ? 'active' : 'destroyed'
  }

  get onDestroy() {
    console.log(`   ${this.name}${this.id} blows up!! 💀`)
  }

  move(sector) {
    this.radar.updatePosition(sector);
  }

  findTargets() {
    const { type } = this.targetSelector;
    return this.radar.findTargets(type, this.owner, this.id);
  }

  lockTarget(targets) {
    //For now, first target. Could be random, lowest hp, the deadliest.... 
    return targets[0];
  }

  receiveDamage(dmg) {
    let absortion = this.shield - dmg;
    if (absortion < 0) {
      this.shield = 0;
      this.hp += absortion;
      if (this.hp <= 0) {
        this.hp = 0;
        this.onDestroy
      }
    } else {
      console.log(`   ${this.name} shield absorbed the impact. [${this.shield - dmg}/${this._maxShield}]`);
      this.shield -= dmg;
    }
  }

  fire(target) {
    const { name, _id } = this;
    const { name: tname } = target;

    let RNG = getRandomInt(20);
    let result = RNG <= 1 ? "epicFail" : RNG < 8 ? "fail" : RNG <= 18 ? "impact" : "critical";

    let baseMsg = `${name}${this.id} `;
    const rngMessages = {
      epicFail: [`motors are overheatted! ♨`],
      fail: [`shot missed`],
      impact: [`hits ${tname} 💥 `],
      critical: [`hits the ${target.name} reactor! 💥💯`]
    }
    const completeMsg = baseMsg + rngMessages[result][0]
    console.log(completeMsg)

    switch (result) {
      case 'epicFail': this.receiveDamage(Math.floor(this.power / 2)); break;
      case 'impact': target.receiveDamage(this.power); break;
      case 'critical': target.receiveDamage(this.power * 2);
    }
  }

  restoreShield() { }
}