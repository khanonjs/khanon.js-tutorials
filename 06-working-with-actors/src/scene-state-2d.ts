import {
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { ActorDoor2D } from './actors/actor-door-2d'
import { ActorRobot2D } from './actors/actor-robot-2d'

@SceneState({
  actors: [
    ActorDoor2D,
    ActorRobot2D
  ]
})
export class SceneState2D extends SceneStateInterface {
  robot: ActorRobot2D
  door: ActorDoor2D

  onStart() {
    // Span actors
    this.robot = this.spawn.actor(ActorRobot2D)
    this.door = this.spawn.actor(ActorDoor2D)

    // Initialize robot
    this.robot.setX(-3)

    // Initialize door
  }

  onEnd() {

  }
}
