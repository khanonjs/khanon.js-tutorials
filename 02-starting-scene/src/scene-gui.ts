import * as BABYLON_GUI from '@babylonjs/gui'
import {
  GUI,
  GUIInterface
} from '@khanonjs/engine'

import { SceneGUISetup } from './scene-gui-setup'

@GUI()
export class SceneGUI extends GUIInterface<SceneGUISetup> {
  onInitialize(container: BABYLON_GUI.AdvancedDynamicTexture) {
    const background = new BABYLON_GUI.Rectangle()
    background.color = 'rgba(0, 0, 0, 0)'
    background.background = 'rgba(0, 0, 0, 0)'
    background.top = '0px'
    background.left = '0px'
    background.width = '100%'
    background.height = '100%'
    background.verticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP
    container.addControl(background)

    const text1 = new BABYLON_GUI.TextBlock('text1')
    text1.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP
    text1.fontFamily = 'Helvetica'
    text1.textWrapping = true
    text1.width = '100%'
    text1.height = '100%'
    text1.paddingTop = '50px'
    text1.text = 'This is SceneTest running the state:'
    text1.color = 'white'
    text1.fontSize = '50px'
    background.addControl(text1)

    const text2 = new BABYLON_GUI.TextBlock('text2')
    text2.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP
    text2.fontFamily = 'Helvetica'
    text2.textWrapping = true
    text2.top = '60px'
    text2.width = '100%'
    text2.height = '100%'
    text2.paddingTop = '50px'
    text2.text = this.setup.stateName // Use setup property 'stateName'
    text2.color = 'white'
    text2.fontSize = '50px'
    background.addControl(text2)

    const button = BABYLON_GUI.Button.CreateSimpleButton('button', 'Switch state')
    button.width = '150px'
    button.height = '40px'
    button.color = 'white'
    button.background = '#401b3f'
    button.onPointerUpObservable.add(() => this.setup.onSwitchState()) // Use setup property 'onSwitchState'
    background.addControl(button)
  }
}
