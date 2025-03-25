import * as BABYLON from '@babylonjs/core'
import {
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { ActorRobot2D } from './actor-robot-2d'
import { ActorRobot3D } from './actor-robot-3d'
import { SceneCamera } from './camera'

@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.05)
  },
  actors: [
    ActorRobot2D,
    ActorRobot3D
  ]
})
export class SceneActors extends SceneInterface {
  private light?: BABYLON.HemisphericLight

  onStart() {
    this.switchCamera(SceneCamera, {})

    const robot2D = this.spawn.actor(ActorRobot2D)
    robot2D.t.scale = 0.035
    robot2D.t.position.set(1, 1, 0)

    const robot3D = this.spawn.actor(ActorRobot3D)
    robot3D.t.scaling.set(0.2, 0.2, 0.2)
    robot3D.t.position.set(0, 0.5, 0)
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
