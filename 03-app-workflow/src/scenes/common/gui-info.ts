import * as BABYLON_GUI from '@babylonjs/gui'
import {
  GUI,
  GUIInterface,
  KJS
} from '@khanonjs/engine'

/**
 * This GUI shows the app context: app state name, scene name, scene state name, and a countdown timer.
 */
@GUI()
export class GUIInfo extends GUIInterface<{ context: string, seconds?: number }> {
  private input: BABYLON_GUI.TextBlock

  /**
   * Initialize the GUI using container as the parent of all elements
   */
  onInitialize(container: BABYLON_GUI.AdvancedDynamicTexture) {
    // Background
    const background = new BABYLON_GUI.Rectangle()
    background.top = '0px'
    background.left = '0px'
    background.width = '100%'
    background.height = '100%'
    background.verticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP
    background.color = 'rgba(0, 0, 0, 0)'
    background.background = 'rgba(0, 0, 0, 0)'
    container.addControl(background)

    // Input text block with app context information
    this.input = new BABYLON_GUI.TextBlock('text-info')
    this.input.left = '40em'
    this.input.top = '10em'
    this.input.width = '100%'
    this.input.height = '100%'
    this.input.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    this.input.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP
    this.input.fontFamily = 'Helvetica'
    this.input.textWrapping = true
    this.input.color = 'rgba(210, 210, 210, 255)'
    this.input.fontSize = '20em'
    this.updateText(this.setup.seconds)
    background.addControl(this.input)

    this.startTimer()
  }

  /**
   * Start countdown timer
   */
  startTimer() {
    if (this.setup.seconds) {
      let seconds = this.setup.seconds
      setInterval(() => {
        if (seconds > 0) {
          seconds--
          this.updateText(seconds)
        }
      }, 1000)
    }
  }

  /**
   * Update the text adding the countdown seconds in case it is running.
   * Update the app state name, scene name, scene state name, context text, and countodwn.
   */
  updateText(seconds?: number) {
    this.input.text = `
      App state:       ${KJS.getApp().state?.getClassName()}
      Scene:            ${this.scene.getClassName()}
      Scene State:  ${this.scene.state?.getClassName()}
      Context:         ${this.setup.context}
      ${seconds !== undefined ? ('Seconds:        ' + seconds) : ''}
      `
  }
}
