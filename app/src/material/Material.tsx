import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { animalCardDescription } from './AnimalCardDescription'
import { landscapeCardDescription } from './LandscapeCardDescription'
import { powerCardDescription } from './PowerCardDescription'
import { totemTileDescription } from './TotemTileDescription'
import { totemTokenDescription } from './TotemTokenDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.LandscapeCard]: landscapeCardDescription,
  [MaterialType.AnimalCard]: animalCardDescription,
  [MaterialType.PowerCard]: powerCardDescription,
  [MaterialType.TotemTile]: totemTileDescription,
  [MaterialType.TotemToken]: totemTokenDescription,
}
