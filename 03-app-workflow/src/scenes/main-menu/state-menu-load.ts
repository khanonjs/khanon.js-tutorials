import {
  KJS,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { HTMLController } from '../../classes/html-controller'
import { GUIInfo } from '../common/gui-info'
import { StateMenuInterface } from './state-menu-interface'

@SceneState()
export class StateMenuLoad extends SceneStateInterface {
  private timeout: KJS.Timeout

  onStart() {
    HTMLController.showLoading('menu-load')
    this.showGUI(GUIInfo, {
      context: 'Main Menu is loading asynchronous data, simulate 5 seconds loading.',
      seconds: 5
    })
    this.timeout = KJS.setTimeout(() => {
      this.switchState(StateMenuInterface, {})
    }, 5000)
  }

  onEnd() {
    HTMLController.hideLoading()
    KJS.clearTimeout(this.timeout)
  }
}
