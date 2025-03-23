import { Mesh } from '@khanonjs/engine'

import { MeshBase } from './mesh-base'

@Mesh({
  url: './assets/monsters/hywirl.glb',
  animations: [
    { id: 'idle' },
    { id: 'punch' },
    { id: 'yes' }
  ]
})
export class MeshHywirl extends MeshBase {
  onSpawn() {
    this.idleToRandomAnimation('idle', ['punch', 'yes'])
  }
}
