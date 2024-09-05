/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const PowerCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const playerId = usePlayerId()
  const onwedByMe = playerId && item.location?.player === playerId
  const ownedByOther = item.location?.player && item.location.player !== playerId
  const notMine = !playerId || item.location?.player !== playerId
  const name = usePlayerName(item.location?.player)

  return (
    <>
      <h2 css={titleCss}>{t('power-card')}</h2>
      {onwedByMe && <p>{t('power-card.you')}</p>}
      {ownedByOther && <p>{t('power-card.player', { player: name })}</p>}
      {notMine && <p>{t('power-card.help')}</p>}
      <p>
        <Trans defaults={`power.${item.id}`}>
          <strong/><i/>
        </Trans>
      </p>
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`