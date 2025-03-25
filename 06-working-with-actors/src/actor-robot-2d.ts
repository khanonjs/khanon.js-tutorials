import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  ActorInterface,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

@Actor()
export class ActorRobot2D extends ActorInterface<SpriteInterface> {
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
    this.setBody(this.Body)
    this.t.scale = 0.035
    this.t.position.set(1, 1.55, 0)
  }
}
