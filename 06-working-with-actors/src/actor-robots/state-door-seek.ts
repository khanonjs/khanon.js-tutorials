import {
  ActorState,
  ActorStateInterface,
  SceneInterface
} from '@khanonjs/engine'

import { ActorDoorBase } from '../actor-doors/door-base'
import { ActionPointerMove } from './action-pointer-move'
import { ActorRobotBase } from './robot-base'
import { StateEnterDoor } from './state-enter-door'

@ActorState()
export class StateDoorSeek extends ActorStateInterface<{ door: ActorDoorBase }, ActorRobotBase, SceneInterface> {
  DIST_ENTER_DOOR = 0.3

  onStart() {
    // On mouse down, starts ActionPointerMove
    this.babylon.scene.onPointerDown = () => {
      this.actor.playAction(ActionPointerMove, {
        lookLeft: () => this.actor.lookLeft(),
        lookRight: () => this.actor.lookRight(),
        animationId_Idle: this.actor.animationId_Idle,
        animationId_Walk: this.actor.animationId_Walk
      })
    }

    // On mouse up, starts ActionPointerMove
    this.babylon.scene.onPointerUp = () => {
      this.actor.stopAction(ActionPointerMove)
    }
  }

  onEnd() {
    this.actor.stopAction(ActionPointerMove)
    this.babylon.scene.onPointerDown = undefined
    this.babylon.scene.onPointerUp = undefined
  }

  onLoopUpdate(delta: number) {
    const dist = Math.abs(this.actor.t.position.x - this.setup.door.t.position.x)
    if (dist < this.DIST_ENTER_DOOR) {
      this.setup.door.open()
      if (!this.actor.getAction(ActionPointerMove)?.isMoving()) {
        this.actor.switchState(StateEnterDoor, { door: this.setup.door })
      }
    } else {
      this.setup.door.close()
    }
  }
}
