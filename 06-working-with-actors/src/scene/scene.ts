import * as BABYLON from '@babylonjs/core'
import {
  Notification,
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { SceneCamera } from './camera'
import { Messages } from './messages'
import { SceneState2D } from './state-2d'
import { SceneState3D } from './state-3d'

@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.05)
  },
  states: [
    SceneState2D,
    SceneState3D
  ]
})
export class SceneActors extends SceneInterface {
  private light?: BABYLON.HemisphericLight

  @Notification({ id: Messages.FINISH_STAGE })
  swapState() {
    if (this.isState(SceneState2D)) {
      this.switchState(SceneState3D, {})
    } else {
      this.switchState(SceneState2D, {})
    }
  }

  onStart() {
    // Switch camera
    this.switchCamera(SceneCamera, {})
  }

  onLoaded(): void {
    // Create hemispheric light
    this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 0, 0), this.babylon.scene)
  }

  onUnload(): void {
    // Release custom created elements
    this.light?.dispose()
    this.light = undefined
  }
}
