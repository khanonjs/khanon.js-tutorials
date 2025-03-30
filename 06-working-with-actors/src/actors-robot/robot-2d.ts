import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

import { ActionPointerMove } from './action-pointer-move'
import { ActorRobotBase } from './robot-base'
import { StateDoorSeek } from './state-door-seek'
import { StateEnterDoor } from './state-enter-door'

@Actor({
  states: [
    StateEnterDoor,
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
  animationId_Jump = 'jump'

  private scale = 0.030

  @Sprite({
    url: './assets/robot-2d.png',
    cellWidth: 34,
    cellHeight: 34,
    samplingMode: BABYLON.Texture.NEAREST_LINEAR,
    animations: [
      { id: 'idle', delay: 90, frameStart: 0, frameEnd: 0, loop: false },
      { id: 'walk', delay: 50, frameStart: 8, frameEnd: 15, loop: true },
      { id: 'jump', delay: 35, frameStart: 16, frameEnd: 21, loop: false }
    ]
  }) Body: SpriteConstructor

  onSpawn() {
    this.setBody(this.Body)
    this.t.scale = this.scale
    this.t.position.set(-1.5, 1.4, 0)
  }

  lookRight() {
    this.t.scaleX = -this.scale
  }

  lookLeft() {
    this.t.scaleX = this.scale
  }
}
