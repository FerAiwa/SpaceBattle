export class Player {
  constructor(name, emoji, color) {
    //Base
    this.name = name;
    this.emoji = emoji;
    this.color = color;
    this.id = null;
    this.army = [];

    //Stats
    this.won = 0;
    this.lost = 0;
    this.highScore = 0;
  }

  get isDefeated() {
    const hasAnySpaceship = this.army.find(this.isUnitAlive);
    if (hasAnySpaceship) return false;
    return true;
  }
  get totalUnits() {
    return this.army.filter(this.isUnitAlive).length;
  }

  get armyReport() {
    return 'wololoo'
  }

  isUnitAlive(unit) {
    return unit.status === 'active';
  }
}
