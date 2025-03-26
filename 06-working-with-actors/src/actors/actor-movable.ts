import * as BABYLON from '@babylonjs/core'
import {
  ActorAction,
  ActorInterface,
  Logger,
  MeshInterface,
  SpriteInterface
} from '@khanonjs/engine'

export abstract class ActorMovable<B extends SpriteInterface | MeshInterface> extends ActorInterface<B> {
  vel = 0

  // Required properties and methods from child
  abstract animationId_Idle: string
  abstract animationId_Walk: string
  abstract lookRight(): void
  abstract lookLeft(): void

  @ActorAction()
  move() {
    // Calculate actor screen coordinates: https://forum.babylonjs.com/t/world-to-screen-point/9059
    const screenActorXY = BABYLON.Vector3.Project(this.t.position,
      BABYLON.Matrix.Identity(),
      this.scene.babylon.scene.getTransformMatrix(),
      this.scene.getCamera().babylon.camera.viewport.toGlobal(
        this.scene.babylon.scene.getEngine().getRenderWidth(),
        this.scene.babylon.scene.getEngine().getRenderHeight()
      ))

    if (this.scene.babylon.scene.pointerX < screenActorXY.x - 20) {
      if (this.vel >= 0) {
        this.lookLeft()
      }
      this.vel = -0.03
    } else if (this.scene.babylon.scene.pointerX > screenActorXY.x + 20) {
      if (this.vel <= 0) {
        this.lookRight()
      }
      this.vel = 0.03
    } else {
      this.stopMoving()
    }
    this.t.position.x += this.vel
  }

  onSpawn() {
    this.scene.babylon.scene.onPointerDown = () => {
      this.playAction(this.move, {})
    }
    this.scene.babylon.scene.onPointerUp = () => {
      this.stopMoving()
      this.stopAction(this.move)
    }
  }

  onStart() {
    this.body.playAnimation(this.animationId_Idle)
  }

  setX(value: number) {
    this.t.position.x = value
  }

  onLoopUpdate(delta: number) {
    if (this.vel !== 0 && this.body.animation?.id !== this.animationId_Walk) {
      this.body.playAnimation(this.animationId_Walk)
    } else if (this.vel === 0 && this.body.animation) {
      this.stopMoving()
    }
  }

  private stopMoving() {
    this.vel = 0
    this.body.playAnimation(this.animationId_Idle)
  }
}
