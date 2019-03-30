class Player {
  constructor(name) {
    this.name = name;
    this.won = 0;
    this.lost = 0;
    this.highScore = 0;
    //Army
    this.army = [];
  }
}

class Game {
  //set players
  //set rules (n types of airships)
  //select army
  //run turn(0)
  //
}
class Army {
  constructor() {}
}

class Ship {
  constructor(name, hp, shield, shoot, type) {
    this.name = name;
    this.hp = hp;
    this.shield = shield;
    this.shoot = shoot;
    this.type = type;
  }
}

//Has the rules of limit ship types per game
//Calls the shipBuilder as many times as defined.
//Returns the army

const army = randomArmyBuilder(2, 2, 3, 1);
console.log("Army:", army);

function randomArmyBuilder(type1, type2, type3, type4) {
  const army = [];
  for (let i = 0; i < type1; i++) army.push(shipBuilder("explorers"));
  for (let i = 0; i < type2; i++) army.push(shipBuilder("hunters"));
  for (let i = 0; i < type3; i++) army.push(shipBuilder("battleships"));
  for (let i = 0; i < type4; i++) army.push(shipBuilder("destroyers"));

  return army;
}

function shipBuilder(type, name) {
  const ships = {
    explorers: ["Sting", "Rogue", "Ghost"], //MaxPoints: 8
    hunters: ["Xwing", "Tie Fighter", "Maxter"], //MaxPoints: 10
    battleships: ["Battleship"], //MaxPoints: 15
    destroyers: ["Destroyer"] //MaxPoints: 20
  };
  //Type checking (defensive)
  const shipTypes = Object.keys(ships);
  if (!type || !shipTypes.includes(type)) throw "Invalid ship type";

  //Random ship of a valid type if no name is sent.
  if (!name || !ships[type].includes(name)) {
    const max = ships[type].length - 1;
    name = ships[type][getRandomInt(max)];
  }

  //EXPLORERS //MaxPoints: 8
  if (type == "explorers") {
    switch (name) {
      case "Sting":
        return new Ship("Sting", 4, 0, 4, 0);
      case "Rogue":
        return new Ship("Rogue", 3, 0, 5, 0);
      case "Ghost":
        return new Ship("Ghost", 3, 3, 2, 0);
    }
  }
  //HUNTERS //MaxPoints: 10
  if (type == "hunters") {
    switch (name) {
      case "Xwing":
        return new Ship("Xwing", 4, 2, 4, 1);
      case "Tie Fighter":
        return new Ship("Tie Fighter", 4, 1, 5, 1);
      case "Maxter":
        return new Ship("Maxter", 3, 3, 4, 1);
    }
  }

  //BATTLESHIPS // MaxPoints: 15'
  if (type == "battleships") {
    switch (name) {
      case "Battleship":
        return new Ship("Battleship", 6, 4, 5, 2);
    }
  }

  //DESTROYER //  MaxPoints: 20;
  if (type == "destroyers") {
    switch (name) {
      case "Destroyer":
        return new Ship("Destroyer", 7, 5, 8, 3);
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
