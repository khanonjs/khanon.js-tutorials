import * as BABYLON from '@babylonjs/core'
import {
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { StateIntro } from '../common/state-intro'

/**
 * Scene to show the last movie of the game. It uses the common StateIntro state.
 */
@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.2, 0.2, 0.2)
  },
  states: [StateIntro]
})
export class SceneGameOver extends SceneInterface {}
