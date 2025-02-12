import * as BABYLONGUI from '@babylonjs/gui'
import {
  GUI,
  GUIInterface
} from '@khanonjs/engine'

@GUI()
export class SceneEntryGUI extends GUIInterface {
  onInitialize(container: BABYLONGUI.AdvancedDynamicTexture) {
    let button = BABYLONGUI.Button.CreateSimpleButton("but", "Click Me")
    button.width = "150px"
    button.height = "40px"
    button.color = "white"
    button.background = "green"
    button.onPointerUpObservable.add(() => {
      console.log('Button Clicked')
    })
    container.addControl(button)
  }
}