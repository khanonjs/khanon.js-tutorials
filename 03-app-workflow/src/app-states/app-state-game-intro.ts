import {
  AppState,
  AppStateInterface,
  KJS
} from '@khanonjs/engine'

import { StateIntro } from '../scenes/common/state-intro'
import { SceneGameIntro } from '../scenes/game-intro/scene-game-intro'
import { AppStateMainMenu } from './app-state-main-menu'

/**
 * App state to show the first scene of the game.
 */
@AppState({
  scenes: [SceneGameIntro]
})
export class AppStateGameIntro extends AppStateInterface {
  onStart() {
    // Start SceneGameIntro and launch StateIntro.
    KJS.Scene.start(SceneGameIntro, StateIntro, {
      introClass: 'game-intro',
      context: 'The game is displaying the first intro before going to the main menu. Wait 10 seconds or skip the intro.',
      nextAppState: AppStateMainMenu
    })
  }
}
