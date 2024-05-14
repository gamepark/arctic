import { isEnumValue } from '@gamepark/rules-api'

export enum Landscape {
  Landscape0 = 0,
  Landscape1 = 1,
  Landscape3 = 3,
  Landscape6 = 6,
  Landscape10 = 10,
  Landscape15 = 15
}

export const landscapes = Object.values(Landscape).filter(isEnumValue)
