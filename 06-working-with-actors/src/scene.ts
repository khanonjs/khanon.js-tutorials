import * as BABYLON from '@babylonjs/core'
import {
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { ActorDoor2D } from './actor-door-2d'
import { ActorDoor3D } from './actor-door-3d'
import { ActorRobot2D } from './actor-robot-2d'
import { ActorRobot3D } from './actor-robot-3d'
import { SceneCamera } from './camera'

@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.05)
  },
  actors: [
    ActorDoor2D,
    ActorDoor3D,
    ActorRobot2D,
    ActorRobot3D
  ]
})
export class SceneActors extends SceneInterface {
  private light?: BABYLON.HemisphericLight

  onStart() {
    // Switch camera
    this.switchCamera(SceneCamera, {})

    // Spawn both actors
    this.spawn.actor(ActorDoor2D)
    this.spawn.actor(ActorDoor3D)
    this.spawn.actor(ActorRobot2D)
    this.spawn.actor(ActorRobot3D)
  }

  onLoaded(): void {
    // Create hemispheric light
    this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 0, 0), this.babylon.scene)
  }

  onUnload(): void {
    // Release custom created elements
    this.light?.dispose()
    this.light = undefined
  }
}
