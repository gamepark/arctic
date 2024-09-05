/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArcticRules } from '@gamepark/arctic/ArcticRules'
import { getAnimalFromCard } from '@gamepark/arctic/material/AnimalCard'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { ScoringHelper } from '@gamepark/arctic/rules/helper/ScoringHelper'
import { LocationHelpProps, MaterialComponent, transformCss, usePlay, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { animalCardDescription } from '../../material/AnimalCardDescription'

const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const AnimalPileScoringHelp: FC<LocationHelpProps> = (props) => {
  const { t } = useTranslation()
  const rules = useRules<ArcticRules>()!
  const play = usePlay()
  const { location } = props
  const helper = useMemo(() => new ScoringHelper(rules.game, location.player!), [location.player, rules.game])
  const isEnded = !rules.game.rule
  const groupWithScore = useMemo(() => {
    const groups = helper.optimalGroupAndScore.groups
    return groups.map((group, index) => ({
      group: group,
      score: !isEnded ? 0 : helper.getGroupScore(index, getAnimalFromCard(group[0].item.id), group.length)
    }))
  }, [helper])

  return (
    <>
      <h2 css={titleCss}>{t('animal.pile.scoring')}</h2>
      <div css={gridCss}>
        {groupWithScore.flatMap((group, groupIndex) => (
          <div key={groupIndex} css={groupCss}>
            {group.group.map((item, i) =>
              (
                <div key={i}>
                  <MaterialComponent type={MaterialType.AnimalCard} itemId={item.item.id}
                                     css={[itemCss(isEnded, group, i), item.item.location.rotation && transformCss('rotateY(180deg)')]}
                                     onClick={() => play(displayMaterialHelp(MaterialType.AnimalCard, item.item, item.index), { local: true })}/>
                </div>
              ))}
            {isEnded && <div css={scoreCss}>{group.score}</div>}
          </div>
        ))}
      </div>
    </>
  )
}

const titleCss = css`
  margin-bottom: 1em !important;
`

const gridCss = css`
  width: 50em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.5em;
`

const groupCss = css`
  border: 0.05em solid black;
  border-radius: 1em;
  position: relative;
  height: ${animalCardDescription.height + 2}em;
`

const itemCss = (isEnded: boolean, groupWithScore: any, index: number) => {
  const validArea = 49 / 3 - 2 - animalCardDescription.width
  const count = groupWithScore.group.length
  const score = groupWithScore.score
  const left = count === 1 ? 0 : (Math.min(validArea / (count - 1), 1.5) * index)
  return css`
    position: absolute;
    top: 1em;
    bottom: 1em;
    left: ${1 + left}em;

    > div > div {
      filter: grayscale(${isEnded && !score ? 1 : 0});
    }

    cursor: pointer;
  `
}

const scoreCss = css`
  position: absolute;
  right: 0.2em;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2em;
  background-color: white;
  padding: 0.1em 0.4em;
  border-radius: 2.5em;
  box-shadow: 0 0 0.1em black;
`
