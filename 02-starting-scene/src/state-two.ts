import {
  Logger,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { SceneGUI } from './scene-gui'
import { StateOne } from './state-one'

@SceneState()
export class StateTwo extends SceneStateInterface {
  onStart(): void {
    Logger.trace('Hello, State Two')
    this.showGUI(SceneGUI, { stateName: 'StateTwo', onSwitchState: () => this.onSwitchState() })
  }

  onEnd(): void {
    Logger.trace('Goodbye, State Two')
    this.hideGUI(SceneGUI)
  }

  onSwitchState() {
    this.switchState(StateOne, {})
  }
}
