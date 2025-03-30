import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  Mesh,
  MeshConstructor,
  MeshInterface
} from '@khanonjs/engine'

import { ActorDoorBase } from './door-base'

@Actor()
export class ActorDoor3D extends ActorDoorBase<MeshInterface> {
  animationId_Open = 'door|door|open|Animation Base Layer'
  animationId_Close = 'door|door|close|Animation Base Layer'

  @Mesh({
    url: './assets/red-door-3d.glb',
    animations: [
      { id: 'door|door|open|Animation Base Layer', loop: false },
      { id: 'door|door|close|Animation Base Layer', loop: false }
    ]
  }) Body: MeshConstructor

  onSpawn(): void {
    this.setBody(this.Body)
    this.t.scaling.setAll(0.7)
    this.t.position.set(1.5, 1, 0)
    this.body.playAnimation(this.animationId_Close)
    this.t.rotationQuaternion = new BABYLON.Vector3(0.05, -Math.PI / 2 + 0.3, 0).toQuaternion()
    this.t.locallyTranslate(new BABYLON.Vector3(0, 0, 0))
  }
}
