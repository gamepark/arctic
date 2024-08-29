/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArcticRules } from '@gamepark/arctic/ArcticRules'
import { PowerCard } from '@gamepark/arctic/material/PowerCard'
import { CustomMoveType } from '@gamepark/arctic/rules/CustomMoveType'
import { RuleId } from '@gamepark/arctic/rules/RuleId'
import { MaterialHelpProps, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const PowerCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const rules = useRules<ArcticRules>()!
  const { item, closeDialog } = props
  const playerId = usePlayerId()
  const onwedByMe = playerId && item.location?.player === playerId
  const ownedByOther = item.location?.player && item.location.player !== playerId
  const notMine = !playerId || item.location?.player !== playerId
  const name = usePlayerName(item.location?.player)
  const isMoose = item.id === PowerCard.Moose1 || item.id === PowerCard.Moose2

  const increaseValue = useLegalMove((move) => isCustomMoveType(CustomMoveType.ModifyValue)(move) && move.data === 1)
  const decreaseValue = useLegalMove((move) => isCustomMoveType(CustomMoveType.ModifyValue)(move) && move.data === -1)

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
      {isMoose && <p>{t('power.moose.help')}</p>}
      {increaseValue && (
        <p>
          <PlayMoveButton move={increaseValue} onPlay={closeDialog}>
            <Trans defaults={rules.game.rule?.id === RuleId.PlayAnimalCards? 'power.place.more': 'power.draw.more'} />
          </PlayMoveButton>
        </p>
      )}
      {decreaseValue && (
        <p>
          <PlayMoveButton move={decreaseValue} onPlay={closeDialog}>
            <Trans defaults={rules.game.rule?.id === RuleId.PlayAnimalCards? 'power.place.less': 'power.draw.less'} />
          </PlayMoveButton>
        </p>
      )}
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`