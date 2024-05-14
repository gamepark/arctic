import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { landscapeCardDescription } from './LandscapeCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.LandscapeCard]: landscapeCardDescription
}
