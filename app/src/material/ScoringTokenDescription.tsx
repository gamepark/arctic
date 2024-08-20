import { LocationType } from '@gamepark/arctic/material/LocationType'
import { TokenDescription } from '@gamepark/react-game'

import ScoringToken from '../images/tiles/ScoringToken.jpg'
import { ScoringTokenHelp } from './help/ScoringTokenHelp'

class ScoringTokenDescription extends TokenDescription {
  width = 4
  height = 2.66
  borderRadius = 0.35

  image = ScoringToken

  staticItem = {
    location: {
      type: LocationType.Scoring
    }
  }

  help = ScoringTokenHelp
}

export const scoringTokenDescription = new ScoringTokenDescription()