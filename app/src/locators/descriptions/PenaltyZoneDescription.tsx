/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { DropAreaDescription, LocationContext, shineEffect } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api/dist/material/location/Location'
import Back from '../../images/cards/animals/AnimalBack1.jpg'
import { animalCardDescription } from '../../material/AnimalCardDescription'
import { PenaltyZoneHelp } from '../help/PenaltyZoneHelp'

export class PenaltyZoneDescription extends DropAreaDescription {

  getExtraCss(location: Location, context: LocationContext) {
    if (context.rules.game.tutorial?.step === 36 && context.player === location.player) {
      return [shineEffect, emptyPenaltyZone]
    }

    return emptyPenaltyZone
  }

  help = PenaltyZoneHelp

  width = animalCardDescription.width * 1.2
  height = animalCardDescription.height * 1.2
  borderRadius = animalCardDescription.borderRadius
}

const emptyPenaltyZone =  css`
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

export const slideKeyframes = keyframes`
  0%, 30% {
    transform: translate(-33%, 33%);
  }
  70%, 100% {
    transform: translate(33%, -33%);

  }
`