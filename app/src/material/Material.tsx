import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { animalCardDescription } from './AnimalCardDescription'
import { landscapeCardDescription } from './LandscapeCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.LandscapeCard]: landscapeCardDescription,
  [MaterialType.AnimalCard]: animalCardDescription
}
