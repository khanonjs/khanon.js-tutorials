import { MeshInterface } from '@khanonjs/engine'

export class MeshBase extends MeshInterface {
  idleToRandomAnimation(idle: string, randomList: string[]) {
    const maxIdleLoops = 3
    let idleRepeat = Math.ceil(Math.random() * maxIdleLoops)
    // Play idle in loop 'idleRepeat' times
    this.playAnimation(idle, { loop: true, speedRatio: 2.0 },
      () => {
        --idleRepeat
        if (idleRepeat === 0) {
          this.idleToRandomAnimation(idle, randomList)
          // When the loop is completed, play any animation from the random Ids list
          /* this.playAnimation(randomList[Math.floor(Math.random() * randomList.length)], {},
            () => {
              // On complete, start again
              this.idleToRandomAnimation(idle, randomList)
            }) */
        }
      })
  }
}
