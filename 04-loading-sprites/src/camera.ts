import * as BABYLON from '@babylonjs/core'
import {
  Camera,
  CameraInterface
} from '@khanonjs/engine'

@Camera()
export class SceneCamera extends CameraInterface {
  onInitialize(scene: BABYLON.Scene): BABYLON.TargetCamera {
    // Initialize a Babylon.js camera and return it
    const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 0, -380), scene)
    camera.target = new BABYLON.Vector3(0, 0, 1)
    camera.inputs.clear()
    return camera
  }
}
