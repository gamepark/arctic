import { css } from '@emotion/react'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { getRelativePlayerIndex, LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import InPile from '../../images/icons/in-pile.png'
import OnPile from '../../images/icons/on-pile.png'
import UnderPile from '../../images/icons/under-pile.png'
import { animalCardDescription } from '../../material/AnimalCardDescription'
import { getPlayerPosition } from '../PlayerPosition'

export class AnimalPileDescription extends LocationDescription {
  getLocations(context: MaterialContext): Location[] {
    if (!context.player) return []
    const { rules } = context
    const playerState = new PlayerState(rules.game, context.player)
    const animalPileLength = playerState.animalPile.length
    const locations: Location[] = []
    if (animalPileLength && playerState.canPlaceCardUnderAnimalPile) {
      locations.push(
        { type: LocationType.AnimalPile, player: context.player, x: 0 }
      )
    } else if (animalPileLength && playerState.canPlaceCardUnderLastAnimalInPile) {
      locations.push(
        { type: LocationType.AnimalPile, player: context.player, x: animalPileLength - 1 }
      )
    }

    locations.push(
      { type: LocationType.AnimalPile, player: context.player, x: animalPileLength }
    )

    return locations
  }

  getExtraCss(location: Location, context: LocationContext) {
    const { rules } = context
    const playerState = new PlayerState(rules.game, location.player!)
    const animalPileLength = playerState.animalPile.length
    const canPlaceCardUnderAnimalPile = playerState.canPlaceCardUnderAnimalPile
    if (canPlaceCardUnderAnimalPile && location.x !== animalPileLength) {
      return css`
        background-size: 2em 2em;
        background: url(${UnderPile}) center ${animalCardDescription.height * 0.65}em no-repeat;
      `
    }

    const canPlaceCardUnderLastAnimalInPile = playerState.canPlaceCardUnderLastAnimalInPile
    if (canPlaceCardUnderLastAnimalInPile && location.x !== animalPileLength) {
      return css`
        background-size: 2em 2em;
        background: url(${InPile}) center ${animalCardDescription.height * 0.65}em no-repeat;
      `
    }

    if (!canPlaceCardUnderLastAnimalInPile && !canPlaceCardUnderAnimalPile) {
      return css`
      background-size: 2em 2em;
      background: url(${OnPile}) center center no-repeat;
    `
    }

    return css`
      background-size: 2em 2em;
      background: url(${OnPile}) center ${animalCardDescription.height * 0.2}em no-repeat;
    `
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { rules } = context
    const playerState = new PlayerState(rules.game, location.player!)
    const animalPileLength = playerState.animalPile.length
    const coordinates = this.getPileCoordinates(location, context)

    if (playerState.canPlaceCardUnderAnimalPile || playerState.canPlaceCardUnderLastAnimalInPile) {
      if (location.x === animalPileLength) {
        return {
          ...coordinates,
          y: coordinates.y - (animalCardDescription.height / 2 + 1),
          z: 5
        }
      } else {
        return {
          ...coordinates,
          y: coordinates.y + (animalCardDescription.height / 2 + 1),
          z: 0
        }
      }
    }

    return {
      ...coordinates,
      z: 5
    }
  }

  getPileCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    const position = getPlayerPosition(context.rules.players.length, index)
    if (context.player && index === 0) {
      position.x += animalCardDescription.width * 2.2
    } else {
      position.x += animalCardDescription.width + 1.5
    }
    return position
  }


  width = animalCardDescription.width * 1.2
  height = animalCardDescription.height * 1.2
  borderRadius = animalCardDescription.borderRadius
}