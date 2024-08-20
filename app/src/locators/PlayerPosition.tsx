export const getPlayerPosition = (players: number, index: number, isSpectator: boolean = false) => {
  if (players === 2) return getTwoPlayerPosition(index)
  if (isSpectator) return getSpectatorPlayerPosition(players, index)
  switch (computeRealIndex(players, index, false)) {
    case 0:
      return { x: 0, y: 18, z: 0 }
    case 1:
      return { x: -40, y: -25, z: 0 }
    case 2:
      return { x: 0, y: -25, z: 0 }
    default:
      return { x: 40, y: -25, z: 0 }
  }
}

const getTwoPlayerPosition = (index: number) => {
  switch (index) {
    case 0:
      return { x: 0, y: 18, z: 0 }
    default:
      return { x: 0, y: -18, z: 0 }
  }
}

const getSpectatorPlayerPosition = (players: number, index: number) => {
  switch (computeRealIndex(players, index, true)) {
    case 0:
      return { x: -30, y: 16, z: 0 }
    case 1:
      return { x: -30, y: -18, z: 0 }
    case 2:
      return { x: 30, y: -18, z: 0 }
    default:
      return { x: 30, y: 16, z: 0 }
  }
}

const computeRealIndex = (players: number, index: number, isSpectator: boolean) => {
  if (!isSpectator && players === 3 && index === 2) return 3
  return index
}