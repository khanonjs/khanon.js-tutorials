import {
  App,
  AppInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { SceneActors } from './scene'

@App({
  name: '06-working-with-actors'
})
export class MyApp extends AppInterface {
  onStart() {
    // Load the scene
    KJS.Scene.load(SceneActors)
      .onComplete.add(() => {
        // Hide loading background
        const loadingBackground = window.document.getElementById('loading-background')
        if (loadingBackground) {
          loadingBackground.style.display = 'none'
        }

        // Start the scene
        KJS.Scene.start(SceneActors)
      })
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
