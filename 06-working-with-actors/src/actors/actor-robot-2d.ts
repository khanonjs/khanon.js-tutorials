import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

import { ActorMovable } from './actor-movable'

@Actor({
  renderingGroupId: 1
})
export class ActorRobot2D extends ActorMovable<SpriteInterface> {
  animationId_Idle = 'idle'
  animationId_Walk = 'walk'
  private scale = 0.030

  @Sprite({
    url: './assets/robot-2d.png',
    cellWidth: 34,
    cellHeight: 34,
    samplingMode: BABYLON.Texture.NEAREST_LINEAR,
    animations: [
      { id: 'idle', delay: 90, frameStart: 48, frameEnd: 48, loop: false },
      { id: 'walk', delay: 90, frameStart: 56, frameEnd: 63, loop: true },
      { id: 'jump', delay: 90, frameStart: 80, frameEnd: 85, loop: false }
    ]
  }) Body: SpriteConstructor

  onSpawn(): void {
    super.onSpawn()
    this.setBody(this.Body)
    this.t.scale = this.scale
    this.t.position.set(1, 1.50, 0)
  }

  lookRight(): void {
    this.t.scaleX = -this.scale
  }

  lookLeft(): void {
    this.t.scaleX = this.scale
  }
}
