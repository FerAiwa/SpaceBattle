import { Sector } from "./sector.js";
import { Spaceship } from "../spaceships/spaceship.js";

export class BattleField {
  constructor(size) {
    this.size = size - 1;
    this.sectors = [];
    return this;
  }

  buildSectors() {
    for (let lat = 0; lat <= this.size; lat++) {
      this.sectors.push([]);
      for (let lon = 0; lon <= this.size; lon++) {
        const newSector = new Sector(lat, lon);
        this.sectors[lat].push(newSector);
      }
    }
    return this;
  }

  populate(spaceships) {
    for (let ship of spaceships) {
      const sector = this.getRandomSector()
      ship.move(sector);
      sector.addBattleship(ship);
    }
  }

  getRandomSector() {
    const lat = getRandomInt(this.size + 1);
    const lon = getRandomInt(this.size + 1);
    return this.sectors[lat][lon]
  }

  moveSpaceship(unit, oldSector, newSector) {
    oldSector.removeBattleship(unit);
    newSector.addBattleship(unit);
    unit.move(newSector);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
