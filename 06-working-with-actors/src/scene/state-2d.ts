import {
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { ActorDoor2D } from '../actors-door/actor-door-2d'
import { ActorRobot2D } from '../actors-robot/robot-2d'
import { StateDoorSeek } from '../actors-robot/state-door-seek'

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
    // Spawn robot and door
    this.door = this.spawn.actor(ActorDoor2D)
    this.robot = this.spawn.actor(ActorRobot2D)

    // Go to robot StateDoorSeek
    this.robot.switchState(StateDoorSeek, { door: this.door })
  }

  onEnd() {

  }
}
