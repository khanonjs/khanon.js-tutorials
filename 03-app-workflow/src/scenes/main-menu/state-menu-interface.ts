import {
  KJS,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { AppStatePlayGame } from '../../app-states/app-state-play-game'
import { GUIInfo } from '../common/gui-info'
import { GUIMenuInterface } from './gui-menu-interface'

/**
 * State to show the main menu interface.
 */
@SceneState()
export class StateMenuInterface extends SceneStateInterface {
  onStart() {
    // Show GUIInfo
    this.showGUI(GUIInfo, {
      context: 'This is the main menu interface, the user can choose what to do now.'
    })

    // Show GUIMenuInterface and bind playGame method to the play game button.
    this.showGUI(GUIMenuInterface, { onPlayGame: () => this.playGame() })
  }

  onEnd() {
    // Hide GUIMenuInterface on state end.
    this.hideGUI(GUIMenuInterface)
  }

  /**
   * Play the game. This method is binded to the GUIMenuInterface play game button.
   */
  playGame() {
    KJS.switchAppState(AppStatePlayGame, {})
  }
}
