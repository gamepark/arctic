import { css } from '@emotion/react'
import { DropAreaDescription } from '@gamepark/react-game'
import { landscapeCardDescription } from '../../material/LandscapeCardDescription'

export class LandscapeCardDescription extends DropAreaDescription {
  width = landscapeCardDescription.width
  height = landscapeCardDescription.height

  extraCss = css`
    border-radius: inherit;
  `
}