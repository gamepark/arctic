/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArcticRules } from '@gamepark/arctic/ArcticRules'
import { Animal } from '@gamepark/arctic/material/Animal'
import { PlayerId } from '@gamepark/arctic/PlayerId'
import { ScoringHelper } from '@gamepark/arctic/rules/helper/ScoringHelper'
import { ScoringDescription } from '@gamepark/react-client'
import { Trans } from 'react-i18next'

enum ScoringKeys {
  BearSeries = 1,
  FoxSeries,
  MooseSeries,
  OrcaSeries,
  PuffinSeries,
  WalrusSeries,
  DifferentAnimal,
  Forest,
  Penalties,
  Total
}

export class ArcticScoringDescription implements ScoringDescription<PlayerId, ArcticRules, ScoringKeys> {
  getScoringKeys() {
    return [
      ScoringKeys.BearSeries,
      ScoringKeys.FoxSeries,
      ScoringKeys.MooseSeries,
      ScoringKeys.OrcaSeries,
      ScoringKeys.PuffinSeries,
      ScoringKeys.WalrusSeries,
      ScoringKeys.DifferentAnimal,
      ScoringKeys.Forest,
      ScoringKeys.Penalties,
      ScoringKeys.Total,
    ]
  }

  getScoringHeader(key: ScoringKeys) {
    switch (key) {
      case ScoringKeys.BearSeries:
        return <Trans defaults="scoring.series.bear"/>
      case ScoringKeys.FoxSeries:
        return <Trans defaults="scoring.series.fox"/>
      case ScoringKeys.MooseSeries:
        return <Trans defaults="scoring.series.moose"/>
      case ScoringKeys.OrcaSeries:
        return <Trans defaults="scoring.series.orca"/>
      case ScoringKeys.PuffinSeries:
        return <Trans defaults="scoring.series.puffin"/>
      case ScoringKeys.WalrusSeries:
        return <Trans defaults="scoring.series.walrus"/>
      case ScoringKeys.DifferentAnimal:
        return <Trans defaults="scoring.different-animal"/>
      case ScoringKeys.Forest:
        return <Trans defaults="scoring.forest"/>
      case ScoringKeys.Penalties:
        return <Trans defaults="scoring.penalties"/>
      case ScoringKeys.Total:
        return <div css={bold}><Trans defaults="scoring.total"/></div>
    }
  }

  getScoringPlayerData(key: ScoringKeys, player: PlayerId, rules: ArcticRules) {
    const helper = new ScoringHelper(rules.game, player)
    switch (key) {
      case ScoringKeys.BearSeries:
        return helper.getAnimalScore(Animal.Bear)
      case ScoringKeys.FoxSeries:
        return helper.getAnimalScore(Animal.Fox)
      case ScoringKeys.MooseSeries:
        return helper.getAnimalScore(Animal.Moose)
      case ScoringKeys.OrcaSeries:
        return helper.getAnimalScore(Animal.Orca)
      case ScoringKeys.PuffinSeries:
        return helper.getAnimalScore(Animal.Puffin)
      case ScoringKeys.WalrusSeries:
        return helper.getAnimalScore(Animal.Walrus)
      case ScoringKeys.DifferentAnimal:
        return helper.differentAnimals
      case ScoringKeys.Forest:
        return helper.forestScore
      case ScoringKeys.Penalties:
        return -helper.penalties
      case ScoringKeys.Total:
        return helper.score
    }
  }
}

const bold = css`
  font-weight: bold;
`