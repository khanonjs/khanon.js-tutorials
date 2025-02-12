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
