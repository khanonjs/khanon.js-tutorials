import {
  Actor,
  ActorInterface,
  Mesh,
  MeshConstructor,
  MeshInterface
} from '@khanonjs/engine'

@Actor()
export class ActorRobot3D extends ActorInterface<MeshInterface> {
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
  }
}
