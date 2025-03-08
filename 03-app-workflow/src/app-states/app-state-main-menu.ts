import {
  AppState,
  AppStateInterface,
  KJS
} from '@khanonjs/engine'

import { HTMLController } from '../classes/html-controller'
import { SceneMainMenu } from '../scenes/main-menu/scene-main-menu'
import { StateMenuLoad } from '../scenes/main-menu/state-menu-load'

@AppState({
  scenes: [SceneMainMenu]
})
export class AppStateMainMenu extends AppStateInterface {
  onStart() {
    HTMLController.showLoading('game-intro')
    KJS.Scene.start(SceneMainMenu, StateMenuLoad)
  }
}
