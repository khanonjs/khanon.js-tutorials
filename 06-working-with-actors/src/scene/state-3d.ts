import { SceneState } from '@khanonjs/engine'

import { ActorDoor3D } from '../actors-door/door-3d'
import { ActorRobot3D } from '../actors-robot/robot-3d'
import { SceneStateBase } from './state-base'

@SceneState({
  actors: [
    ActorDoor3D,
    ActorRobot3D
  ]
})
export class SceneState3D extends SceneStateBase {
  door: ActorDoor3D
  robot: ActorRobot3D
  visibility = 0

  onStart() {
    // Spawn 3D door
    this.door = this.spawn.actor(ActorDoor3D)
    this.door.visibility = this.visibility

    // Spawn 3D robot
    this.robot = this.spawn.actor(ActorRobot3D)
    this.robot.visibility = this.visibility
  }
}
