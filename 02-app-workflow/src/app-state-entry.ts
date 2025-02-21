import {
  AppState,
  AppStateInterface,
  KJS
} from '@khanonjs/engine'

import { MyApp } from './app'
import { SceneEntry } from './scenes/scene-entry'

@AppState()
export class AppStateEntry extends AppStateInterface {
  onStart(): void {
    KJS.Scene.load(SceneEntry).onComplete.add(() => {
      setTimeout(() => {
        // Hide the loading screen
        MyApp.hideLoadingScreen()

        // Start SceneEntry
        KJS.Scene.start(SceneEntry)
      }, 0 /*3000*/)  // 8a8f descomentar
    })
  }
}
