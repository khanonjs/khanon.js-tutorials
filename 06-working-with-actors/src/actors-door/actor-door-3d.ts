import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  Logger,
  Mesh,
  MeshConstructor,
  MeshInterface
} from '@khanonjs/engine'

import { ActorDoorBase } from './actor-door-base'

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
    this.t.position.set(-4, 1, 0)
    this.t.rotation = new BABYLON.Vector3(0, 2.87, 0.07)
  }
}
