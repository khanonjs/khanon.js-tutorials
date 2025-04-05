import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  Helper,
  Mesh,
  MeshConstructor,
  MeshInterface
} from '@khanonjs/engine'

import { ActionPointerMove } from './action-pointer-move'
import { ActorRobotBase } from './robot-base'
import { StateDoorSeek } from './state-door-seek'
import { StateEnterDoor } from './state-enter-door'

@Actor({
  states: [
    StateEnterDoor,
    StateDoorSeek
  ],
  actions: [
    ActionPointerMove
  ],
  renderingGroupId: 1
})
export class ActorRobot3D extends ActorRobotBase<MeshInterface> {
  animationId_Idle = 'RobotArmature|Robot_Idle'
  animationId_Walk = 'RobotArmature|Robot_Walking'
  animationId_Jump = 'RobotArmature|Robot_Jump'

  private rotY = Math.PI
  private rotationVector = new BABYLON.Vector3(0, 0, 0)

  @Mesh({
    url: './assets/robot-3d.glb',
    animations: [
      { id: 'RobotArmature|Robot_Idle', loop: true },
      { id: 'RobotArmature|Robot_Walking', loop: true, speedRatio: 3 },
      { id: 'RobotArmature|Robot_Jump', loop: true }
    ]
  }) Body: MeshConstructor

  onSpawn(): void {
    this.setBody(this.Body)
    this.t.scaling.setAll(0.2)
    this.t.position.set(-1.5, 1, 0)
    this.body.setMaterialTransparencyMode(BABYLON.Material.MATERIAL_ALPHABLEND)
  }

  lookRight(): void {
    // Set target rotation to the right
    this.rotY = Math.PI - (Math.PI / 2)
  }

  lookLeft(): void {
    // Set target rotation to the left
    this.rotY = Math.PI + (Math.PI / 2)
  }

  onLoopUpdate(delta: number): void {
    // Rotate de actor to the desired direction
    this.rotationVector.y = Helper.Maths.increaseValueWithInertia(this.rotationVector.y, this.rotY, 0.1, 1)
    this.t.rotationQuaternion = this.rotationVector.toQuaternion()
  }
}
