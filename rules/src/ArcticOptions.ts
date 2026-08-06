import { OptionsSpecV2 } from '@gamepark/rules-api'
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

/**
 * The option space of arctic: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 *
 * That is where the competitive settings went.
 */
export const ArcticOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 4 },
  options: {
    bear: { kind: 'enum', values: [PowerCard.Bear1, PowerCard.Bear2] },
    fox: { kind: 'enum', values: [PowerCard.Fox1, PowerCard.Fox2] },
    moose: { kind: 'enum', values: [PowerCard.Moose1, PowerCard.Moose2] },
    orca: { kind: 'enum', values: [PowerCard.Orca1, PowerCard.Orca2] },
    puffin: { kind: 'enum', values: [PowerCard.Puffin1, PowerCard.Puffin2] },
    walrus: { kind: 'enum', values: [PowerCard.Walrus1, PowerCard.Walrus2] }
  }
}
