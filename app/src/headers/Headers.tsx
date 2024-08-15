/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/arctic/rules/RuleId'
import { ComponentType } from 'react'
import { BearHeader } from './BearHeader'
import { DiscardHeader } from './DiscardHeader'
import { DrawAnimalCardsHeader } from './DrawAnimalCardsHeader'
import { MoveAnimalTokensHeader } from './MoveAnimalTokensHeader'
import { PlayAnimalCardsHeader } from './PlayAnimalCardsHeader'
import { PuffinHeader } from './PuffinHeader'
import { WalrusHeader } from './WalrusHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlayAnimalCards]: PlayAnimalCardsHeader,
  [RuleId.Puffin]: PuffinHeader,
  [RuleId.MoveAnimalTokens]: MoveAnimalTokensHeader,
  [RuleId.DrawAnimalCards]: DrawAnimalCardsHeader,
  [RuleId.Bear]: BearHeader,
  [RuleId.Walrus]: WalrusHeader,
  [RuleId.DiscardCards]:  DiscardHeader
}