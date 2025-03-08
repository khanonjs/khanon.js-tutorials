import {
  KJS,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { AppStatePlayGame } from '../../app-states/app-state-play-game'
import { GUIInfo } from '../common/gui-info'
import { GUIMenuInterface } from './gui-menu-interface'

@SceneState()
export class StateMenuInterface extends SceneStateInterface {
  onStart() {
    this.showGUI(GUIInfo, {
      context: 'This is the Main Menu interface, the user can choose what to do now.'
    })
    this.showGUI(GUIMenuInterface, { onPlayGame: () => this.playGame() })
  }

  onEnd() {
    this.hideGUI(GUIMenuInterface)
  }

  playGame() {
    KJS.switchAppState(AppStatePlayGame, {})
  }
}
