import {
  App,
  AppInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { SceneBusStop } from './scene'

@App({
  name: '04-loading-sprites'
})
export class MyApp extends AppInterface {
  onStart() {
    KJS.Scene.load(SceneBusStop)
      .onComplete.add(() => {
        KJS.Scene.start(SceneBusStop)
      })
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
