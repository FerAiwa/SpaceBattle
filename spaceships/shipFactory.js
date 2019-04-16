import { Spaceship } from "./spaceship.js";
import { Medicalship } from "./medicalship.js";
import { getRandomInt } from '../utils/random.js'



export function ShipFactory(owner, type, name) {
  const ships = {
    explorers: ["Sting", "Rogue", "Ghost", "Vitalis"],
    hunters: ["Xwing", "Tie Fighter", "Blaxter", "Renovatio I"],
    battleships: ["Battleship", 'Serenity'],
    destroyers: ["Destroyer", "Deathwing"]
  };

  //Type checking (defensive)
  const shipTypes = Object.keys(ships);
  if (!type || !shipTypes.includes(type)) throw "Invalid Spaceship type";

  //Uses random spaceship name of a type, if no name is given.
  if (!name || !ships[type].includes(name)) {
    const max = ships[type].length;
    name = ships[type][getRandomInt(max)];
  }

  //This can be split in more complex behavior, but for now...
  const allySelector = { type: "ally" };


  //EXPLORERS //MaxPoints: 10    || Movement: 1-4
  //Explorers are either fast units with low combat stats or supportive ships.
  if (type == "explorers") {
    switch (name) {
      //-------------TYPE  NAME  HP  SHIELD  POWER MOVEMENT TYPE ----------------------------
      case "Sting":
        return new Spaceship("Sting", 2, 0, 5, 3, 0, owner);
      case "Rogue":
        return new Spaceship("Rogue", 3, 1, 2, 4, 0, owner);
      case "Ghost":
        return new Spaceship("Ghost", 3, 0, 2, 5, 0, owner);
      case "Vitalis":
        return new Medicalship('Vitalis', 2, 3, 3, 2, 0, owner);
    }
  }
  //HUNTERS //MaxPoints: 15   || Movement 1-4
  //Hunters got special ability to lock in low HP enemies.
  if (type == "hunters") {
    switch (name) {
      case "Xwing":
        return new Spaceship("Xwing", 3, 3, 5, 4, 1, owner);
      case "Tie Fighter":
        return new Spaceship("Tie Fighter", 4, 2, 6, 3, 1, owner);
      case "Blaxter":
        return new Spaceship("Maxter", 4, 3, 4, 4, 1, owner);
      case "Renovatio I":
        return new Medicalship("Renovatio I", 4, 5, 4, 2, 1, owner);
    }
  }

  //BATTLESHIPS // MaxPoints: 20' || Movement 1-3
  //Strong combat, average speed.
  if (type == "battleships") {
    switch (name) {
      case "Battleship":
        return new Spaceship("Battleship", 6, 4, 8, 2, 2, owner);
      case "Serenity":
        return new Spaceship("Serenity", 5, 5, 6, 4, 2, owner)
    }
  }

  //DESTROYER //  MaxPoints: 25;  || Movement 1-2
  //Deadly spaceships with huge ammount of combat stats but slow movement.
  if (type == "destroyers") {
    switch (name) {
      case "Destroyer":
        return new Spaceship("Destroyer", 7, 5, 10, 3, 3, owner);
      case "Deathwing":
        return new Spaceship("Deathwing", 10, 0, 13, 2, 3, owner);
    }
  }
}