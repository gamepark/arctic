import { Option, OptionsSpec } from '@gamepark/rules-api'
import { Animal } from './material/Animal'
import { PowerCard } from './material/PowerCard'

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type ArcticOptions = {
  players: number
  bear: PowerCard.Bear1 | PowerCard.Bear2
  fox: PowerCard.Fox1 | PowerCard.Fox2
  moose: PowerCard.Moose1 | PowerCard.Moose2
  orca: PowerCard.Orca1 | PowerCard.Orca2
  puffin: PowerCard.Puffin1 | PowerCard.Puffin2
  walrus: PowerCard.Walrus1 | PowerCard.Walrus2
}

const powerValueSpec = (power: PowerCard): Option => ({
  label: t => t('power.number', { number: power % 10 + 1 }),
  help: t => t(`power.${power}`)
})

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const ArcticOptionsSpec: OptionsSpec<ArcticOptions> = {
  bear: {
    label: t => t(`power.animal.${Animal.Bear}`),
    values: [PowerCard.Bear1, PowerCard.Bear2],
    valueSpec: powerValueSpec,
    competitiveDisabled: true
  },
  fox: {
    label: t => t(`power.animal.${Animal.Fox}`),
    values: [PowerCard.Fox1, PowerCard.Fox2],
    valueSpec: powerValueSpec,
    competitiveDisabled: true
  },
  moose: {
    label: t => t(`power.animal.${Animal.Moose}`),
    values: [PowerCard.Moose1, PowerCard.Moose2],
    valueSpec: powerValueSpec,
    competitiveDisabled: true
  },
  orca: {
    label: t => t(`power.animal.${Animal.Orca}`),
    values: [PowerCard.Orca1, PowerCard.Orca2],
    valueSpec: powerValueSpec,
    competitiveDisabled: true
  },
  puffin: {
    label: t => t(`power.animal.${Animal.Puffin}`),
    values: [PowerCard.Puffin1, PowerCard.Puffin2],
    valueSpec: powerValueSpec,
    competitiveDisabled: true
  },
  walrus: {
    label: t => t(`power.animal.${Animal.Walrus}`),
    values: [PowerCard.Walrus1, PowerCard.Walrus2],
    valueSpec: powerValueSpec,
    competitiveDisabled: true
  }
}
