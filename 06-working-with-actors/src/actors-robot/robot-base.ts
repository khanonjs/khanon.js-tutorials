import {
  ActorInterface,
  MeshInterface,
  SpriteInterface
} from '@khanonjs/engine'

export abstract class ActorRobotBase<B extends SpriteInterface | MeshInterface = SpriteInterface | MeshInterface> extends ActorInterface<B> {
  abstract animationId_Idle: string
  abstract animationId_Walk: string
  abstract animationId_Jump: string
  abstract lookRight(): void
  abstract lookLeft(): void
}
