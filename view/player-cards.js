function createPlayerCards(players) {
  const playerView = document.querySelector("section#players");
  const originalCard = document.querySelector("section#players article");
  for (let i in players) {
    const clone = originalCard.cloneNode(true);
    clone.id = "player-" + i;
    clone.querySelector("figure img").src = `./media/p${i}.png`;
    clone.querySelector("figcaption").innerText = `P${i}`;
    playerView.appendChild(clone);
    clone.style.borderColor = players[i].color;
  }
  originalCard.remove();
}

function updatePlayerCards(players) {
  const playerView = document.querySelector("section#players");

  for (let i in players) {
    //Update ship counters
    const playerCard = playerView.querySelector("#player-" + i);
    playerCard
      .querySelectorAll("span")
      .forEach((x, j) => (x.innerText = countShipTypes(players[i], j)));

    //Update portraits
    if (players[i].isDefeated) playerCard.querySelector("figure img").style.filter = "grayscale(100%)";
  }
}

function animateActivePlayer(activePlayer, players) {
  const j = players.findIndex(pl => pl.name === activePlayer.name);
  for (let i in players) {
    const playerCard = document.querySelector("#player-" + i)
    let file = i == j ? `p${i}-active` : `p${i}`
    playerCard.querySelector('figure img').src = `./media/${file}.png`;
  }
}

function countShipTypes(player, type) {
  return player.army.filter(ship => ship.type === type && ship.hp > 0).length;
}

export { createPlayerCards, updatePlayerCards, animateActivePlayer };