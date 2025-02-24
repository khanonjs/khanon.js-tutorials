import * as BABYLON_GUI from '@babylonjs/gui'
import {
  GUIInterface,
  Logger
} from '@khanonjs/engine'

export class SceneEntryGUI extends GUIInterface {
  onInitialize(container: BABYLON_GUI.AdvancedDynamicTexture) {
    const rectangle = new BABYLON_GUI.Rectangle()
    // rectangle.
    rectangle.color = 'rgba(0, 0, 0, 0)'
    rectangle.background = 'rgba(0, 0, 0, 0)'
    rectangle.top = '0px'
    rectangle.left = '0px'
    rectangle.width = '100%'
    rectangle.height = '240px'
    rectangle.verticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP
    container.addControl(rectangle)

    const text1 = new BABYLON_GUI.TextBlock('text1')
    text1.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    text1.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP
    text1.fontFamily = 'Helvetica'
    text1.textWrapping = true
    text1.width = '100%'
    text1.height = '100%'
    text1.text = `Scene:
State:
`
    text1.color = 'white'
    text1.fontSize = '100px'
    rectangle.addControl(text1)

    /* let children = container.getChildren()[0].children
    const title = children.filter(control => control.name === "Title")[0] as BABYLON_GUI.TextBlock
    title.color = "white"
    title.text = "Hello World" */

    const button = BABYLON_GUI.Button.CreateSimpleButton('but', 'Click Me')
    button.width = '150px'
    button.height = '40px'
    button.color = 'white'
    button.background = 'green'
    button.onPointerUpObservable.add(() => {
      console.log('Button Clicked')
    })
    container.addControl(button)
  }

  setSceneName(sceneName: string) {
    Logger.trace('aki SET SCENE NAME', sceneName)
  }
}
