export { reload, createPlayerCards, updatePlayerCards, animateActivePlayer };

async function reload(sectors) {
  clearSectors();
  createSectors(sectors);
}

async function createSectors(sectors) {
  const bf = document.getElementById("battlefield");
  for (let lat of sectors) {
    const row = document.createElement("div");
    row.classList.toggle("bf-row");

    for (let sector of lat) {
      const viewSector = document.createElement("div");
      let id = `${sector.lat}-${sector.lon}`;
      viewSector.id = id;

      sector.battleships
        .map(ship => {
          if (ship.hp <= 0) return;
          const img = document.createElement("img");
          img.src = `./media/bs0${ship.type}.png`;
          img.style.border = `2px solid ${ship.owner.color}`;
          img.style.borderRadius = "50%";
          return img;
        })
        .forEach(img => img && viewSector.appendChild(img));
      row.appendChild(viewSector);
    }
    bf.appendChild(row);
  }
}

function clearSectors() {
  const bf = document.getElementById("battlefield");
  while (bf.firstChild) {
    bf.firstChild.remove();
  }
}

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
  //setTimeout(() => playerCard.classList.toggle('active'), 500)
}

function countShipTypes(player, type) {
  return player.army.filter(ship => ship.type === type && ship.hp > 0).length;
}
