import * as BABYLON_GUI from '@babylonjs/gui'
import {
  GUI,
  GUIInterface
} from '@khanonjs/engine'

/**
 * GUI for the intro screen. It is shared between scenes.
 * @requires onSkip callback to bind the skip button.
 */
@GUI()
export class GUIIntro extends GUIInterface<{ onSkip: () => void }> {
  /**
   * Initialize the GUI using container as the parent of all elements
   */
  onInitialize(container: BABYLON_GUI.AdvancedDynamicTexture) {
    const background = new BABYLON_GUI.Rectangle()
    background.color = 'rgba(0, 0, 0, 0)'
    background.background = 'rgba(0, 0, 0, 0)'
    background.top = '0px'
    background.left = '0px'
    background.width = '100%'
    background.height = '240px'
    background.verticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP
    container.addControl(background)

    // Skip button
    const button = BABYLON_GUI.Button.CreateSimpleButton('but', 'Skip intro')
    button.verticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP
    button.top = '300px'
    button.width = '150px'
    button.height = '40px'
    button.color = 'rgb(210, 210, 210)'
    button.background = 'rgb(80, 37, 92)'
    button.onPointerUpObservable.add(() => {
      this.setup.onSkip()
    })
    container.addControl(button)
  }
}
