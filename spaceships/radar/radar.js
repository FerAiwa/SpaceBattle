/*
 The radar allows spaceship to find enemies and allies in the sector.
*/
export class Radar {
  constructor() {
    this.sector = null;
  }

  updatePosition(newSector) {
    this.sector = newSector;
    return this;
  }

  //type: 'ally' || 'enemy'
  findTargets(type, player, shipId) {
    //type-finders
    const _isEnemyShip = (player) => (ship) => ship.owner.name !== player.name;
    const _isAllyShip = (player) => (ship) => {
      console.log('radar looking for allies')
      return shipId !== ship.id && ship.owner.name == player.name;
    };
    type = type === "enemy" ? _isEnemyShip(player) : _isAllyShip(player);

    return this.sector.battleships
      .filter(type)
      .filter(ship => ship.status === 'active');
  }
}
