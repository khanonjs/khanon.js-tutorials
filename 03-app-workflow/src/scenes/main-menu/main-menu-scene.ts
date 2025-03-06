import {
  Scene,
  SceneInterface
} from '@khanonjs/engine'

// import { SceneEntryGUI } from './scene-entry-gui'

@Scene({
  guis: [
    // SceneEntryGUI
  ]
})
export class SceneEntry extends SceneInterface {
  onStart(): void {
    // const gui = [...this.guis][0] as SceneEntryGUI
    // gui.setSceneName(this.getClassName())
  }
}
