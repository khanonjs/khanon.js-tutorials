import { Mesh } from '@khanonjs/engine'

import { MeshBase } from './mesh-base'

@Mesh({
  url: './assets/monsters/cactoro.glb',
  animations: [
    { id: 'idle' },
    { id: 'bite' },
    { id: 'no' },
    { id: 'jump' }
  ]
})
export class MeshCactoro extends MeshBase {
  onSpawn() {
    this.idleToRandomAnimation('idle', ['no', 'bite', 'jump'])
  }
}
