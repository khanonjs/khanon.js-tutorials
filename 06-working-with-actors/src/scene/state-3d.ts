import {
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { ActorDoor3D } from '../actors-door/actor-door-3d'
import { ActorRobot3D } from '../actors-robot/robot-3d'

@SceneState({
  actors: [
    ActorDoor3D,
    ActorRobot3D
  ]
})
export class SceneState3D extends SceneStateInterface {

}
