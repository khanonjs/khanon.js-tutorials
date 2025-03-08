import {
  KJS,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { AppStateGameOver } from '../../app-states/app-state-game-over'
import { AppStateMainMenu } from '../../app-states/app-state-main-menu'
import { GUIInfo } from '../common/gui-info'
import { GUIStagePlay } from './gui-stage-play'
import { StateStageIntro } from './state-stage-intro'

@SceneState()
export class StateStagePlay extends SceneStateInterface<{ stage: number }> {
  onStart() {
    this.showGUI(GUIInfo, {
      context: `Playing stage ${this.setup.stage}.`
    })
    this.showGUI(GUIStagePlay, {
      onRestart: this.restartStage.bind(this),
      onNext: this.nextStage.bind(this),
      onQuit: this.quitGame.bind(this),
      onFinish: this.finishGame.bind(this)
    })
  }

  onEnd() {
    this.hideGUI(GUIStagePlay)
  }

  restartStage() {
    // Restart same stage
    this.switchState(StateStageIntro, { stage: this.setup.stage })
  }

  nextStage() {
    // Go to next stage
    this.switchState(StateStageIntro, { stage: this.setup.stage + 1 })
  }

  quitGame() {
    // Quit the game and go back to main menu
    KJS.switchAppState(AppStateMainMenu, {})
  }

  finishGame() {
    // Finish the game, watch the final intro
    KJS.switchAppState(AppStateGameOver, {})
  }
}
