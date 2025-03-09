import {
  AppStateConstructor,
  KJS,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { HTMLController } from '../../classes/html-controller'
import { GUIInfo } from './gui-info'
import { GUIIntro } from './gui-intro'

/**
 * SceneState to show any intro screen and skip button GUI.
 */
@SceneState()
export class StateIntro extends SceneStateInterface<{ introClass: string, context: string, nextAppState: AppStateConstructor }> {
  private timeout: KJS.Timeout

  onStart() {
    // Show loading spinner
    HTMLController.showLoading(this.setup.introClass)

    // Show GUIInfo
    this.showGUI(GUIInfo, {
      context: this.setup.context,
      seconds: 10
    })

    // Show GUIIntro and bind end intro method to skip button.
    this.showGUI(GUIIntro, { onSkip: () => this.end() })

    // Wait 10 seconds before going to the next state.
    this.timeout = KJS.setTimeout(() => {
      this.end()
    }, 10000)
  }

  onEnd() {
    // Hide loading spinner
    HTMLController.hideLoading()

    // Clear timeout
    KJS.clearTimeout(this.timeout)
  }

  /**
   * End intro. It is called from GUIIntro onSkip or after 10 seconds waiting.
   */
  end() {
    KJS.switchAppState(this.setup.nextAppState, {})
  }
}
