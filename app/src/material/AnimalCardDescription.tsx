import { css } from '@emotion/react'
import { AnimalCard } from '@gamepark/arctic/material/AnimalCard'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { ScoringHelper } from '@gamepark/arctic/rules/helper/ScoringHelper'
import { CardDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { MaterialMoveBuilder, isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import Back from '../images/cards/animals/AnimalBack1.jpg'

// Import images for all animal cards
import BearFox1 from '../images/cards/animals/BearFox1.jpg'
import BearFox3 from '../images/cards/animals/BearFox3.jpg'
import BearFox4 from '../images/cards/animals/BearFox4.jpg'
import BearFox5 from '../images/cards/animals/BearFox5.jpg'
import BearMoose1 from '../images/cards/animals/BearMoose1.jpg'
import BearMoose2 from '../images/cards/animals/BearMoose2.jpg'
import BearMoose4 from '../images/cards/animals/BearMoose4.jpg'
import BearMoose5 from '../images/cards/animals/BearMoose5.jpg'
import BearOrca1 from '../images/cards/animals/BearOrca1.jpg'
import BearOrca2 from '../images/cards/animals/BearOrca2.jpg'
import BearOrca3 from '../images/cards/animals/BearOrca3.jpg'
import BearOrca4 from '../images/cards/animals/BearOrca4.jpg'
import BearPuffin2 from '../images/cards/animals/BearPuffin2.jpg'
import BearPuffin3 from '../images/cards/animals/BearPuffin3.jpg'
import BearPuffin4 from '../images/cards/animals/BearPuffin4.jpg'
import BearPuffin5 from '../images/cards/animals/BearPuffin5.jpg'
import BearWalrus1 from '../images/cards/animals/BearWalrus1.jpg'
import BearWalrus2 from '../images/cards/animals/BearWalrus2.jpg'
import BearWalrus3 from '../images/cards/animals/BearWalrus3.jpg'
import BearWalrus5 from '../images/cards/animals/BearWalrus5.jpg'
import FoxBear2 from '../images/cards/animals/FoxBear2.jpg'
import FoxBear3 from '../images/cards/animals/FoxBear3.jpg'
import FoxBear4 from '../images/cards/animals/FoxBear4.jpg'
import FoxBear5 from '../images/cards/animals/FoxBear5.jpg'
import FoxMoose1 from '../images/cards/animals/FoxMoose1.jpg'
import FoxMoose3 from '../images/cards/animals/FoxMoose3.jpg'
import FoxMoose4 from '../images/cards/animals/FoxMoose4.jpg'
import FoxMoose5 from '../images/cards/animals/FoxMoose5.jpg'
import FoxOrca1 from '../images/cards/animals/FoxOrca1.jpg'
import FoxOrca2 from '../images/cards/animals/FoxOrca2.jpg'
import FoxOrca3 from '../images/cards/animals/FoxOrca3.jpg'
import FoxOrca5 from '../images/cards/animals/FoxOrca5.jpg'
import FoxPuffin1 from '../images/cards/animals/FoxPuffin1.jpg'
import FoxPuffin2 from '../images/cards/animals/FoxPuffin2.jpg'
import FoxPuffin3 from '../images/cards/animals/FoxPuffin3.jpg'
import FoxPuffin4 from '../images/cards/animals/FoxPuffin4.jpg'
import FoxWalrus1 from '../images/cards/animals/FoxWalrus1.jpg'
import FoxWalrus2 from '../images/cards/animals/FoxWalrus2.jpg'
import FoxWalrus4 from '../images/cards/animals/FoxWalrus4.jpg'
import FoxWalrus5 from '../images/cards/animals/FoxWalrus5.jpg'
import MooseBear1 from '../images/cards/animals/MooseBear1.jpg'
import MooseBear2 from '../images/cards/animals/MooseBear2.jpg'
import MooseBear3 from '../images/cards/animals/MooseBear3.jpg'
import MooseBear4 from '../images/cards/animals/MooseBear4.jpg'
import MooseFox2 from '../images/cards/animals/MooseFox2.jpg'
import MooseFox3 from '../images/cards/animals/MooseFox3.jpg'
import MooseFox4 from '../images/cards/animals/MooseFox4.jpg'
import MooseFox5 from '../images/cards/animals/MooseFox5.jpg'
import MooseOrca1 from '../images/cards/animals/MooseOrca1.jpg'
import MooseOrca2 from '../images/cards/animals/MooseOrca2.jpg'
import MooseOrca4 from '../images/cards/animals/MooseOrca4.jpg'
import MooseOrca5 from '../images/cards/animals/MooseOrca5.jpg'
import MoosePuffin1 from '../images/cards/animals/MoosePuffin1.jpg'
import MoosePuffin2 from '../images/cards/animals/MoosePuffin2.jpg'
import MoosePuffin3 from '../images/cards/animals/MoosePuffin3.jpg'
import MoosePuffin5 from '../images/cards/animals/MoosePuffin5.jpg'
import MooseWalrus1 from '../images/cards/animals/MooseWalrus1.jpg'
import MooseWalrus3 from '../images/cards/animals/MooseWalrus3.jpg'
import MooseWalrus4 from '../images/cards/animals/MooseWalrus4.jpg'
import MooseWalrus5 from '../images/cards/animals/MooseWalrus5.jpg'
import OrcaBear1 from '../images/cards/animals/OrcaBear1.jpg'
import OrcaBear2 from '../images/cards/animals/OrcaBear2.jpg'
import OrcaBear4 from '../images/cards/animals/OrcaBear4.jpg'
import OrcaBear5 from '../images/cards/animals/OrcaBear5.jpg'
import OrcaFox1 from '../images/cards/animals/OrcaFox1.jpg'
import OrcaFox2 from '../images/cards/animals/OrcaFox2.jpg'
import OrcaFox3 from '../images/cards/animals/OrcaFox3.jpg'
import OrcaFox5 from '../images/cards/animals/OrcaFox5.jpg'
import OrcaMoose1 from '../images/cards/animals/OrcaMoose1.jpg'
import OrcaMoose2 from '../images/cards/animals/OrcaMoose2.jpg'
import OrcaMoose3 from '../images/cards/animals/OrcaMoose3.jpg'
import OrcaMoose4 from '../images/cards/animals/OrcaMoose4.jpg'
import OrcaPuffin1 from '../images/cards/animals/OrcaPuffin1.jpg'
import OrcaPuffin3 from '../images/cards/animals/OrcaPuffin3.jpg'
import OrcaPuffin4 from '../images/cards/animals/OrcaPuffin4.jpg'
import OrcaPuffin5 from '../images/cards/animals/OrcaPuffin5.jpg'
import OrcaWalrus2 from '../images/cards/animals/OrcaWalrus2.jpg'
import OrcaWalrus3 from '../images/cards/animals/OrcaWalrus3.jpg'
import OrcaWalrus4 from '../images/cards/animals/OrcaWalrus4.jpg'
import OrcaWalrus5 from '../images/cards/animals/OrcaWalrus5.jpg'
import PuffinBear1 from '../images/cards/animals/PuffinBear1.jpg'
import PuffinBear3 from '../images/cards/animals/PuffinBear3.jpg'
import PuffinBear4 from '../images/cards/animals/PuffinBear4.jpg'
import PuffinBear5 from '../images/cards/animals/PuffinBear5.jpg'
import PuffinFox1 from '../images/cards/animals/PuffinFox1.jpg'
import PuffinFox2 from '../images/cards/animals/PuffinFox2.jpg'
import PuffinFox4 from '../images/cards/animals/PuffinFox4.jpg'
import PuffinFox5 from '../images/cards/animals/PuffinFox5.jpg'
import PuffinMoose1 from '../images/cards/animals/PuffinMoose1.jpg'
import PuffinMoose2 from '../images/cards/animals/PuffinMoose2.jpg'
import PuffinMoose3 from '../images/cards/animals/PuffinMoose3.jpg'
import PuffinMoose5 from '../images/cards/animals/PuffinMoose5.jpg'
import PuffinOrca2 from '../images/cards/animals/PuffinOrca2.jpg'
import PuffinOrca3 from '../images/cards/animals/PuffinOrca3.jpg'
import PuffinOrca4 from '../images/cards/animals/PuffinOrca4.jpg'
import PuffinOrca5 from '../images/cards/animals/PuffinOrca5.jpg'
import PuffinWalrus1 from '../images/cards/animals/PuffinWalrus1.jpg'
import PuffinWalrus2 from '../images/cards/animals/PuffinWalrus2.jpg'
import PuffinWalrus3 from '../images/cards/animals/PuffinWalrus3.jpg'
import PuffinWalrus4 from '../images/cards/animals/PuffinWalrus4.jpg'
import WalrusBear1 from '../images/cards/animals/WalrusBear1.jpg'
import WalrusBear2 from '../images/cards/animals/WalrusBear2.jpg'
import WalrusBear3 from '../images/cards/animals/WalrusBear3.jpg'
import WalrusBear5 from '../images/cards/animals/WalrusBear5.jpg'
import WalrusFox1 from '../images/cards/animals/WalrusFox1.jpg'
import WalrusFox2 from '../images/cards/animals/WalrusFox2.jpg'
import WalrusFox3 from '../images/cards/animals/WalrusFox3.jpg'
import WalrusFox4 from '../images/cards/animals/WalrusFox4.jpg'
import WalrusMoose2 from '../images/cards/animals/WalrusMoose2.jpg'
import WalrusMoose3 from '../images/cards/animals/WalrusMoose3.jpg'
import WalrusMoose4 from '../images/cards/animals/WalrusMoose4.jpg'
import WalrusMoose5 from '../images/cards/animals/WalrusMoose5.jpg'
import WalrusOrca1 from '../images/cards/animals/WalrusOrca1.jpg'
import WalrusOrca3 from '../images/cards/animals/WalrusOrca3.jpg'
import WalrusOrca4 from '../images/cards/animals/WalrusOrca4.jpg'
import WalrusOrca5 from '../images/cards/animals/WalrusOrca5.jpg'
import WalrusPuffin1 from '../images/cards/animals/WalrusPuffin1.jpg'
import WalrusPuffin2 from '../images/cards/animals/WalrusPuffin2.jpg'
import WalrusPuffin4 from '../images/cards/animals/WalrusPuffin4.jpg'
import WalrusPuffin5 from '../images/cards/animals/WalrusPuffin5.jpg'
import Draw from '../images/icons/draw.jpg'
import InPile from '../images/icons/in-pile.png'
import OnPile from '../images/icons/on-pile.png'
import Play from '../images/icons/play.jpg'
import UnderPile from '../images/icons/under-pile.png'
import Penalty from '../images/icons/penalty.png'
import { AnimalCardHelp } from './help/AnimalCardHelp'

class AnimalCardDescription extends CardDescription {
  height = 8.89
  width = 6.35
  backImage = Back

  help = AnimalCardHelp

  images = {
    [AnimalCard.BearFox1]: BearFox1,
    [AnimalCard.BearFox3]: BearFox3,
    [AnimalCard.BearFox4]: BearFox4,
    [AnimalCard.BearFox5]: BearFox5,
    [AnimalCard.BearMoose1]: BearMoose1,
    [AnimalCard.BearMoose2]: BearMoose2,
    [AnimalCard.BearMoose4]: BearMoose4,
    [AnimalCard.BearMoose5]: BearMoose5,
    [AnimalCard.BearOrca1]: BearOrca1,
    [AnimalCard.BearOrca2]: BearOrca2,
    [AnimalCard.BearOrca3]: BearOrca3,
    [AnimalCard.BearOrca4]: BearOrca4,
    [AnimalCard.BearPuffin2]: BearPuffin2,
    [AnimalCard.BearPuffin3]: BearPuffin3,
    [AnimalCard.BearPuffin4]: BearPuffin4,
    [AnimalCard.BearPuffin5]: BearPuffin5,
    [AnimalCard.BearWalrus1]: BearWalrus1,
    [AnimalCard.BearWalrus2]: BearWalrus2,
    [AnimalCard.BearWalrus3]: BearWalrus3,
    [AnimalCard.BearWalrus5]: BearWalrus5,
    [AnimalCard.FoxBear2]: FoxBear2,
    [AnimalCard.FoxBear3]: FoxBear3,
    [AnimalCard.FoxBear4]: FoxBear4,
    [AnimalCard.FoxBear5]: FoxBear5,
    [AnimalCard.FoxMoose1]: FoxMoose1,
    [AnimalCard.FoxMoose3]: FoxMoose3,
    [AnimalCard.FoxMoose4]: FoxMoose4,
    [AnimalCard.FoxMoose5]: FoxMoose5,
    [AnimalCard.FoxOrca1]: FoxOrca1,
    [AnimalCard.FoxOrca2]: FoxOrca2,
    [AnimalCard.FoxOrca3]: FoxOrca3,
    [AnimalCard.FoxOrca5]: FoxOrca5,
    [AnimalCard.FoxPuffin1]: FoxPuffin1,
    [AnimalCard.FoxPuffin2]: FoxPuffin2,
    [AnimalCard.FoxPuffin3]: FoxPuffin3,
    [AnimalCard.FoxPuffin4]: FoxPuffin4,
    [AnimalCard.FoxWalrus1]: FoxWalrus1,
    [AnimalCard.FoxWalrus2]: FoxWalrus2,
    [AnimalCard.FoxWalrus4]: FoxWalrus4,
    [AnimalCard.FoxWalrus5]: FoxWalrus5,
    [AnimalCard.MooseBear1]: MooseBear1,
    [AnimalCard.MooseBear2]: MooseBear2,
    [AnimalCard.MooseBear3]: MooseBear3,
    [AnimalCard.MooseBear4]: MooseBear4,
    [AnimalCard.MooseFox2]: MooseFox2,
    [AnimalCard.MooseFox3]: MooseFox3,
    [AnimalCard.MooseFox4]: MooseFox4,
    [AnimalCard.MooseFox5]: MooseFox5,
    [AnimalCard.MooseOrca1]: MooseOrca1,
    [AnimalCard.MooseOrca2]: MooseOrca2,
    [AnimalCard.MooseOrca4]: MooseOrca4,
    [AnimalCard.MooseOrca5]: MooseOrca5,
    [AnimalCard.MoosePuffin1]: MoosePuffin1,
    [AnimalCard.MoosePuffin2]: MoosePuffin2,
    [AnimalCard.MoosePuffin3]: MoosePuffin3,
    [AnimalCard.MoosePuffin5]: MoosePuffin5,
    [AnimalCard.MooseWalrus1]: MooseWalrus1,
    [AnimalCard.MooseWalrus3]: MooseWalrus3,
    [AnimalCard.MooseWalrus4]: MooseWalrus4,
    [AnimalCard.MooseWalrus5]: MooseWalrus5,
    [AnimalCard.OrcaBear1]: OrcaBear1,
    [AnimalCard.OrcaBear2]: OrcaBear2,
    [AnimalCard.OrcaBear4]: OrcaBear4,
    [AnimalCard.OrcaBear5]: OrcaBear5,
    [AnimalCard.OrcaFox1]: OrcaFox1,
    [AnimalCard.OrcaFox2]: OrcaFox2,
    [AnimalCard.OrcaFox3]: OrcaFox3,
    [AnimalCard.OrcaFox5]: OrcaFox5,
    [AnimalCard.OrcaMoose1]: OrcaMoose1,
    [AnimalCard.OrcaMoose2]: OrcaMoose2,
    [AnimalCard.OrcaMoose3]: OrcaMoose3,
    [AnimalCard.OrcaMoose4]: OrcaMoose4,
    [AnimalCard.OrcaPuffin1]: OrcaPuffin1,
    [AnimalCard.OrcaPuffin3]: OrcaPuffin3,
    [AnimalCard.OrcaPuffin4]: OrcaPuffin4,
    [AnimalCard.OrcaPuffin5]: OrcaPuffin5,
    [AnimalCard.OrcaWalrus2]: OrcaWalrus2,
    [AnimalCard.OrcaWalrus3]: OrcaWalrus3,
    [AnimalCard.OrcaWalrus4]: OrcaWalrus4,
    [AnimalCard.OrcaWalrus5]: OrcaWalrus5,
    [AnimalCard.PuffinBear1]: PuffinBear1,
    [AnimalCard.PuffinBear3]: PuffinBear3,
    [AnimalCard.PuffinBear4]: PuffinBear4,
    [AnimalCard.PuffinBear5]: PuffinBear5,
    [AnimalCard.PuffinFox1]: PuffinFox1,
    [AnimalCard.PuffinFox2]: PuffinFox2,
    [AnimalCard.PuffinFox4]: PuffinFox4,
    [AnimalCard.PuffinFox5]: PuffinFox5,
    [AnimalCard.PuffinMoose1]: PuffinMoose1,
    [AnimalCard.PuffinMoose2]: PuffinMoose2,
    [AnimalCard.PuffinMoose3]: PuffinMoose3,
    [AnimalCard.PuffinMoose5]: PuffinMoose5,
    [AnimalCard.PuffinOrca2]: PuffinOrca2,
    [AnimalCard.PuffinOrca3]: PuffinOrca3,
    [AnimalCard.PuffinOrca4]: PuffinOrca4,
    [AnimalCard.PuffinOrca5]: PuffinOrca5,
    [AnimalCard.PuffinWalrus1]: PuffinWalrus1,
    [AnimalCard.PuffinWalrus2]: PuffinWalrus2,
    [AnimalCard.PuffinWalrus3]: PuffinWalrus3,
    [AnimalCard.PuffinWalrus4]: PuffinWalrus4,
    [AnimalCard.WalrusBear1]: WalrusBear1,
    [AnimalCard.WalrusBear2]: WalrusBear2,
    [AnimalCard.WalrusBear3]: WalrusBear3,
    [AnimalCard.WalrusBear5]: WalrusBear5,
    [AnimalCard.WalrusFox1]: WalrusFox1,
    [AnimalCard.WalrusFox2]: WalrusFox2,
    [AnimalCard.WalrusFox3]: WalrusFox3,
    [AnimalCard.WalrusFox4]: WalrusFox4,
    [AnimalCard.WalrusMoose2]: WalrusMoose2,
    [AnimalCard.WalrusMoose3]: WalrusMoose3,
    [AnimalCard.WalrusMoose4]: WalrusMoose4,
    [AnimalCard.WalrusMoose5]: WalrusMoose5,
    [AnimalCard.WalrusOrca1]: WalrusOrca1,
    [AnimalCard.WalrusOrca3]: WalrusOrca3,
    [AnimalCard.WalrusOrca4]: WalrusOrca4,
    [AnimalCard.WalrusOrca5]: WalrusOrca5,
    [AnimalCard.WalrusPuffin1]: WalrusPuffin1,
    [AnimalCard.WalrusPuffin2]: WalrusPuffin2,
    [AnimalCard.WalrusPuffin4]: WalrusPuffin4,
    [AnimalCard.WalrusPuffin5]: WalrusPuffin5,
  }

  getImages() {
    return [
      ...super.getImages(),
      Draw,
      Play,
      InPile,
      OnPile,
      UnderPile,
      Penalty,
    ]
  }

  getItemExtraCss(item: MaterialItem, context: ItemContext) {
    const { rules } = context
    if (rules.game.rule || item.location.type !== LocationType.AnimalPile) return super.getItemExtraCss(item, context)
    const helper = new ScoringHelper(rules.game, item.location.player!)
    if (helper.getGroup(item.location)?.length === 12000) return transparentCss
    return super.getItemExtraCss(item, context)
  }

  isFlipped(item: Partial<MaterialItem>, context: MaterialContext): boolean {
    return super.isFlipped(item, context) || item.location?.type === LocationType.PenaltyZone || item.location?.rotation
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    if (!isMoveItemType(MaterialType.AnimalCard)(move) || move.itemIndex !== context.index) return false
    if (move.location.type === LocationType.PenaltyZone) return true
    if (move.location.type === LocationType.AnimalPile) return true
    if (move.location.type === LocationType.PlayerHand && context.rules.material(MaterialType.AnimalCard).getItem(move.itemIndex)?.location.type !== LocationType.AnimalPile) return true
    return false
  }

  displayHelp(item: MaterialItem<number, number>, context: ItemContext) {
    if (item.location.type === LocationType.AnimalPile) return MaterialMoveBuilder.displayLocationHelp({ type: LocationType.AnimalPileScoring, player: item.location.player })
    if (item.location.type === LocationType.AnimalCardsDeck || item.location.type === LocationType.Reserve) return MaterialMoveBuilder.displayLocationHelp(item.location)
    return super.displayHelp(item, context)
}
}

const transparentCss = css`
  filter: grayscale(1);
`

export const animalCardDescription = new AnimalCardDescription()