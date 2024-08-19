import { css } from '@emotion/react'
import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { RuleId } from '@gamepark/arctic/rules/RuleId'
import { DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import Back from '../../images/cards/animals/AnimalBack1.jpg'
import { animalCardDescription } from '../../material/AnimalCardDescription'

export class PenaltyZoneDescription extends DropAreaDescription {
  isAlwaysVisible(location: Location, context: MaterialContext): boolean {
    const playerState = new PlayerState(context.rules.game, location.player!)
    if (context.rules.game.rule?.id === RuleId.DrawAnimalCards  && playerState.canDrawFromPenaltyCards) return true
    return playerState.penalties.length === 0
  }

  extraCss = css`
    &:before {
      content: '';
      position: absolute;
      left: ${animalCardDescription.width * 0.1}em;
      top: ${animalCardDescription.height * 0.1}em;
      opacity: 0.5;
      border-radius: ${animalCardDescription.borderRadius}em;
      height: ${animalCardDescription.height}em;
      width: ${animalCardDescription.width}em;
      background: url(${Back}) center center no-repeat;
      align-self: center;
      background-size: contain;
      background-position: center;
    }
  `

  width = animalCardDescription.width * 1.2
  height = animalCardDescription.height * 1.2
  borderRadius = animalCardDescription.borderRadius
}