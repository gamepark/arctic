/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArcticRules } from '@gamepark/arctic/ArcticRules'
import { Animal } from '@gamepark/arctic/material/Animal'
import { getAnimalFromCard, getAssociatedAnimalFromCard, getDepositValue, getDrawValue } from '@gamepark/arctic/material/AnimalCard'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { MaterialHelpProps, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Draw from '../../images/icons/draw.jpg'
import Place from '../../images/icons/play.jpg'
import Bear from '../../images/tokens/BearToken.png'
import Fox from '../../images/tokens/FoxToken.png'
import Moose from '../../images/tokens/MooseToken.png'
import Orca from '../../images/tokens/OrcaToken.png'
import Puffin from '../../images/tokens/PuffinToken.png'
import Walrus from '../../images/tokens/WalrusToken.png'

export const AnimalCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props

  return (
    <>
      {item.location?.type !== LocationType.PenaltyZone && (
        <>
          <h2 css={titleCss}>{t('animal.card')}</h2>
          {item.id !== undefined && <VisibleAnimalCardHelp {...props} />}
          {!item.location?.rotation && <AnimalCardLocation {...props} />}
        </>
      )}
      {item.location?.type === LocationType.PenaltyZone && (
        <PenaltyZoneLocation {...props} />
      )}
    </>
  )
}

const VisibleAnimalCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const mainAnimal = getAnimalFromCard(item.id)
  const associatedAnimal = getAssociatedAnimalFromCard(item.id)
  const name = usePlayerName(item.location?.player)
  const playerId = usePlayerId()
  const mine = item.location?.player && item.location.player === playerId

  if (item.location?.rotation && item.location.type === LocationType.AnimalPile) {
    return (
      <>
        <div css={visibleCardCss}>
          <div css={textAndIconCss}>
            <div>
              <div css={[tokenImageCss(Place), grayScale]}/>
            </div>
            <div>
              {t('animal.place-value', { number: 1 })}<br/>
              <span css={helpCss}><Trans defaults="animal.place-value.help"><strong/></Trans></span>
            </div>
          </div>
        </div>
        <p>
          <Trans defaults={mine ? 'animal.pile.you.hidden' : 'animal.pile.player.hidden'} values={{ player: name }}>
            <strong/>
          </Trans>
        </p>
      </>
    )
  }

  return (
    <div css={visibleCardCss}>
      <div css={textAndIconCss}>
        <div>
          <div css={tokenImageCss(AnimalTokenImages[mainAnimal])}/>
        </div>
        <div>{t('animal.main', { animal: t(`animal.${mainAnimal}`) })}</div>
      </div>
      <div css={textAndIconCss}>
        <div>
          <div css={tokenImageCss(AnimalTokenImages[associatedAnimal])}/>
        </div>
        <div>{t('animal.other', { animal: t(`animal.${associatedAnimal}`) })}</div>
      </div>
      <div css={textAndIconCss}>
        <div>
          <div css={[tokenImageCss(Draw), grayScale]}/>
        </div>
        <div>
          {t('animal.draw-value', { number: getDrawValue(item.id) })}<br/>
          <span css={helpCss}><Trans defaults="animal.draw-value.help"><strong/></Trans></span>
        </div>
      </div>
      <div css={textAndIconCss}>
        <div>
          <div css={[tokenImageCss(Place), grayScale]}/>
        </div>
        <div>
          {t('animal.place-value', { number: getDepositValue(item.id) })}<br/>
          <span css={helpCss}><Trans defaults="animal.place-value.help"><strong/></Trans></span>
        </div>
      </div>
    </div>
  )
}

const AnimalCardLocation: FC<MaterialHelpProps> = (props) => {
  //const { t } = useTranslation()
  const { item } = props
  const location = item.location
  const name = usePlayerName(location?.player)
  const playerId = usePlayerId()
  if (!location) return null
  const mine = item.location?.player && item.location.player === playerId
  return (
    <div css={locationCss}>
      {location.type === LocationType.PlayerHand && <Trans defaults={mine ? 'animal.hand.you' : 'animal.hand.player'} values={{ player: name }}/>}
      {location.type === LocationType.AnimalPile && <PileLocation {...props} />}
    </div>
  )
}

const PileLocation: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const location = item.location!
  const name = usePlayerName(location?.player)
  const rules = useRules<ArcticRules>()!
  const playerId = usePlayerId()
  const mine = item.location?.player && item.location.player === playerId
  const pileLength = rules.material(MaterialType.AnimalCard).location(LocationType.AnimalPile).player(location.player).length
  const isTopCard = (pileLength - 1 === location.x)
  return (
    <>
      {!isTopCard && <Trans defaults={mine ? 'animal.pile.you' : 'animal.pile.player'} values={{ player: name }}/>}
      {isTopCard && <Trans defaults={mine ? 'animal.pile.top.you' : 'animal.pile.top.player'} values={{ player: name }}/>}
    </>
  )
}

export const PenaltyZoneLocation: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const location = item.location!
  const name = usePlayerName(location?.player)
  const rules = useRules<ArcticRules>()!
  const playerId = usePlayerId()
  const mine = item.location?.player && item.location.player === playerId
  const penaltyLength = rules.material(MaterialType.AnimalCard).location(LocationType.PenaltyZone).player(location.player).length

  return (
    <>
      <h2 css={titleCss}>{t('penalty-area')}</h2>
      <Trans defaults={mine ? 'penalty-area.you' : 'penalty-area.player'} values={{ player: name, number: penaltyLength }}/>
      <p>{t('penalty-area.help')}</p>
    </>
  )
}

const AnimalTokenImages = {
  [Animal.Fox]: Fox,
  [Animal.Bear]: Bear,
  [Animal.Orca]: Orca,
  [Animal.Moose]: Moose,
  [Animal.Puffin]: Puffin,
  [Animal.Walrus]: Walrus
}

const visibleCardCss = css`
  margin-top: 1em;
`

const textAndIconCss = css`
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
`

const tokenImageCss = (image: string) => css`
  height: 2em;
  width: 2em;
  margin-right: 0.5em;
  background-image: url(${image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border-radius: 5em;
`

const grayScale = css`
  filter: grayscale(100%);
`

const helpCss = css`
  font-size: 0.8em;
  font-style: italic;
`

const titleCss = css`
  margin-bottom: 0.5em !important;
`

const locationCss = css`
  margin-top: 1em;
`