//VIEW (unit selection)
function selectUnit(unit, selectingPlayer) {
  console.log(unit)
  const { id, owner } = unit;
  const unitImage = document.getElementById('ship' + id);
  console.log(id, owner.name)
  unitImage.style.borderColor = 'red';
  unitImage.style.opacity = 1;
  if (owner.id === selectingPlayer.id) {
    unitImage.style.borderColor = 'red'
    return unitImage.classList.add('unit--selected');
  }
  if (unit.hp === 0) return unitImage.classList.add('unit--dead');
  return unitImage.classList.toggle('unit--damaged')
}

export { selectUnit };