import * as BABYLON from '@babylonjs/core'
import {
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { StateOne } from './state-one'
import { StateTwo } from './state-two'

@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.3, 0.3, 0.3)
  },
  states: [
    StateOne,
    StateTwo
  ]
})
export class SceneTest extends SceneInterface {}
