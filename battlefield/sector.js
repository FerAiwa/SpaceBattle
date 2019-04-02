export class Sector {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    this.battleships = [];
  }

  get coordinates() {
    return { lat: this.lat, lon: this.lon };
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
