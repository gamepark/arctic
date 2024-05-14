import { MaterialGameSetup } from '@gamepark/rules-api'
import { ArcticOptions } from './ArcticOptions'
import { ArcticRules } from './ArcticRules'
import { animalCards } from './material/AnimalCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { animals } from './material/Animal'

/**
 * This class creates a new Game based on the game options
 */
export class ArcticSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, ArcticOptions> {
  Rules = ArcticRules

  setupMaterial(_options: ArcticOptions) {
    this.setupAnimalCardsDeck()
    this.setupReserve()
    this.setupPower()
  }

  setupAnimalCardsDeck() {
    this.material(MaterialType.AnimalCard).createItems(animalCards.map(animalCard =>
      ({ id: animalCard, location: { type: LocationType.AnimalCardsDeck } })
    ))
    this.material(MaterialType.AnimalCard).shuffle()
  }

  setupReserve() {
    this.material(MaterialType.AnimalCard)
      .location(LocationType.AnimalCardsDeck)
      .sort(item => -item.location.x!)
      .limit(5 * (this.game.players.length - 1))
      .moveItems({ type: LocationType.Reserve })
  }

  setupPower() {
    this.material(MaterialType.PowerCard).createItems(animals.map(animal =>
      ({ id:animal * 10 + Math.floor(Math.random()*2), location: {type: LocationType.Powers}})
    ))
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}