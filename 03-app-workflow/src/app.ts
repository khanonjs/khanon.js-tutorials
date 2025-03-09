import {
  App,
  AppInterface,
  KJS
} from '@khanonjs/engine'

import { AppStateGameIntro } from './app-states/app-state-game-intro'
import { HTMLController } from './classes/html-controller'

@App({
  name: '03-app-workflow'
})
export class MyApp extends AppInterface {
  onStart() {
    // Initialize HTMLController and show loading screen
    HTMLController.initialize()

    // Start the first state, 5 seconds fake loading.
    KJS.setTimeout(() => {
      this.switchState(AppStateGameIntro, {})
    }, 5000)
  }

  onClose() {
    // Use this method in case you want to do something before the app is closed.
  }

  onError(error?: string) {
    // Use this method to display an error screen.
  }
}
