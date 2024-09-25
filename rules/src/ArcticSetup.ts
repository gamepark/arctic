import { MaterialGameSetup } from '@gamepark/rules-api'
import sampleSize from 'lodash/sampleSize'
import shuffle from 'lodash/shuffle'
import { ArcticOptions } from './ArcticOptions'
import { ArcticRules } from './ArcticRules'
import { Animal, animals } from './material/Animal'
import { animalPile1, animalPile2, animalPile3, animalPile4 } from './material/AnimalSetup'
import { Landscape } from './material/Landscape'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class ArcticSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, ArcticOptions> {
  Rules = ArcticRules

  setupMaterial(options: ArcticOptions) {
    this.setupTotemToken()
    this.setupAnimalCardsDeck()
    this.setupReserve()
    this.setupPower(options)
    this.setupTotem()
    this.dealPlayerCards()
    this.setupRiver()
  }

  setupTotemToken() {
    this.material(MaterialType.TotemToken).createItems(animals.map(totem =>
      ({ id: totem, location: { type: LocationType.LandscapeCard, id: Landscape.Landscape3 } })
    ))
  }

  get piles() {
    return sampleSize([animalPile1, animalPile2, animalPile3, animalPile4], this.players.length).flat()
  }

  setupAnimalCardsDeck() {
    const piles = this.piles
    this.material(MaterialType.AnimalCard).createItems(piles.map(animalCard =>
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

  setupPower(options: ArcticOptions) {
    this.material(MaterialType.PowerCard).createItem({
      id: options.bear ?? Animal.Bear * 10 + Math.floor(Math.random() * 2),
      location: { type: LocationType.Powers }
    })
    this.material(MaterialType.PowerCard).createItem({
      id: options.fox ?? Animal.Fox * 10 + Math.floor(Math.random() * 2),
      location: { type: LocationType.Powers }
    })
    this.material(MaterialType.PowerCard).createItem({
      id: options.moose ?? Animal.Moose * 10 + Math.floor(Math.random() * 2),
      location: { type: LocationType.Powers }
    })
    this.material(MaterialType.PowerCard).createItem({
      id: options.orca ?? Animal.Orca * 10 + Math.floor(Math.random() * 2),
      location: { type: LocationType.Powers }
    })
    this.material(MaterialType.PowerCard).createItem({
      id: options.puffin ?? Animal.Puffin * 10 + Math.floor(Math.random() * 2),
      location: { type: LocationType.Powers }
    })
    this.material(MaterialType.PowerCard).createItem({
      id: options.walrus ?? Animal.Walrus * 10 + Math.floor(Math.random() * 2),
      location: { type: LocationType.Powers }
    })
  }

  setupTotem() {
    const shuffledTotemTiles = shuffle(animals)
    for (const player of this.game.players) {
      this.material(MaterialType.TotemTile).createItem({
        id: shuffledTotemTiles.pop(), location: { type: LocationType.PlayerTotem, player }
      })
    }
  }

  dealPlayerCards() {
    const deck = this.material(MaterialType.AnimalCard)
      .location(LocationType.AnimalCardsDeck)
      .deck()

    for (const player of this.game.players) {
      deck.deal({
        type: LocationType.PlayerHand, player
      }, 3)
    }
  }


  setupRiver() {
    this.material(MaterialType.AnimalCard)
      .location(LocationType.AnimalCardsDeck)
      .limit(6)
      .moveItems({ type: LocationType.River })
  }

  start() {
    this.startPlayerTurn(RuleId.PlayAnimalCards, this.game.players[0])
  }
}