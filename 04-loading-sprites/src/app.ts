import {
  App,
  AppInterface,
  Logger
} from '@khanonjs/engine'

@App({
  name: '01-blank-project'
})
export class MyApp extends AppInterface {
  onStart() {
    // Entry point of your app

    // Use trace logs to easily debug your project. Trace logs are highlighted in purple in the browser console.
    Logger.trace('Hello world!')
  }

  onClose() {
    Logger.info('App onClose')
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
