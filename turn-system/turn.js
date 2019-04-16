import { SectorsView, UnitView } from "../view/index.js";

export async function Turn(player, battlefield, gamespeed, logger) {
  const { army } = player;
  let lastLon = null;
  let lastLat = null;

  for (let unit of army) {
    if (unit.status === 'destroyed') continue;
    const { lon, lat } = unit.radar.sector.coordinates
    await delayAction(unit, battlefield, gamespeed, player);
    SectorsView.resetActiveSector(lastLon, lastLat)
    SectorsView.toggleActiveSector(lon, lat);
    lastLon = lon;
    lastLat = lat;
  }
  return

  async function delayAction(unit, battlefield, gamespeed, player) {
    return new Promise(resolve => setTimeout(() => {
      UnitView.selectUnit(unit, player)
      resolve(action(unit, battlefield, player))
    },
      gamespeed * 1000));
    //Future implementation: Click vs time-based turn
    return new Promise(resolve => window.addEventListener("click", function myClickListener() {
      selectUnit(unit)
      window.removeEventListener("click", myClickListener)
      resolve(action(unit, battlefield))
    }))
  }

  /** MOVE until the unit finds a valid target OR runs out of movement points.
   * Then calls the resulting action
   */
  function action(unit, battlefield, player) {
    let movepointsLeft = unit.movement;
    let newSector;
    do {
      //Look for targets
      const target = hasValidTarget(unit);
      if (target) {
        if (movepointsLeft !== unit.movement) logger.moveMessage(unit)
        return performAction(unit, target, player)
      }
      else {
        //Calculate a new sector
        newSector = battlefield.getRandomSector();
        const { lon, lat } = unit.radar.sector.coordinates
        if (isSameSector(lon, lat, newSector)) continue;
        //Move 
        battlefield.moveSpaceship(unit, unit.radar.sector, newSector);
        movepointsLeft--;
      }
    }
    while (movepointsLeft);
    //No targets and run off movement points
    return logger.cantMove(unit);
  }

  /** Gives control to the ship, and calls logger for result printing.
  * Attack || Restore Shield
  */
  function performAction(unit, target, player) {
    const actionLogs = [...unit.fire(target)]
    UnitView.selectUnit(target, player)
    if (isAHealingShip(unit)) return logger.healMessage(actionLogs);
    return logger.addMessage(...actionLogs)
  }


  function hasValidTarget(unit) {
    const targets = unit.findTargets();
    const target = unit.lockTarget(targets);
    return target
  }
  function isAHealingShip(unit) {
    return ['Renovatio I', 'Vitalis'].includes(unit.name)
  }

  function isSameSector(lon, lat, newSector) {
    return lat == newSector.coordinates.lat && lon == newSector.coordinates.lon
  }
}