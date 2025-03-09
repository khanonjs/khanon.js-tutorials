import {
  AppState,
  AppStateInterface,
  KJS
} from '@khanonjs/engine'

import { ScenePlayGame } from '../scenes/play-game/scene-play-game'
import { StateStageIntro } from '../scenes/play-game/state-stage-intro'

/**
 * App state to show the game scene.
 */
@AppState({
  scenes: [ScenePlayGame]
})
export class AppStatePlayGame extends AppStateInterface {
  onStart() {
    // Start ScenePlayGame and launch StateStageIntro.
    KJS.Scene.start(ScenePlayGame, StateStageIntro, { stage: 0 })
  }
}
