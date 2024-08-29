/** @jsxImportSource @emotion/react */
import { ArcticOptionsSpec } from '@gamepark/arctic/ArcticOptions'
import { ArcticRules } from '@gamepark/arctic/ArcticRules'
import { ArcticSetup } from '@gamepark/arctic/ArcticSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { arcticAnimations } from './animations/ArcticAnimations'
import App from './App'
import Forest from './images/background.jpg'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { ArcticScoringDescription } from './scoring/ArcticScoringDescription'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="arctic"
      Rules={ArcticRules}
      optionsSpec={ArcticOptionsSpec}
      GameSetup={ArcticSetup}
      material={Material}
      locators={Locators}
      animations={arcticAnimations}
      scoring={new ArcticScoringDescription()}
      tutorial={new Tutorial()}
      theme={{
        root: {
          background: {
            image: Forest,
            overlay: 'rgba(0, 0, 0, 0.3)'
          }
        },
      }}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
