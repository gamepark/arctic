/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, usePlayerId } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const TotemTileHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const playerId = usePlayerId()
  const mine = playerId && item.location?.player === playerId
  return (
    <>
      <h2 css={titleCss}>{t('totem-tile')}</h2>
      {mine && <p>{t('totem-tile.you', { animal: t(`animal.${item.id}`) })}</p>}
      <p>{t('totem.score')}</p>
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`