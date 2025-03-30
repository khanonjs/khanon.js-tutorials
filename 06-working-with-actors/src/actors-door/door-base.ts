import {
  ActorInterface,
  MeshInterface,
  SpriteInterface
} from '@khanonjs/engine'

export abstract class ActorDoorBase<B extends SpriteInterface | MeshInterface = SpriteInterface | MeshInterface> extends ActorInterface<B> {
  abstract animationId_Open: string
  abstract animationId_Close: string

  open() {
    if (this.body.animation?.id === this.animationId_Close) {
      this.body.playAnimation(this.animationId_Open)
    }
  }

  close() {
    if (this.body.animation?.id === this.animationId_Open) {
      this.body.playAnimation(this.animationId_Close)
    }
  }
}
