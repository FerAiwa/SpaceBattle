import { Spaceship } from "./spaceship.js";
import { Vitalis } from "./vitalis.js";
import { getRandomInt } from '../utils/random.js'



export function ShipFactory(owner, type, name) {
  const ships = {
    explorers: ["Sting", "Rogue", "Ghost", "Vitalis"],
    hunters: ["Xwing", "Tie Fighter", "Blaxter", "Renovatio I"],
    battleships: ["Battleship"],
    destroyers: ["Destroyer"]
  };

  //Type checking (defensive)
  const shipTypes = Object.keys(ships);
  if (!type || !shipTypes.includes(type)) throw "Invalid Spaceship type";

  //Uses random spaceship name of a type, if no name is sent to the factory.
  if (!name || !ships[type].includes(name)) {
    const max = ships[type].length;
    name = ships[type][getRandomInt(max)];
  }

  //This can be split in more complex behavior, but for now...
  const allySelector = { type: "ally" };

  //EXPLORERS //MaxPoints: 8
  if (type == "explorers") {
    switch (name) {
      case "Sting":
        return new Spaceship("Sting", 4, 0, 4, 0, owner);
      case "Rogue":
        return new Spaceship("Rogue", 3, 0, 5, 0, owner);
      case "Ghost":
        return new Spaceship("Ghost", 3, 3, 2, 0, owner);
      case "Vitalis":
        return new Vitalis(owner);
      //return new Spaceship("Vitalis", 3, 2, -3, 0, owner, allySelector);
    }
  }
  //HUNTERS //MaxPoints: 10
  if (type == "hunters") {
    switch (name) {
      case "Xwing":
        return new Spaceship("Xwing", 4, 2, 4, 1, owner);
      case "Tie Fighter":
        return new Spaceship("Tie Fighter", 4, 1, 5, 1, owner);
      case "Blaxter":
        return new Spaceship("Maxter", 3, 3, 4, 1, owner);
      case "Renovatio I":
        return new Spaceship("Renovatio I", 4, 2, -4, 1, owner, allySelector);
    }
  }

  //BATTLESHIPS // MaxPoints: 15'
  if (type == "battleships") {
    switch (name) {
      case "Battleship":
        return new Spaceship("Battleship", 6, 4, 5, 2, owner);
    }
  }

  //DESTROYER //  MaxPoints: 20;
  if (type == "destroyers") {
    switch (name) {
      case "Destroyer":
        return new Spaceship("Destroyer", 7, 5, 8, 3, owner);
    }
  }
}