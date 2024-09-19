/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { MaterialHelpProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'

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
      <p css={spreadButtonsCss}>
      {moveLeft && (

          <PlayMoveButton move={moveLeft} onPlay={closeDialog}>
            <FontAwesomeIcon icon={faArrowLeft} />&nbsp;<Trans defaults="animal-token.left"/>
          </PlayMoveButton>
      )}
      {moveRigth && (
          <PlayMoveButton move={moveRigth} onPlay={closeDialog}>
            <Trans defaults="animal-token.right"/>&nbsp;<FontAwesomeIcon icon={faArrowRight} />
          </PlayMoveButton>
      )}
      </p>
    </>
  )
}

const spreadButtonsCss = css`
  display: flex;
  justify-content: space-between;
`

const titleCss = css`
  margin-bottom: 0.5em !important;
`