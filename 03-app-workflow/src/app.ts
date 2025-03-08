import {
  App,
  AppInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { AppStateGameIntro } from './app-states/app-state-game-intro'
import { HTMLController } from './classes/html-controller'

@App({
  name: '02-app-workflow'
})
export class MyApp extends AppInterface {
  onStart() {
    // Initialize HTMLController and show loading screen
    HTMLController.initialize()
    HTMLController.showLoading('initial-loading')

    // Start the first state
    KJS.setTimeout(() => {
      this.switchState(AppStateGameIntro, {})
    }, 5000)
  }

  onClose() {
    Logger.info('App onClose')
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
