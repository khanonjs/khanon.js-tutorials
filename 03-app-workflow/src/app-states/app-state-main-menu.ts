import {
  AppState,
  AppStateInterface,
  KJS
} from '@khanonjs/engine'

import { HTMLController } from '../classes/html-controller'
import { SceneMainMenu } from '../scenes/main-menu/scene-main-menu'
import { StateMenuLoad } from '../scenes/main-menu/state-menu-load'

/**
 * App state to show the main menu.
 */
@AppState({
  scenes: [SceneMainMenu]
})
export class AppStateMainMenu extends AppStateInterface {
  onStart() {
    // Show loading spinner
    HTMLController.showLoading('game-intro')

    // Start SceneMainMenu and launch StateMenuLoad
    KJS.Scene.start(SceneMainMenu, StateMenuLoad)
  }
}
