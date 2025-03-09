import {
  AppState,
  AppStateInterface,
  KJS
} from '@khanonjs/engine'

import { StateIntro } from '../scenes/common/state-intro'
import { SceneGameOver } from '../scenes/game-over/scene-game-over'
import { AppStateMainMenu } from './app-state-main-menu'

/**
 * App state to show the last scene of the game.
 */
@AppState({
  scenes: [SceneGameOver]
})
export class AppStateGameOver extends AppStateInterface {
  onStart() {
    // Start SceneGameOver and launch StateIntro.
    KJS.Scene.start(SceneGameOver, StateIntro, {
      introClass: 'finish-intro',
      context: 'The game is displaying the last intro before going back to the main menu. Wait 10 seconds or skip the intro.',
      nextAppState: AppStateMainMenu
    })
  }
}
