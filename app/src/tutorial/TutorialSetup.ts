import { ArcticSetup } from '@gamepark/arctic/ArcticSetup'
import { Animal, animals } from '@gamepark/arctic/material/Animal'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import sample from 'lodash/sample'


const me = 1
const opponent = 2

export class TutorialSetup extends ArcticSetup {

  setupTotem() {
    this.material(MaterialType.TotemTile).createItem({
      id: Animal.Moose,
      location: { type: LocationType.PlayerTotem, player: me }
    })
    this.material(MaterialType.TotemTile).createItem({
      id: sample(animals.filter((id) => id !== Animal.Moose)),
      location: { type: LocationType.PlayerTotem, player: opponent }
    })
  }
}