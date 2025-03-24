import {
  App,
  AppInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { SceneMonsters } from './scene'

@App({
  name: '05-creating-3d-scene'
})
export class MyApp extends AppInterface {
  onStart() {
    // Load the scene
    KJS.Scene.load(SceneMonsters)
      .onComplete.add(() => {
        // Hide loading background
        const loadingBackground = window.document.getElementById('loading-background')
        if (loadingBackground) {
          loadingBackground.style.display = 'none'
        }

        // Start the scene
        KJS.Scene.start(SceneMonsters)
      })
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
