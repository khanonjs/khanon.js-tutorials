import {
  AppState,
  AppStateInterface,
  KJS
} from '@khanonjs/engine'

import { SceneEntry } from './scenes/scene-entry'

@AppState()
export class AppStateEntry extends AppStateInterface {
  onStart(): void {
    KJS.Scene.load(SceneEntry).onComplete.add(() => {
      KJS.Scene.start(SceneEntry)
    })
  }
}
