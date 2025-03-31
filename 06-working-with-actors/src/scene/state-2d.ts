import { SceneState } from '@khanonjs/engine'

import { ActorDoor2D } from '../actor-doors/door-2d'
import { ActorRobot2D } from '../actor-robots/robot-2d'
import { SceneStateBase } from './state-base'

@SceneState({
  actors: [
    ActorDoor2D,
    ActorRobot2D
  ]
})
export class SceneState2D extends SceneStateBase {
  door: ActorDoor2D
  robot: ActorRobot2D
  visibility = 0

  onStart() {
    // Spawn 2D door
    this.door = this.spawn.actor(ActorDoor2D)
    this.door.visibility = this.visibility

    // Spawn 2D robot
    this.robot = this.spawn.actor(ActorRobot2D)
    this.robot.visibility = this.visibility
  }
}
