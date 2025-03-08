import * as BABYLON from '@babylonjs/core'
import {
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { StateMenuInterface } from './state-menu-interface'
import { StateMenuLoad } from './state-menu-load'

/**
 * Scene to show the main menu.
 */
@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.2, 0.2, 0.2)
  },
  states: [
    StateMenuLoad,
    StateMenuInterface
  ]
})
export class SceneMainMenu extends SceneInterface {}
