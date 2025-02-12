import {
  AppState,
  AppStateInterface,
  KJS
} from '@khanonjs/engine'

import { SceneEntry } from './scenes/scene-entry'

@AppState()
export class AppStateEntry extends AppStateInterface {
  onStart(): void {
    KJS.Scene.load(SceneEntry).onComplete.add(() => {
      setTimeout(() => {
        // Hide the loading screen
        window.document.getElementById('loading-screen').style.display = 'none'

        // Start SceneEntry
        KJS.Scene.start(SceneEntry)
      }, 3000)
    })
  }
}
