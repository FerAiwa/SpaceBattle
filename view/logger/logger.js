export class Logger {
  constructor(logSection) {
    this.logSection = logSection;
    this.activePlayer = null;
  }
  showTurnIntro(turnCounter, player) {
    this.activePlayer = player;
    const turnStartMsg = `----- TURN ${turnCounter}.  ${player.name} army is ready! -----`
    this.addMessage(turnStartMsg);
    this.logSection.lastChild.classList.add('logger--turn')
    this.addMessage(`${player.emoji}x ${player.totalUnits}`);
    this.logSection.lastChild.style.textAlign = 'right';
  }

  addMessage(...messages) {
    for (let msg of messages) {
      if (!msg) continue;
      const nexLogLine = document.createElement("p");
      nexLogLine.innerText = msg;
      this.logSection.appendChild(nexLogLine);
    }
  }

  moveMessage(unit) {
    const { lon, lat } = unit.radar.sector.coordinates;
    this.addMessage(`After a long travel, ${unit.name} arrived at ${lon},${lat} looking for blood!!`)
    //this.addMessage(`There is no activity in ${lon},${lat} 🛰. ${unit} is moving to other sector!`);
    this.logSection.lastChild.classList.add('logger--arrival');
  }

  cantMove(unit) {
    this.addMessage(`${unit.name} run out of gas while looking for targets`)
    this.logSection.lastChild.classList.add('logger--nomove');
  }

  healMessage(messages) {
    this.addMessage(...messages)
    this.logSection.lastChild.classList.add('logger--heal')
  }

  kill(assasin, unit) {
  }

  victory(player) {
    const victoryMsg = `${player.name} won the war!! Long live to ${player.name}!! ${player.emoji}`
    this.addMessage(victoryMsg)
    this.logSection.lastChild.classList.add('logger--victory');

  }
  defeat(player) {
    const defeatMsg = `${player.name} army has been annihilated!`
    this.addMessage(defeatMsg)
    this.logSection.lastChild.classList.add('logger--defeat');
  }

}
