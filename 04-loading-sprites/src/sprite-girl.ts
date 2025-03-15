import {
  Sprite,
  SpriteInterface
} from '@khanonjs/engine'

@Sprite({
  url: './assets/girl.png',
  cellWidth: 31,
  cellHeight: 39,
  animations: [
    { id: 'move-ball', frameStart: 0, frameEnd: 18, loop: true, delay: 50 },
    { id: 'waiting', frameStart: 19, frameEnd: 37, loop: true, delay: 60 }
  ],
  renderingGroupId: 1
})
export class SpriteGirl extends SpriteInterface {
  onSpawn() {
    this.position.x = -17
    this.position.y = -52
    this.position.z = 0
    const startAnimation = () => {
      this.playAnimation(Math.random() < 0.3 ? 'move-ball' : 'waiting', {}, startAnimation)
    }
    startAnimation()
  }
}
