import { BattleField } from "./battlefield/battlefield.js";
import { Logger } from '../view/logger/logger.js'
import { ShipFactory } from "./spaceships/shipFactory.js";
import { PlayerCards, SectorsView, } from "../view/index.js";
import { Turn } from "./turn-system/turn.js";

export class Game {
  constructor(rules, players) {
    this.rules = rules;
    this.players = players;
    this.creationId = 0;
    //
    const logEl = document.getElementById("logger");
    this.logger = new Logger(logEl);
  }

  async play() {
    //Preparation
    const { battlefieldSize: size } = this.rules;
    this.battlefield = new BattleField(size).buildSectors();
    this.armies = this.buildPlayerArmies(this.players);
    this.armies.forEach(army => this.battlefield.populate(army));
    console.log("Players armies are ready!", this.players);

    //View initialize
    await SectorsView.reload(this.battlefield.sectors);
    PlayerCards.createPlayerCards(this.players);
    PlayerCards.updatePlayerCards(this.players);

    //Resolution
    const winner = await this.simulateWar(this.players);
    this.logger.victory(winner);
  }

  /** Turn resolver  */
  async simulateWar(players) {
    let turnCounter = 0;
    let lastPlayer = null;

    while (players.length > 1) {
      //pre-turn setup
      turnCounter++;
      const player = this.getNextPlayer(players, lastPlayer);
      this.logger.showTurnIntro(turnCounter, player);
      PlayerCards.animateActivePlayer(player, this.players);

      //player turn
      await Turn(player, this.battlefield, this.rules.gameSpeed, this.logger);

      //post-turn
      players = this.getActivePlayers(players);
      lastPlayer = player;
      await SectorsView.reload(this.battlefield.sectors);
      PlayerCards.updatePlayerCards(this.players);
    }
    //last-standing player wins!
    return players[0];
  }

  getActivePlayers(current) {
    const activePlayers = current.reduce((stillActive, player) => {
      if (player.isDefeated) {
        this.logger.defeat(player);
        return stillActive;
      } else return stillActive.push(player) && stillActive;
    }, []);

    return activePlayers;
  }

  getNextPlayer(players, lastPlayer) {
    let lastIndex = players.findIndex(pl => pl === lastPlayer);
    return players[++lastIndex] || players[0];
  }

  //ARMY BUILDING
  buildPlayerArmies(players) {
    const armies = [];
    let _id = 0;
    for (let player of players) {
      player.id = ++_id;
      player.army = randomArmyBuilder(player, ...this.rules.typeLimit);
      player.army.forEach(ship => (ship.id = ++this.creationId));
      armies.push(player.army);
    }
    return armies;
  }
}

function randomArmyBuilder(owner, type1, type2, type3, type4) {
  const army = [];
  for (let i = 0; i < type1; i++) army.push(ShipFactory(owner, "explorers"));
  for (let i = 0; i < type2; i++) army.push(ShipFactory(owner, "hunters"));
  for (let i = 0; i < type3; i++) army.push(ShipFactory(owner, "battleships"));
  for (let i = 0; i < type4; i++) army.push(ShipFactory(owner, "destroyers"));

  return army;
}
