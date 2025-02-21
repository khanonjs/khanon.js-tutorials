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
  static showLoadingSceen() {
    // window.document.getElementById('loading-screen').style.display = 'flex'  // 8a8f descomentar
  }

  static hideLoadingScreen() {
    // window.document.getElementById('loading-screen').style.display = 'none'  // 8a8f descomentar
  }

  onStart() {
    // Entrypoint of the app
    Logger.info('App onStart')

    // Show loading screen
    MyApp.showLoadingSceen()

    // Go to AppStateEntry
    this.switchState(AppStateEntry, {})
  }

  onClose() {
    Logger.info('App onClose')
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
