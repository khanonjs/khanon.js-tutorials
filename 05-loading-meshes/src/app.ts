import {
  App,
  AppInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { SceneBusStop } from './scene'

@App({
  name: '05-loading-meshes'
})
export class MyApp extends AppInterface {
  onStart() {
    // Load the scene
    KJS.Scene.load(SceneBusStop)
      .onComplete.add(() => {
        // Hide loading background
        const loadingBackground = window.document.getElementById('loading-background')
        if (loadingBackground) {
          loadingBackground.style.display = 'none'
        }

        // Start the scene
        KJS.Scene.start(SceneBusStop)
      })
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
