import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  ActorInterface,
  Logger,
  Mesh,
  MeshConstructor,
  MeshInterface
} from '@khanonjs/engine'

@Actor()
export class ActorDoor3D extends ActorInterface<MeshInterface> {
  @Mesh({
    url: './assets/red-door-3d.glb',
    animations: [
      { id: 'open-and-close', loop: false }
    ]
  }) Body: MeshConstructor

  onSpawn(): void {
    this.setBody(this.Body)
    this.t.scaling.setAll(0.7)
    this.t.position.set(-4, 1, 0)
    this.t.rotation = new BABYLON.Vector3(0, 2.87, 0.07)
  }
}
