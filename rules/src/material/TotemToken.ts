import { isEnumValue } from '@gamepark/rules-api'

export enum TotemToken {
    Bear = 1,
    Fox = 2,
    Moose = 3,
    Orca = 4,
    Puffin = 5,
    Walrus = 6,
}

export const totemToken = Object.values(TotemToken).filter(isEnumValue)