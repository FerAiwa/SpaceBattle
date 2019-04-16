import { Sector } from "./sector.js";
import { getRandomInt } from '../utils/random.js'

export class BattleField {
  constructor(size) {
    this.size = size - 1;
    this.sectors = [];
    return this;
  }

  buildSectors() {
    for (let lon = 0; lon <= this.size; lon++) {
      this.sectors.push([]);
      for (let lat = 0; lat <= this.size; lat++) {
        const newSector = new Sector(lon, lat);
        this.sectors[lon].push(newSector);
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
    return this.sectors[lon][lat]
  }

  moveSpaceship(unit, oldSector, newSector) {
    oldSector.removeBattleship(unit);
    newSector.addBattleship(unit);
    unit.move(newSector);
  }
}
