import { css } from '@emotion/react'
import { DropAreaDescription } from '@gamepark/react-game'
import Back from '../../images/cards/animals/AnimalBack1.jpg'
import { animalCardDescription } from '../../material/AnimalCardDescription'
import { PenaltyZoneHelp } from '../help/PenaltyZoneHelp'

export class PenaltyZoneDescription extends DropAreaDescription {
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

  help = PenaltyZoneHelp

  width = animalCardDescription.width * 1.2
  height = animalCardDescription.height * 1.2
  borderRadius = animalCardDescription.borderRadius
}