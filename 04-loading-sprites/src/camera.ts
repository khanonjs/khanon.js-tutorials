import * as BABYLON from '@babylonjs/core'
import {
  Camera,
  CameraInterface
} from '@khanonjs/engine'

@Camera()
export class SceneCamera extends CameraInterface {
  onInitialize(scene: BABYLON.Scene) {
    const camera = new BABYLON.UniversalCamera('camera intro', new BABYLON.Vector3(0, 0, -380), scene)
    camera.target = new BABYLON.Vector3(0, 0, 1)
    camera.inputs.clear()

    return camera
  }
}
