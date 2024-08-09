export const getPlayerPosition = (_players: number, index: number) => {
  // TODO: handle 2 players
  switch (index) {
    case 0:
      return { x: 0, y: 19, z: 0 }
    case 1:
      return { x: -30, y: -25, z: 0 }
    case 2:
      return { x: 0, y: -25, z: 0 }
    default:
      return { x: 30, y: -25, z: 0 }
  }
}