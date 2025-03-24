import * as BABYLON from '@babylonjs/core'
import {
  Mesh,
  MeshConstructor,
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { SceneCamera } from './camera'
import { MeshCactoro } from './mesh-cactoro'
import { MeshHywirl } from './mesh-hywirl'
import { ParticleFountain } from './particle-fountain'

@Scene({
  url: './assets/pretty-park.glb',
  configuration: {
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.05)
  },
  meshes: [
    MeshCactoro,
    MeshHywirl
  ],
  particles: [
    ParticleFountain
  ]
})
export class SceneMonsters extends SceneInterface {
  private light?: BABYLON.HemisphericLight
  private skybox?: BABYLON.Mesh

  @Mesh({
    url: './assets/monsters/armabee.glb',
    animations: [
      { id: 'idle', loop: true }
    ]
  }) Armabee: MeshConstructor

  onStart() {
    this.switchCamera(SceneCamera, {})

    // Fountain particles
    const particle = this.spawn.particle(ParticleFountain, {}, new BABYLON.Vector3(-0.84, 1.5, 0.55))
    particle.start()

    let positions: BABYLON.Vector3[] = []

    // Add four Armabee
    positions = [
      new BABYLON.Vector3(-3, 2 + Math.random() * 2, -1 + Math.random()),
      new BABYLON.Vector3(-1.2, 2 + Math.random() * 2, -1 + Math.random()),
      new BABYLON.Vector3(0.6, 2 + Math.random() * 2, -1 + Math.random()),
      new BABYLON.Vector3(2, 2 + Math.random() * 2, -1 + Math.random())
    ]
    this.spawn.mesh(this.Armabee, 4, (mesh, index) => {
      mesh.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)
      mesh.position = positions[index]
      mesh.lookAt(this.getCamera().position)
      this.setTimeout(() => mesh.playAnimation('idle'), Math.random() * 1000)
    })

    // Add two MeshCactoro
    positions = [
      new BABYLON.Vector3(2, 0, 0),
      new BABYLON.Vector3(3.5, 0, -1.5)
    ]
    this.spawn.mesh(MeshCactoro, 2, (mesh, index) => {
      mesh.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5)
      mesh.position = positions[index]
      mesh.lookAt(this.getCamera().position)
    })

    // Add one MeshHywirl
    const mesh = this.spawn.mesh(MeshHywirl)
    mesh.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5)
    mesh.position = new BABYLON.Vector3(-3, 0, -3)
    mesh.lookAt(this.getCamera().position)
  }

  onLoaded(): void {
    // Create hemispheric light
    this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 0, 0), this.babylon.scene)

    // Create the Skybox
    this.skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, this.babylon.scene)
    const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', this.babylon.scene)
    skyboxMaterial.backFaceCulling = false
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('./assets/sky/sky1', this.babylon.scene)
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
    this.skybox.material = skyboxMaterial
  }

  onUnload(): void {
    // Release custom created elements
    this.light?.dispose()
    this.skybox?.dispose()
    this.light = undefined
    this.skybox = undefined
  }
}
