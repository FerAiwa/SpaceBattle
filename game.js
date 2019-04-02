import { BattleField } from "./battlefield/battlefield.js";
import { ShipFactory } from "./spaceships/shipFactory.js";
import { Turn } from './turn-system/turn.js';
import * as Logger from './logger/logger.js';
//
import * as View from './view.js'

export class Game {
  constructor(rules, players) {
    this.rules = rules;
    this.players = players;
    this.creationId = 0;
  }

  async play() {
    //Preparation
    const { battlefieldSize: size } = this.rules;
    this.battlefield = new BattleField(size).buildSectors();
    this.armies = this.buildPlayerArmies(this.players);
    this.armies.forEach(army => this.battlefield.populate(army));

    //Resolution
    await View.reload(this.battlefield.sectors)
    View.createPlayerCards(this.players)
    const winner = await this.simulateWar(this.players);
    Logger.victory(winner);
    console.log(this.battlefield)
  }

  async simulateWar(players) {
    let turnCounter = 0;
    let lastPlayer = null;

    while (players.length > 1) {
      turnCounter++
      const player = this.getNextPlayer(players, lastPlayer);
      Logger.showTurnIntro(turnCounter, player)

      await Turn(player, this.battlefield, this.rules.gameSpeed);

      //post-turn
      players = this.getActivePlayers(players);
      lastPlayer = player;
      await View.reload(this.battlefield.sectors);
      View.updatePlayerCards(this.players);
    }
    //last-standing player wins!
    return players[0]
  }

  getActivePlayers(current) {
    const activePlayers = current.reduce((stillActive, player) => {
      if (player.isDefeated) {
        Logger.defeat(player);
        return stillActive;
      } else return stillActive.push(player) && stillActive;
    }, []);

    return activePlayers
  }

  getNextPlayer(players, lastPlayer) {
    let lastIndex = players.findIndex(pl => pl === lastPlayer);
    return players[++lastIndex] || players[0]
  }

  //ARMY BUILDING
  buildPlayerArmies(players) {
    const armies = [];
    for (let player of players) {
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
