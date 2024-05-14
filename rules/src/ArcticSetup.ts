import { MaterialGameSetup } from '@gamepark/rules-api'
import { ArcticOptions } from './ArcticOptions'
import { ArcticRules } from './ArcticRules'
import { animalCards } from './material/AnimalCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class ArcticSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, ArcticOptions> {
  Rules = ArcticRules

  setupMaterial(_options: ArcticOptions) {
    this.setupAnimalCardsDeck()
  }

  setupAnimalCardsDeck() {
    this.material(MaterialType.AnimalCard).createItems(animalCards.map(animalCard =>
      ({ id: animalCard, location: { type: LocationType.AnimalCardsDeck } })
    ))
    this.material(MaterialType.AnimalCard).shuffle()
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}