export async function Turn(player, battlefield, speed) {
  const { army } = player;

  for (let unit of army) {
    if (unit.status === 'destroyed') continue;
    await actionTimer(unit, battlefield, speed);
  }
  return

  //-------------------------------------------------------------------------------------------------
  async function actionTimer(unit, battlefield, speed) {
    return new Promise(resolve => setTimeout(() => { resolve(action(unit, battlefield)) }, speed * 1000));
  }

  function action(unit, battlefield) {
    const targets = unit.findTargets();

    if (targets.length == 0) {
      //MOVE if there are no targets
      const { lat, lon } = unit.radar.sector.coordinates;
      console.log(`There is no activity in ${lat},${lon} 🛰. ${unit.name} is moving to other sector!`);
      let newSector;
      do {
        newSector = battlefield.getRandomSector();
      }
      while (lat == newSector.coordinates.lat && lon == newSector.coordinates.lon);

      battlefield.moveSpaceship(unit, unit.radar.sector, newSector)
      return
    }
    //ATTACK if targets
    const target = unit.lockTarget(targets);
    unit.fire(target);
  }


}