import {
  App,
  AppInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { AppStateEntry } from './app-state-entry'

@App({
  name: '02-app-workflow'
})
export class MyApp extends AppInterface {
  onStart() {
    // Entrypoint of your app
    Logger.info('App onStart')

    // Show loading screen
    window.document.getElementById('loading-screen').style.display = 'flex'

    // Goto AppStateEntry
    this.switchState(AppStateEntry, {})
  }

  onClose() {
    Logger.info('App onClose')
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
