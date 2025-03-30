import { SceneStateInterface } from '@khanonjs/engine'

import { ActorDoorBase } from '../actors-door/door-base'
import { ActorRobotBase } from '../actors-robot/robot-base'
import { StateDoorSeek } from '../actors-robot/state-door-seek'

export abstract class SceneStateBase extends SceneStateInterface {
    abstract robot: ActorRobotBase
    abstract door: ActorDoorBase
    visibility = 0

    onEnd() {
      // Release elements created by this state
      this.door.destroy()
      this.robot.destroy()
    }

    onLoopUpdate(delta: number) {
      this.door.visibility += 0.04
      this.robot.visibility += 0.04

      this.visibility += 0.04
      if (this.visibility > 1) {
        this.visibility = 1
        // Switch to robot state StateDoorSeek when visibility is 1
        this.robot.switchState(StateDoorSeek, { door: this.door })

        // Disable loopUpdate
        this.loopUpdate = false
      }
      this.door.visibility = this.visibility
      this.robot.visibility = this.visibility
    }
}
