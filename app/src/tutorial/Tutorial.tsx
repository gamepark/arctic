import { Animal } from '@gamepark/arctic/material/Animal'
import { AnimalCard } from '@gamepark/arctic/material/AnimalCard'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { PowerCard } from '@gamepark/arctic/material/PowerCard'
import { PlayerId } from '@gamepark/arctic/PlayerId'
import { CustomMoveType } from '@gamepark/arctic/rules/CustomMoveType'
import { linkButtonCss, MaterialTutorial, PlayMoveButton, TutorialStep } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { AnimalIcon } from '../locators/AnimalIconLocator'
import { landscapeCardDescription } from '../material/LandscapeCardDescription'
import { scoringTokenDescription } from '../material/ScoringTokenDescription'
import { TutorialSetup } from './TutorialSetup'
const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

const me = 1
const opponent = 2

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 3
  options = { players: 2 }
  setup = new TutorialSetup()

  players = [{ id: me }, { id: opponent }]

  steps: TutorialStep[] = [{
    popup: {
      text: () => (
        <Trans defaults="tuto.welcome">
          <strong/>
        </Trans>
      )
    }
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.hand">
          <strong/>
        </Trans>
      ),
      position: {
        y: -25
      }
    },
    focus: (game) => ({
      materials: [
        this.material(game, MaterialType.AnimalCard).location(LocationType.PlayerHand).player(me)
      ],
      margin: {
        top: 4
      }
    })
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.choice">
          <strong/>
        </Trans>
      ),
      position: {
        y: -25
      }
    },
    focus: (game) => ({
      materials: [
        this.material(game, MaterialType.AnimalCard).location(LocationType.PlayerHand).player(me)
      ],
      locations: [
        this.location(LocationType.AnimalPile).player(me).location
      ],
      margin: {
        top: 4,
        left: 4,
        right: 2
      }
    })
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.place">
          <strong/>
        </Trans>
      ),
      position: {
        y: -25
      }
    },
    focus: (game) => ({
      materials: [
        this.material(game, MaterialType.AnimalCard).id(AnimalCard.OrcaMoose4)
      ],
      locations: [
        this.location(LocationType.AnimalPile).player(me).location
      ],
      margin: {
        top: 4,
        left: 1,
        right: 1,
      }
    }),
    move: {
      filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move)
        && this.material(game, move.itemType).getItem(move.itemIndex)!.id === AnimalCard.OrcaMoose4
    }
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.goal">
          <strong/>
        </Trans>
      )
    }
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.powers">
          <strong/>
        </Trans>
      ),
      position: { x: -30}
    },
    focus: (game) => ({
      materials: [
        this.material(game, MaterialType.PowerCard)
      ],
      margin: {
        left: 34,
        top: 1,
        bottom: 1
      }
    })
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.power">
          <strong/>
        </Trans>
      ),
      position: {
        x: -10,
        y: -20
      },
      size: { width: 80 }
    },
    focus: (game) => ({
      materials: [
        this.material(game, MaterialType.PowerCard).id(PowerCard.Orca1),
        this.material(game, MaterialType.AnimalCard).id(AnimalCard.OrcaMoose4)
      ],
      margin: {
        top: 6,
        bottom: 2,
        left: 10,
      }
    })
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.power.orca">
          <strong/>
        </Trans>
      ),
      position: {
        y: -20
      },
      size: { width: 120 }
    },
    focus: (game) => ({
      materials: [
        this.material(game, MaterialType.PowerCard).id(PowerCard.Orca1)
      ],
      margin: {
        top: 6
      }
    })
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.animals">
          <strong/>
        </Trans>
      ),
      position: {
        y: -20
      }
    },
    focus: (game) => ({
      materials: [
        this.material(game, MaterialType.AnimalCard).id(AnimalCard.OrcaMoose4)
      ],
      locations: [
        this.location(LocationType.AnimalIcon).id(AnimalIcon.Main).parent(this.material(game, MaterialType.AnimalCard).id(AnimalCard.OrcaMoose4).getIndex()).location,
        this.location(LocationType.AnimalIcon).id(AnimalIcon.Associated).parent(this.material(game, MaterialType.AnimalCard).id(AnimalCard.OrcaMoose4).getIndex()).location
      ],
      margin: {
        top: 10,
        bottom: 3
      }
    })
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.animal.tiles">
          <strong/>
        </Trans>
      ),
      position: {
        y: -20
      }
    },
    focus: (game) => ({
      materials: [
        this.material(game, MaterialType.TotemToken)
      ],
      staticItems: landscapeCardDescription.staticItems.map((item) => ({
        type: MaterialType.LandscapeCard,
        item: item
      })),
      margin: {
        top: 10,
        bottom: 3,
        left: 1,
        right: 1
      }
    })
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.animals.totem">
          <strong/>
        </Trans>
      ),
      position: {
        y: -15
      }
    },
    focus: (game) => ({
      materials: [
        this.material(game, MaterialType.TotemTile).player(me)
      ],
      margin: {
        top: 7
      }
    })
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.moose">
          <strong/>
        </Trans>
      ),
      position: {
        y: -20
      }
    },
    focus: (game) => ({
      materials: [
        this.material(game, MaterialType.TotemToken)
      ],
      staticItems: landscapeCardDescription.staticItems.map((item) => ({
        type: MaterialType.LandscapeCard,
        item: item
      })),
      margin: {
        top: 10,
        bottom: 3,
        left: 1,
        right: 1
      }
    }),
    move: {
      filter: (move, game) => isMoveItemType(MaterialType.TotemToken)(move)
        && this.material(game, MaterialType.TotemToken).id(Animal.Moose).getIndex() === move.itemIndex
        && this.material(game, MaterialType.TotemToken).getItem(move.itemIndex)!.location.id < move.location.id
    }
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.draw-value">
          <strong/>
        </Trans>
      ),
      position: {
        y: -20
      }
    },
    focus: (game) => ({
      materials: [
        this.material(game, MaterialType.AnimalCard).id(AnimalCard.OrcaMoose4)
      ],
      locations: [
        this.location(LocationType.DrawIcon).parent(this.material(game, MaterialType.AnimalCard).id(AnimalCard.OrcaMoose4).getIndex()).location
      ],
      margin: {
        top: 10,
        bottom: 3
      }
    })
  }, {
    popup: {
      text: () => (
        <Trans defaults="tuto.river">
          <strong/>
        </Trans>
      ),
      position: { x: 30, y: 20 },
      size: { width: 70 }
    },
    focus: (game) => ({
      materials: [
        this.material(game, MaterialType.AnimalCard).location(LocationType.River),
        this.material(game, MaterialType.AnimalCard).location(LocationType.PlayerHand).player(me)
      ],
      margin: {
        top: 2,
        bottom: 2,
        right: 3,
        left: 3
      }
    }),
    move: {}
  },
    {
      move: {}
    },
    {
      move: {}
    },
    {
      move: {}
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.opponent">
            <strong/>
          </Trans>
        )
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move)
          && this.material(game, MaterialType.AnimalCard).getItem(move.itemIndex)!.id === AnimalCard.OrcaBear2
      }
    },
    { move: { player: opponent } },
    { move: { player: opponent } },
    { move: { player: opponent } },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.you">
            <strong/>
          </Trans>
        )
      }
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.deposit-value">
            <strong/>
          </Trans>
        ),
        position: { y: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(AnimalCard.OrcaMoose4)
        ],
        locations: [
          this.location(LocationType.DepositIcon).parent(this.material(game, MaterialType.AnimalCard).id(AnimalCard.OrcaMoose4).getIndex()).location
        ],
        margin: {
          top: 10,
          bottom: 2
        }
      })
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.place">
            <strong/>
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(AnimalCard.OrcaPuffin1)
        ],
        locations: [
          this.location(LocationType.AnimalPile).player(me).location
        ],
        margin: {
          top: 10,
          bottom: 2,
          left: 1,
          right: 1,
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move)
          && this.material(game, MaterialType.AnimalCard).getItem(move.itemIndex)!.id === AnimalCard.OrcaPuffin1
      }
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.placed">
            <strong/>
          </Trans>
        ),
        position: { y: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(AnimalCard.OrcaPuffin1)
        ],
        margin: {
          top: 10,
          bottom: 2
        }
      })
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.place">
            <strong/>
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(AnimalCard.MooseFox3)
        ],
        locations: [
          this.location(LocationType.AnimalPile).player(me).location
        ],
        margin: {
          top: 10,
          bottom: 2,
          left: 1,
          right: 1,
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move)
          && this.material(game, MaterialType.AnimalCard).getItem(move.itemIndex)!.id === AnimalCard.MooseFox3
      }
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.power.moose">
            <strong/>
          </Trans>
        ),
        position: {
          y: -20
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PowerCard).id(PowerCard.Moose1)
        ],
        margin: {
          top: 5,
          right: 15
        }
      })
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.move-animal">
            <strong/>
          </Trans>
        ),
        position: {
          y: -20
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.TotemToken).id((id: Animal) => id === Animal.Moose || id === Animal.Fox)
        ],
        staticItems: landscapeCardDescription.staticItems.map((item) => ({
          type: MaterialType.LandscapeCard,
          item: item
        })),
        margin: {
          top: 10,
          bottom: 3,
          left: 1,
          right: 1
        }
      })
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.move-animal.one">
            <strong/>
          </Trans>
        ),
        position: {
          y: -20
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.TotemToken).id((id: Animal) => id === Animal.Moose || id === Animal.Fox)
        ],
        staticItems: landscapeCardDescription.staticItems.map((item) => ({
          type: MaterialType.LandscapeCard,
          item: item
        })),
        margin: {
          top: 10,
          bottom: 3,
          left: 1,
          right: 1
        }
      }),
      move: {}
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.move-animal.exception">
            <strong/>
          </Trans>
        ),
        position: {
          y: -20
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.TotemToken).id((id: Animal) => id === Animal.Moose || id === Animal.Fox)
        ],
        staticItems: landscapeCardDescription.staticItems.map((item) => ({
          type: MaterialType.LandscapeCard,
          item: item
        })),
        margin: {
          top: 10,
          bottom: 3,
          left: 1,
          right: 1
        }
      })
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.draw-phase">
            <strong/>
          </Trans>
        )
      }
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.moose.draw-more">
            <strong/>
          </Trans>
        ),
        position: { y: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PowerCard).id(PowerCard.Moose1)
        ],
        margin: {
          top: 5,
          right: 15
        }
      }),
      move: {
        filter: (move) => {
          console.log(move)
          return isCustomMoveType(CustomMoveType.ModifyValue)(move) && move.data === 0
        }
      }
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.draw.cards">
            <strong/>
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).location(LocationType.River),
          this.material(game, MaterialType.AnimalCard).location(LocationType.PlayerHand).player(me)
        ],
        locations: [
          this.location(LocationType.PlayerHand).player(me).location
        ],
        margin: {
          left: 1,
          right: 1
        }
      }),
      move: {}
    },
    { move: {} },
    { move: {} },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.hand.limit">
            <strong/>
          </Trans>
        ),
        position: { y: -20},
        size: { width: 100}
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).location(LocationType.PlayerHand).player(me)
        ],
        locations: [
          this.location(LocationType.PenaltyZone).player(me).location
        ],
        margin: {
          left: 1,
          right: 1
        }
      })
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.penalty">
            <strong/>
          </Trans>
        )
      }
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.end.trigger">
            <strong/>
          </Trans>
        )
      }
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.scoring">
            <strong/>
            <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.ScoringToken, scoringTokenDescription.staticItem)} />
          </Trans>
        ),
        position: { x: 10 }
      },
      focus: () => ({
        staticItems: [{
          type: MaterialType.ScoringToken,
          item: scoringTokenDescription.staticItem
        }],
        margin: {
          right: 25
        }
      })
    }, {
      popup: {
        text: () => (
          <Trans defaults="tuto.go">
            <strong/>
          </Trans>
        )
      }
    }]
}