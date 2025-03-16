import {
  KJS,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { HTMLController } from '../../classes/html-controller'
import { GUIInfo } from '../common/gui-info'
import { StateMenuInterface } from './state-menu-interface'

/**
 * State to show the main menu loading screen.
 */
@SceneState()
export class StateMenuLoad extends SceneStateInterface {
  onStart() {
    // Show loading spinner
    HTMLController.showLoading('menu-load')

    // Show GUIInfo
    this.showGUI(GUIInfo, {
      context: 'The main menu is loading asynchronous data, 5 seconds fake loading.',
      seconds: 5
    })

    // 5 seconds fake loading
    this.setTimeout(() => {
      this.switchState(StateMenuInterface, {})
    }, 5000)
  }

  onEnd() {
    // Hide loading spinner on state end.
    HTMLController.hideLoading()
  }
}
