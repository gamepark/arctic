import { getAnimalFromCard } from '@gamepark/arctic/material/AnimalCard'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { getRelativePlayerIndex, HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import orderBy from 'lodash/orderBy'
import { PlayerHandDescription } from './descriptions/PlayerHandDescription'
import { getPlayerPosition } from './PlayerPosition'

class PlayerHandLocator extends HandLocator {
  getMaxAngle(location: Location, context: MaterialContext): number {
    if (location.player === context.player) {
      return 20
    } else {
      return 1
    }
  }

  getLocationCoordinates(location: Location, context: MaterialContext, index: number = 0) {
    if (location.x === undefined) return this.getCoordinates(location, context)
    return super.getLocationCoordinates(location, context, index)
  }

  getRotateZ(location: Location, context: MaterialContext, index: number = 0) {
    if (location.x === undefined) return 0
    return super.getRotateZ(location, context, index)
  }

  getItemIndex(item: MaterialItem, context: ItemContext): number {
    const { player, rules, index } = context
    if (item.location.player === player) {
      const hand = rules.material(MaterialType.AnimalCard).location(LocationType.PlayerHand)
      const animals = hand.player(player)
      const sorted = orderBy(animals.getIndexes(), [
        (index) => getAnimalFromCard(animals.getItem(index)!.id),
        (index) => animals.getItem(index)!.location.x!
      ])
      return sorted.indexOf(index)
    } else {
      return item.location.x!
    }
  }

  getCoordinates(location: Location, context: MaterialContext): Coordinates {
    const index = getRelativePlayerIndex(context, location.player)
    const position = getPlayerPosition(context.rules.players.length, index)
    if (context.player && index === 0) {
      position.x -= 13
    }

    return position
  }

  locationDescription = new PlayerHandDescription()
}

export const playerHandLocator = new PlayerHandLocator()