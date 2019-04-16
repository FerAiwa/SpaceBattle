import { Game } from "./game.js";
import { Player } from "./player.js";

const PLAYERS = [
  new Player("BOSer", "🚀", "red", 0, 0, 0),
  new Player("Alliens", "👽", "darkgreen", 0, 0, 0),
  new Player("Space Monkeys", "🐒", "darkblue", 0, 0, 0)
];
const RULES = {
  typeLimit: [5, 3, 2, 1],
  battlefieldSize: 4, //2x2
  gameSpeed: 1 //seconds
};

export const Main = (() => {
  let players = PLAYERS;
  const game = new Game(RULES, players);
  game.play();
  //show player scores
  //play again? y/n
})();
