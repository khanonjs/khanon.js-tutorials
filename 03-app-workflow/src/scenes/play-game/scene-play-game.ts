import * as BABYLON from '@babylonjs/core'
import {
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { StateStageIntro } from './state-stage-intro'
import { StateStagePlay } from './state-stage-play'

/**
 * Scene to render the ingame scene.
 */
@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.2, 0.2, 0.2)
  },
  states: [
    StateStageIntro,
    StateStagePlay
  ]
})
export class ScenePlayGame extends SceneInterface {}
