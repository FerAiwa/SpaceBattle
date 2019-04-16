
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
      let id = `${sector.lon}-${sector.lat}`;
      viewSector.id = id;

      sector.battleships
        .map(ship => {
          if (ship.hp <= 0) return;
          const img = document.createElement("img");
          img.src = `./media/bs0${ship.type}.png`;
          img.id = 'ship' + ship.id;
          img.style.filter = getPlayerHue(ship.owner.id);
          img.style.borderStyle = 'solid';
          img.style.borderWidth = "2px"
          img.style.borderColor = "transparent";
          //img.style.opacity = .55;
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

function toggleActiveSector(lon, lat) {
  const sector = document.getElementById(`${lon}-${lat}`);
  return sector.classList.toggle('sector-active')
}

function resetActiveSector(lon, lat) {
  if (lon !== null && lat !== null) {
    const sector = document.getElementById(`${lon}-${lat}`);
    return sector.classList.toggle('sector-active')
  }
}

function getPlayerHue(id) {
  switch (id) {
    case 2: return 'hue-rotate(150deg)' //darkgreen
    case 3: return 'hue-rotate(-125deg)' //darkblue
    default: return 'hue-rotate(0deg)' //red
  }
}

export { reload, createSectors, clearSectors, toggleActiveSector, resetActiveSector };