import { ArcticSetup } from '@gamepark/arctic/ArcticSetup'
import { Animal, animals } from '@gamepark/arctic/material/Animal'
import { AnimalCard } from '@gamepark/arctic/material/AnimalCard'
import { animalPile1, animalPile3 } from '@gamepark/arctic/material/AnimalSetup'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { PowerCard } from '@gamepark/arctic/material/PowerCard'
import sampleSize from 'lodash/sampleSize'


const me = 1
const opponent = 2

const myHand = [AnimalCard.OrcaPuffin1, AnimalCard.MooseFox3, AnimalCard.OrcaMoose4]
const opponentHand = [AnimalCard.OrcaBear2, AnimalCard.BearMoose2, AnimalCard.FoxBear3]
const allHands = [...myHand, ...opponentHand]

export class TutorialSetup extends ArcticSetup {

  get piles() {
    return sampleSize([animalPile1, animalPile3], this.players.length).flat()
  }

  setupReserve() {
    this.material(MaterialType.AnimalCard)
      .location(LocationType.AnimalCardsDeck)
      .sort(item => -item.location.x!)
      .id((id: AnimalCard) => !allHands.includes(id))
      .limit(5 * (this.game.players.length - 1))
      .moveItems({ type: LocationType.Reserve })
  }

  dealPlayerCards() {
    const deck = this.material(MaterialType.AnimalCard)
      .location(LocationType.AnimalCardsDeck)
      .deck()

    deck
      .id((id: AnimalCard) => myHand.includes(id))
      .deal({
        type: LocationType.PlayerHand,
        player: me
      }, 3)

    deck
      .id((id: AnimalCard) => opponentHand.includes(id))
      .deal({
        type: LocationType.PlayerHand,
        player: opponent
      }, 3)
  }

  setupTotem() {
    this.material(MaterialType.TotemTile).createItem({
      id: Animal.Moose,
      location: { type: LocationType.PlayerTotem, player: me }
    })
    this.material(MaterialType.TotemTile).createItem({
      id: Animal.Orca,
      location: { type: LocationType.PlayerTotem, player: opponent }
    })
  }

  setupPower() {
    this.material(MaterialType.PowerCard).createItems(animals.map(animal => {
      if (animal === Animal.Orca) return ({ id: PowerCard.Orca1, location: { type: LocationType.Powers } })
      if (animal === Animal.Moose) return ({ id: PowerCard.Moose1, location: { type: LocationType.Powers } })
        return ({ id: animal * 10 + Math.floor(Math.random() * 2), location: { type: LocationType.Powers } })
      }
    ))
  }
}