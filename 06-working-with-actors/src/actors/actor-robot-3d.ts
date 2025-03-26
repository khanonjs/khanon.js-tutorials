import {
  Actor,
  Mesh,
  MeshConstructor,
  MeshInterface
} from '@khanonjs/engine'

import { ActorMovable } from './actor-movable'

@Actor()
export class ActorRobot3D extends ActorMovable<MeshInterface> {
  animationId_Idle = 'RobotArmature|Robot_Idle'
  animationId_Walk = 'RobotArmature|Robot_Walking'

  @Mesh({
    url: './assets/robot-3d.glb',
    animations: [
      { id: 'RobotArmature|Robot_Idle', loop: true },
      { id: 'RobotArmature|Robot_Jump', loop: true },
      { id: 'RobotArmature|Robot_Running', loop: true },
      { id: 'RobotArmature|Robot_Walking', loop: true }
    ]
  }) Body: MeshConstructor

  onSpawn(): void {
    this.setBody(this.Body)
    this.t.scaling.setAll(0.2)
    this.t.position.set(0, 1, 0)
  }

  lookRight(): void {

  }

  lookLeft(): void {

  }
}
