import { css } from '@emotion/react'
import { LocationDescription } from '@gamepark/react-game'
import { landscapeCardDescription } from '../../material/LandscapeCardDescription'

export class LandscapeCardDescription extends LocationDescription {
  width = landscapeCardDescription.width
  ratio = landscapeCardDescription.ratio
  alwaysVisible = false

  extraCss = css`
    border-radius: inherit;
  `
}