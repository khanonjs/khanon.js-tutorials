import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  ActorInterface,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

import { ActionPointerMove } from './action-pointer-move'
import { ActorRobotBase } from './robot-base'
import { StateDoorSeek } from './state-door-seek'

@Actor({
  states: [
    StateDoorSeek
  ],
  actions: [
    ActionPointerMove
  ],
  renderingGroupId: 1
})
export class ActorRobot2D extends ActorRobotBase<SpriteInterface> {
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
      { id: 'walk', delay: 50, frameStart: 56, frameEnd: 63, loop: true },
      { id: 'jump', delay: 50, frameStart: 80, frameEnd: 85, loop: false }
    ]
  }) Body: SpriteConstructor

  onSpawn(): void {
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
