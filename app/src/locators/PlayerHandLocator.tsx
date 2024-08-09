import { getAnimalFromCard } from '@gamepark/arctic/material/AnimalCard'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { getRelativePlayerIndex, HandLocator, ItemContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { playerHandDescription } from './descriptions/PlayerHandDescription'
import orderBy from 'lodash/orderBy'

class PlayerHandLocator extends HandLocator {
    getCoordinates(location: Location, context: ItemContext): Coordinates {
        const coordinates = this.locationDescription.getHandCoordinates(location, context)
        if (context.player && location.player === context.player) {
            coordinates.y -= 1
        }
        return coordinates
    }

    getMaxAngle(item: MaterialItem, context: ItemContext): number {
        if (item.location.player === context.player) {
            return 20
        }
        else {
            return 1
        }
    }

    getRotateZ(item: MaterialItem, context: ItemContext): number {
        const index = getRelativePlayerIndex(context, item.location.player);
        if (index === 1 || index === 2 || index === 3) {
            return -super.getRotateZ(item, context);
        }
        return super.getRotateZ(item, context);
    }

    getItemIndex(item: MaterialItem, context: ItemContext): number {
        const { player, rules, index } = context
        if (item.location.player === player) {
            const hand = rules.material(MaterialType.AnimalCard).location(LocationType.PlayerHand)
            const animals = hand.player(player)
            const sorted = orderBy(animals.getIndexes(), [
                (index) => getAnimalFromCard(animals.getItem(index)!.id),
                (index) => animals.getItem(index)!.location.x!,
            ])
            return sorted.indexOf(index)
        } else {
            return item.location.x!
        }
    }

    locationDescription = playerHandDescription

}

export const playerHandLocator = new PlayerHandLocator()