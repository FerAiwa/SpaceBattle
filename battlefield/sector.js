export class Sector {
  constructor(lon, lat) {
    this.lon = lon;
    this.lat = lat;
    this.battleships = [];
  }

  get coordinates() {
    return { lon: this.lon, lat: this.lat };
  }

  addBattleship(battleship) {
    this.battleships.push(battleship);
  }

  removeBattleship(battleship) {
    const i = this.battleships.findIndex(bs => bs.id == battleship.id);
    if (i == -1) throw "Couldn´t find battleship";
    this.battleships.splice(i, 1);
  }

}
