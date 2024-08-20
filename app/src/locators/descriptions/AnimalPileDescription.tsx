import { css } from '@emotion/react'
import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { DropAreaDescription, LocationContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import InPile from '../../images/icons/in-pile.png'
import OnPile from '../../images/icons/on-pile.png'
import UnderPile from '../../images/icons/under-pile.png'
import { animalCardDescription } from '../../material/AnimalCardDescription'
import { AnimalPileHelp } from '../help/AnimalPileHelp'

export class AnimalPileDescription extends DropAreaDescription {
  getExtraCss(location: Location, context: LocationContext) {
    const { rules } = context
    const playerState = new PlayerState(rules.game, location.player!)
    const animalPileLength = playerState.animalPile.length
    const canPlaceCardUnderAnimalPile = playerState.canPlaceCardUnderAnimalPile
    if (canPlaceCardUnderAnimalPile && location.x !== animalPileLength) {
      return css`
        background-size: 4em 4em;
        background-image: url(${UnderPile});
        background-position: center ${animalCardDescription.height * 0.65}em;
        background-repeat: no-repeat;
      `
    }

    const canPlaceCardUnderLastAnimalInPile = playerState.canPlaceCardUnderLastAnimalInPile
    if (canPlaceCardUnderLastAnimalInPile && location.x === (animalPileLength - 1)) {
      return css`
        background-size: 4em 4em;
        background-image: url(${InPile});
        background-position: center ${animalCardDescription.height * 0.65}em;
        background-repeat: no-repeat;
      `
    }

    if (!canPlaceCardUnderLastAnimalInPile && !canPlaceCardUnderAnimalPile) {
      return css`
        background-size: 4em 4em;
        background-image: url(${OnPile});
        background-position: center center;
        background-repeat: no-repeat;
    `
    }

    return css`
      background-size: 4em 4em;
      background-image: url(${OnPile});
      background-position: center ${animalCardDescription.height * 0.2}em;
      background-repeat: no-repeat;
    `
  }

  help = AnimalPileHelp

  width = animalCardDescription.width * 1.2
  height = animalCardDescription.height * 1.2
  borderRadius = animalCardDescription.borderRadius
}