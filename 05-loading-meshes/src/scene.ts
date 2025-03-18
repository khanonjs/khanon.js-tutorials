import * as BABYLON from '@babylonjs/core'
import {
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { SceneCamera } from './camera'

@Scene({
  url: './assets/pretty-park.glb',
  configuration: {
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.05)
  }
})
export class SceneBusStop extends SceneInterface {
  private light: BABYLON.HemisphericLight | undefined

  onStart() {
    this.switchCamera(SceneCamera, {})
  }

  onLoaded(): void {
    this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 0, 0), this.babylon.scene)

    // Skybox
    const skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, this.babylon.scene)
    const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', this.babylon.scene)
    skyboxMaterial.backFaceCulling = false
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('./assets/sky/sky1', this.babylon.scene)
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
    skybox.material = skyboxMaterial
  }

  onUnload(): void {
    this.light?.dispose()
    this.light = undefined
  }
}
