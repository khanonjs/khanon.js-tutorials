import {
  Logger,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { SceneGUI } from './scene-gui'
import { StateTwo } from './state-two'

@SceneState()
export class StateOne extends SceneStateInterface {
  onStart(): void {
    Logger.trace('Hello, State One!')
    this.showGUI(SceneGUI, { stateName: 'StateOne', onSwitchState: () => this.onSwitchState() })
  }

  onEnd(): void {
    Logger.trace('Goodbye, State One :/')
    this.hideGUI(SceneGUI)
  }

  onSwitchState() {
    this.switchState(StateTwo, {})
  }
}
