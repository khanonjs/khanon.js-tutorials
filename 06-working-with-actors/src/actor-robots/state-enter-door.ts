import {
  ActorState,
  ActorStateInterface,
  KJS,
  SceneInterface
} from '@khanonjs/engine'

import { ActorDoorBase } from '../actor-doors/door-base'
import { Messages } from '../scene/messages'
import { ActorRobotBase } from './robot-base'

@ActorState()
export class StateEnterDoor extends ActorStateInterface<{ door: ActorDoorBase }, ActorRobotBase, SceneInterface> {
  onStart() {
    this.actor.t.position.x = this.setup.door.t.position.x
    this.actor.body.playAnimation(this.actor.animationId_Jump)
  }

  onLoopUpdate(delta: number) {
    if (this.actor.visibility > 0) {
      this.actor.visibility -= 0.04
    } else {
      this.setup.door.visibility -= 0.04
      if (this.setup.door.visibility <= 0) {
        // Stop onLoopUpdate callback
        this.loopUpdate = false

        // Send FINISH_STAGE notification to any element that has defined it.
        KJS.Notify.send(Messages.FINISH_STAGE)
      }
    }
  }
}
