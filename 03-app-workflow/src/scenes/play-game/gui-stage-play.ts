import * as BABYLON_GUI from '@babylonjs/gui'
import {
  GUI,
  GUIInterface
} from '@khanonjs/engine'

/**
 * GUI for the menu interface.
 * @requires onRestart callback to bind the restart game button.
 * @requires onNext callback to bind the next game button.
 * @requires onQuit callback to bind the quit game button.
 * @requires onFinish callback to bind the finish game button.
 */
@GUI()
export class GUIStagePlay extends GUIInterface<{ onRestart: () => void, onNext: () => void, onQuit: () => void, onFinish: () => void }> {
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

    const createButton = (text: string, index: number, callback: () => void) => {
      const button = BABYLON_GUI.Button.CreateSimpleButton(text, text)
      button.top = `${(-100 + (index * 60))}px`
      button.width = '150px'
      button.height = '40px'
      button.color = 'rgb(210, 210, 210)'
      button.background = 'rgb(30, 30, 30)'
      button.onPointerUpObservable.add(() => {
        callback()
      })
      container.addControl(button)
    }

    createButton('Restart Stage', 0, this.setup.onRestart)
    createButton('Next Stage', 1, this.setup.onNext)
    createButton('Quit Game', 2, this.setup.onQuit)
    createButton('Finish Game', 3, this.setup.onFinish)
  }
}
