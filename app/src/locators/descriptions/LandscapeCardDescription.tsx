import { css } from '@emotion/react'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { isMoveItem, Location, MaterialMove } from '@gamepark/rules-api'
import { landscapeCardDescription } from '../../material/LandscapeCardDescription'

export class LandscapeCardDescription extends LocationDescription {
  width = landscapeCardDescription.width
  ratio = landscapeCardDescription.ratio
  alwaysVisible = true

  extraCss = css`
    border-radius: inherit;
  `

  isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext): boolean {
    isMoveItem(move) && console.log(move.location, location, super.isMoveToLocation(move, location, context))
    return super.isMoveToLocation(move, location, context)
  }

}