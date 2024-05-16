import { isEnumValue } from '@gamepark/rules-api'

export enum TotemTile {
  Bear = 0,
  Fox = 1,
  Moose = 2,
  Orca = 3,
  Puffin = 4,
  Walrus = 5
}

export const totemTiles = Object.values(TotemTile).filter(isEnumValue)