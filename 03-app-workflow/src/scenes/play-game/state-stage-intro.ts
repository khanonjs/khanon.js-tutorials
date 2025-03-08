import {
  KJS,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { HTMLController } from '../../classes/html-controller'
import { GUIInfo } from '../common/gui-info'
import { StateStagePlay } from './state-stage-play'

/**
 * SceneState to show the stage intro screen.
 */
@SceneState()
export class StateStageIntro extends SceneStateInterface<{ stage: number }> {
  private timeout: KJS.Timeout

  onStart() {
    // Show loading spinner
    HTMLController.showLoading('stage-intro')

    // Show GUIInfo
    this.showGUI(GUIInfo, {
      context: `Stage ${this.setup.stage} is starting, 5 seconds fake loading.`,
      seconds: 5
    })

    // Wait 5 seconds before going to the stage play state
    this.timeout = KJS.setTimeout(() => {
      HTMLController.hideLoading()
      this.switchState(StateStagePlay, { stage: this.setup.stage })
    }, 5000)
  }

  onEnd() {
    // Cleat timeout on state end.
    KJS.clearTimeout(this.timeout)
  }
}
