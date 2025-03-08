import {
  AppState,
  AppStateInterface,
  KJS
} from '@khanonjs/engine'

import { StateIntro } from '../scenes/common/state-intro'
import { SceneGameOver } from '../scenes/game-over/scene-game-over'
import { AppStateMainMenu } from './app-state-main-menu'

@AppState({
  scenes: [SceneGameOver]
})
export class AppStateGameOver extends AppStateInterface {
  onStart() {
    KJS.Scene.start(SceneGameOver, StateIntro, {
      loadingClass: 'finish-intro',
      context: 'The game is displaying the last intro before going back to the main menu. Wait 10 seconds or skip the intro.',
      nextAppState: AppStateMainMenu
    })
  }
}
