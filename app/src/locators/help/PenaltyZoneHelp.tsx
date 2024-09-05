/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArcticRules } from '@gamepark/arctic/ArcticRules'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { LocationHelpProps, MaterialComponent, usePlay, usePlayerId, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PenaltyZoneLocation } from '../../material/help/AnimalCardHelp'
const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const PenaltyZoneHelp: FC<LocationHelpProps> = (props) => {
  const playerId = usePlayerId()
  const { t } = useTranslation()
  const play = usePlay()
  const rules = useRules<ArcticRules>()!
  const { location } = props
  const mine = location?.player && location.player === playerId
  const penalties = rules.material(MaterialType.AnimalCard).location(LocationType.PenaltyZone).player(location.player)

  if (!mine || !penalties.length) {
    return (
      <PenaltyZoneLocation
        item={{ location: { type: LocationType.PenaltyZone, player: props.location.player } }}
        itemType={MaterialType.AnimalCard}
        {...props}
      />
    )
  }

  return (
    <>

      <h2 css={titleCss}>{t('penalty-area')}</h2>
      <div css={cardGridCss}>
        {penalties.getIndexes().map((penaltyIndex) => {
          const item = penalties.getItem(penaltyIndex)!
          return (
            <MaterialComponent key={penaltyIndex} type={MaterialType.AnimalCard} itemId={item.id}
                               onClick={() => play(displayMaterialHelp(MaterialType.AnimalCard, item, penaltyIndex), { local: true })}/>
          )
        })}
      </div>
    </>
  )
}

const cardGridCss = css`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(5, 1fr);
  margin: 1em;
  
  > div {
    cursor: pointer;
  }
`

const titleCss = css`
  margin-bottom: 0.5em !important;
`