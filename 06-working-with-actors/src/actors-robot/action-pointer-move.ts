import * as BABYLON from '@babylonjs/core'
import {
  ActorAction,
  ActorActionInterface
} from '@khanonjs/engine'

@ActorAction()
export class ActionPointerMove extends ActorActionInterface<{
  // Setup object
  lookLeft: () => void,
  lookRight: () => void,
  animationId_Idle: string,
  animationId_Walk: string
}> {
  private vel = 0

  onPlay() {
    // Play idle animation when the action starts
    this.actor.body.playAnimation(this.setup.animationId_Idle)
  }

  onStop() {
    // Stop moving when action stops
    this.stopMoving()
  }

  onLoopUpdate(delta: number) {
    // Calculate actor screen coordinates: https://forum.babylonjs.com/t/world-to-screen-point/9059
    const screenActorXY = BABYLON.Vector3.Project(this.actor.t.position,
      BABYLON.Matrix.Identity(),
      this.babylon.scene.getTransformMatrix(),
      this.scene.getCamera().babylon.camera.viewport.toGlobal(
        this.babylon.scene.getEngine().getRenderWidth(),
        this.babylon.scene.getEngine().getRenderHeight()
      ))

    if (this.babylon.scene.pointerX < screenActorXY.x - 20) {
      // If the mouse pointer is in the left side, vel is negative and set actor to look left
      if (this.vel >= 0) {
        this.setup.lookLeft()
      }
      this.vel = -0.03
    } else if (this.babylon.scene.pointerX > screenActorXY.x + 20) {
      // If the mouse pointer is in the right side, vel is positive and set actor to look right
      if (this.vel <= 0) {
        this.setup.lookRight()
      }
      this.vel = 0.03
    } else {
      // If the pointer is in the middle, stop moving
      this.stopMoving()
    }
    this.actor.t.position.x += this.vel
    if (this.vel !== 0 && this.actor.body.animation?.id !== this.setup.animationId_Walk) {
      // If the actor is moving and the animation is not walk, play walk animation
      this.actor.body.playAnimation(this.setup.animationId_Walk)
    }
  }

  private stopMoving() {
    // Stop velocity and play animation idle
    this.vel = 0
    this.actor.body.playAnimation(this.setup.animationId_Idle)
  }
}
