/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/arctic/rules/RuleId'
import { ComponentType } from 'react'
import { PlayAnimalCardsHeader } from './PlayAnimalCardsHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlayAnimalCards]: PlayAnimalCardsHeader
}