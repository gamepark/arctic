/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/arctic/rules/RuleId'
import { ComponentType } from 'react'
import { PlayerTurnHeader } from './PlayerTurnHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlayAnimalCards]: PlayerTurnHeader
}