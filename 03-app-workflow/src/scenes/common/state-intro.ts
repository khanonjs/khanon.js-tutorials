import {
  AppStateConstructor,
  KJS,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { HTMLController } from '../../classes/html-controller'
import { GUIInfo } from './gui-info'
import { GUIIntro } from './gui-intro'

@SceneState()
export class StateIntro extends SceneStateInterface<{ loadingClass: string, context: string, nextAppState: AppStateConstructor }> {
  private timeout: KJS.Timeout

  onStart() {
    HTMLController.showLoading(this.setup.loadingClass)
    this.showGUI(GUIInfo, {
      context: this.setup.context,
      seconds: 10
    })
    this.showGUI(GUIIntro, { onSkip: () => this.endIntro() })
    this.timeout = KJS.setTimeout(() => {
      this.endIntro()
    }, 10000)
  }

  onEnd() {
    HTMLController.hideLoading()
    KJS.clearTimeout(this.timeout)
  }

  endIntro() {
    KJS.switchAppState(this.setup.nextAppState, {})
  }
}
