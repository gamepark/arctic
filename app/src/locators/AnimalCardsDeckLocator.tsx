import { DeckLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { DeckHelp } from './help/DeckHelp'

class AnimalCardsDeckLocator extends DeckLocator {
  coordinates = { x: -30, y: 4, z: 0 }
  delta = { x: 0.03, y: -0.03 }

  getCoordinates(_location: Location, context: MaterialContext) {
    if (context.player || context.rules.players.length === 2) return this.coordinates
    return {
      ...this.coordinates,
      x: this.coordinates.x + 5
    }

  }

  locationDescription = new AnimalDeckDescription()
}

class AnimalDeckDescription extends LocationDescription {
  height = 1
  width = 1
  help = DeckHelp
}

export const animalCardsDeckLocator = new AnimalCardsDeckLocator()