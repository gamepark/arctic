import { getEnumValues } from '@gamepark/rules-api'

export enum Animal {
  Bear = 1,
  Fox,
  Moose,
  Orca,
  Puffin,
  Walrus
}

export const animals = getEnumValues(Animal)