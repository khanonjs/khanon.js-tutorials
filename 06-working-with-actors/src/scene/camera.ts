import * as BABYLON from '@babylonjs/core'
import {
  Camera,
  CameraInterface
} from '@khanonjs/engine'

@Camera()
export class SceneCamera extends CameraInterface {
  onInitialize(scene: BABYLON.Scene): BABYLON.TargetCamera {
    // Create and initialize a Babylon.js camera, and return it. Khanon.js will use this camera on scene.switchCamera(SceneCamera)
    const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 4, -9), scene)
    camera.target = new BABYLON.Vector3(0, 0, 7)
    camera.inputs.clear()
    return camera
  }
}
