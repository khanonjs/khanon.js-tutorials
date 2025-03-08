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

/**
 * SceneState to play the stage.
 */
@SceneState()
export class StateStagePlay extends SceneStateInterface<{ stage: number }> {
  onStart() {
    // Show GUIInfo
    this.showGUI(GUIInfo, {
      context: `Playing stage ${this.setup.stage}.`
    })

    // Show GUIStagePlay and add all binded methods.
    this.showGUI(GUIStagePlay, {
      onRestart: this.restartStage.bind(this),
      onNext: this.nextStage.bind(this),
      onQuit: this.quitGame.bind(this),
      onFinish: this.finishGame.bind(this)
    })
  }

  onEnd() {
    // Hide GUIStagePlay on state end.
    this.hideGUI(GUIStagePlay)
  }

  /**
   * Restart same stage. Binded to the GUIStagePlay restart game button.
   */
  restartStage() {
    this.switchState(StateStageIntro, { stage: this.setup.stage })
  }

  /**
   * Go to next stage. Binded to the GUIStagePlay next game button.
   */
  nextStage() {
    this.switchState(StateStageIntro, { stage: this.setup.stage + 1 })
  }

  /**
   * Quit the game and go back to main menu. Binded to the GUIStagePlay quit game button.
   */
  quitGame() {
    KJS.switchAppState(AppStateMainMenu, {})
  }

  /**
   * Finish the game, watch the final intro. Binded to the GUIStagePlay finish game button.
   */
  finishGame() {
    KJS.switchAppState(AppStateGameOver, {})
  }
}
