/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { MaterialHelpProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const TotemTokenHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item, itemIndex, closeDialog } = props
  const moveLeft = useLegalMove((move) =>
    isMoveItemType(MaterialType.TotemToken)(move)
    && move.location.type === LocationType.LandscapeCard && move.location.id < item.location?.id
    && move.itemIndex === itemIndex
  )
  const moveRigth = useLegalMove((move) =>
    isMoveItemType(MaterialType.TotemToken)(move)
    && move.location.type === LocationType.LandscapeCard && move.location.id > item.location?.id
    && move.itemIndex === itemIndex
  )
  return (
    <>
      <h2 css={titleCss}>{t('animal-token')}</h2>
      <p>{t('totem.score')}</p>
      {moveLeft && (
        <p>

          <PlayMoveButton move={moveLeft} onPlay={closeDialog}>
            <Trans defaults="animal-token.left"/>
          </PlayMoveButton>
        </p>
      )}
      {moveRigth && (
        <p>
          <PlayMoveButton move={moveRigth} onPlay={closeDialog}>
            <Trans defaults="animal-token.right"/>
          </PlayMoveButton>
        </p>
      )}
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`