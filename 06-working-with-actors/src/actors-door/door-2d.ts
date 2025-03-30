import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

import { ActorDoorBase } from './door-base'

@Actor()
export class ActorDoor2D extends ActorDoorBase<SpriteInterface> {
  animationId_Open = 'open'
  animationId_Close = 'close'

  @Sprite({
    url: './assets/red-door-2d.png',
    cellWidth: 32,
    cellHeight: 32,
    samplingMode: BABYLON.Texture.NEAREST_LINEAR,
    animations: [
      { id: 'idle', delay: 90, frameStart: 0, frameEnd: 0, loop: false },
      { id: 'open', delay: 90, frameStart: 0, frameEnd: 4, loop: false },
      { id: 'close', delay: 90, frameStart: 4, frameEnd: 8, loop: false }
    ]
  }) Body: SpriteConstructor

  onSpawn(): void {
    this.setBody(this.Body)
    this.t.scale = 0.05
    this.t.position.set(1.5, 1.7, 0)
  }
}
