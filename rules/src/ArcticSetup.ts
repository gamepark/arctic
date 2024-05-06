import { MaterialGameSetup } from '@gamepark/rules-api'
import { ArcticOptions } from './ArcticOptions'
import { ArcticRules } from './ArcticRules'
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
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}