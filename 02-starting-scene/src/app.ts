import {
  App,
  AppInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { SceneTest } from './scene-test'
import { StateOne } from './state-one'

@App({
  name: '02-starting-scene'
})
export class MyApp extends AppInterface {
  onStart() {
    const progress = KJS.Scene.load(SceneTest)
    progress.onComplete.add(() => {
      KJS.Scene.start(SceneTest, StateOne)
    })
    progress.onError.add(() => {
      KJS.throw('Error loading scene.')
    })
  }

  onClose() {
    Logger.trace('App onClose')
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
