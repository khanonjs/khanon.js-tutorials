import {
  ActorInterface,
  ActorState,
  ActorStateInterface,
  Logger
} from '@khanonjs/engine'

import { ActorDoorBase } from '../actors-door/actor-door-base'
import { ActionPointerMove } from './action-pointer-move'
import { ActorRobotBase } from './robot-base'

@ActorState()
export class StateDoorSeek extends ActorStateInterface<{ door: ActorDoorBase<any> }, any, ActorRobotBase<any>> {
  DIST_ENTER_DOOR = 0.3

  onStart() {
    // On mouse down, starts ActionPointerMove
    this.babylon.scene.onPointerDown = () => {
      this.actor.playAction(ActionPointerMove, {
        lookLeft: () => this.actor.lookLeft(),
        lookRight: () => this.actor.lookRight(),
        animationId_Idle: 'idle',
        animationId_Walk: 'walk'
      })
    }

    // On mouse up, starts ActionPointerMove
    this.babylon.scene.onPointerUp = () => {
      this.actor.stopAction(ActionPointerMove)
    }
  }

  onEnd(): void {
    this.babylon.scene.onPointerDown = undefined
    this.babylon.scene.onPointerUp = undefined
  }

  onLoopUpdate(delta: number): void {
    const dist = Math.abs(this.actor.t.position.x - this.setup.door.t.position.x)
    if (dist < this.DIST_ENTER_DOOR) {
      this.setup.door.open()
    } else {
      this.setup.door.close()
    }
    Logger.trace('aki dist', dist)
  }
}
