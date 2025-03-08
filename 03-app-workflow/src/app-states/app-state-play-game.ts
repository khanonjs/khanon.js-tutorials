import {
  AppState,
  AppStateInterface,
  KJS
} from '@khanonjs/engine'

import { ScenePlayGame } from '../scenes/play-game/scene-play-game'
import { StateStageIntro } from '../scenes/play-game/state-stage-intro'

@AppState({
  scenes: [ScenePlayGame]
})
export class AppStatePlayGame extends AppStateInterface {
  onStart() {
    KJS.Scene.start(ScenePlayGame, StateStageIntro, { stage: 0 })
  }
}
