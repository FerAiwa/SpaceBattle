
export { showTurnIntro, victory, defeat }

function showTurnIntro(turnCounter, player) {
  console.log(`------------ TURN ${turnCounter}.  ${player.name} army is ready! ------------`);
  console.log(`## Spaceships: ${player.totalUnits}`)
}

function victory(player) {
  console.log(`${player.name} won the war!! Long live to ${player.name}!! {${player.emoji}}`)
}

function defeat(player) {
  console.log(`${player.name} army has been annihilated!`)
}