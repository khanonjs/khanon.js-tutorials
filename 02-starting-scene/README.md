# Overview
Start the first *scene* and switch to different *scene states*.

Repository and documentation [here](https://github.com/khanonjs/khanon.js-tutorials/tree/main/02-starting-scene).

# Creating the app class

As we saw in the preivous tutorial, [App](https://khanonjs.com/api-docs/modules/decorators_app.html) class is the main class of the application where the action begins.

To start an application you just need to create a new class, extend [AppInterface](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html) and decorate it with [App decorator](https://khanonjs.com/api-docs/functions/decorators_app.App.html).

Besides the [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) callback, we can declare [onClose](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onClose) in case we want to perform some action on application close, and [onError](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onError), which is called on a critical error that doesn't let the application continue working. You can use *onError* to show a *HTML* error screen over the canvas.

The app decorator [props](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html) have a mandatory field [`name`](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html#name) and other fields that you can use to configure the Babylon.js engine and other global parameters.

**app.ts**
```
@App({
  name: '02-starting-scene'
})
export class MyApp extends AppInterface {
  onStart() {
    // Entry point.
  }

  onClose() {
    // Method called on application close.
  }

  onError(error?: string) {
    // Method called on application critical error.
  }
}
```

# Defining the scene components

Now that we have the application running with the desired configuration, it's time to start the first scene.

The first step is to define the scene and all its components. For this tutorial we will use a simple scene, two scene states, and a GUI (Graphical User Interface) that will be used from the two states.

## Scene definition

Just like we did before with the app class, to define a scene (and any other decorator we will use in Khanon.js), you need to create a class, extend [SceneInterface](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html) and apply the [Scene decorator](https://khanonjs.com/api-docs/functions/decorators_scene.Scene.html).

**scene-test.ts**
```
import * as BABYLON from '@babylonjs/core'

@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.3, 0.3, 0.3)
  }
})
export class SceneTest extends SceneInterface {}
```

This is the simplest form of a scene, where we are not making use of any of its lifecycle methods. If you want to see what are the lifecycle methods check in the [SceneInterface](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html) documentation the [onStart](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onStart), [onStop](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onStop), [onLoaded](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoaded) and [onUnload](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onUnload) callbacks.

The scene background scene color has been set to gray:
`clearColor: new BABYLON.Color4(0.3, 0.3, 0.3)`

## States definition

Now we define two states using the [State](https://khanonjs.com/api-docs/functions/decorators_scene_scene_state.SceneState.html) decorator.

**state-one.ts**
```
@SceneState()
export class StateOne extends SceneStateInterface {
  onStart(): void {
    Logger.trace('Hello, State One')
  }

  onEnd(): void {
    Logger.trace('Goodbye, State One')
  }

  onSwitchState() {
    this.switchState(StateTwo, {})
  }
}
```

**state-two.ts**
```
@SceneState()
export class StateTwo extends SceneStateInterface {
  onStart(): void {
    Logger.trace('Hello, State Two')
  }

  onEnd(): void {
    Logger.trace('Goodbye, State Two')
  }

  onSwitchState() {
    this.switchState(StateOne, {})
  }
}
```

In this case we are making use of both state's lifecycle methods [onStart](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onStart) and [onEnd](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onEnd). We are also adding the method *onSwitchState* that we will bind to a GUI button click to change from a state to the other.

## GUI definition

Finally we have to define the [GUI](https://khanonjs.com/api-docs/modules/decorators_gui.html) we will use in both states. This GUI uses a [`setup`](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#setup) generic interface that will force to send some setup parameters at the time of displaying it.

GUI elements are created and initialized in the [onInitialize](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#onInitialize) method. You must use the `container` property returned to *onInitialize* to add child elements and let Khanon.js to have control over them. Check [Babylon.js GUI documentation](https://doc.babylonjs.com/features/featuresDeepDive/gui/gui) to see how to add elements to an [AdvancedDynamicTexture](https://doc.babylonjs.com/typedoc/classes/BABYLON.GUI.AdvancedDynamicTexture).

**scene-gui.ts**
```
import * as BABYLON_GUI from '@babylonjs/gui'

@GUI()
export class SceneGUI extends GUIInterface<SceneGUISetup> {
  onInitialize(container: BABYLON_GUI.AdvancedDynamicTexture) {
    // Use 'container' to initialize GUI elements.

    // ** NOTE: These controls are not fully initialized in this example, check the source code to see how to fully initialize them.
    // Background
    const background = new BABYLON_GUI.Rectangle()
    container.addControl(background)

    // First text line
    const text1 = new BABYLON_GUI.TextBlock('text1')
    text1.text = 'This is SceneTest running the state:'
    background.addControl(text1)

    // Second text line
    const text2 = new BABYLON_GUI.TextBlock('text2')
    text2.text = this.setup.stateName // Use setup property 'stateName'
    background.addControl(text2)

    // Button to change of state
    const button = BABYLON_GUI.Button.CreateSimpleButton('button', 'Switch state')
    button.onPointerUpObservable.add(() => this.setup.onSwitchState()) // Use setup property 'onSwitchState'
    background.addControl(button)
  }
}
```

As you can see in the exmaple, we are using `SceneGUISetup` interface as the first generic type of the [GUIInterface](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html) extended class. That means we are asking for that object to be sent to the class at the time of displaying it.

This object contains the name of the state `stateName`, and the callback `onSwitchState` that we are binding to the *button* element. This is the way to interact with the GUI class from the scene state.

**scene-gui-setup.ts**
```
export interface SceneGUISetup {
  stateName: string
  onSwitchState: () => void
}
```

At this point we have created all the copmponents of our small application. It is time to put everything together and make it work.

# Starting the scene and switching states

## Declaring the scene states

Before loading the scene we need to declare the states within the scene. In that way Khanon.js knows what the scene will use and what it has to load. Use the [`states`](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#states) decorator property to declare them:

**scene-test.ts**
```
import { StateOne } from './state-one'
import { StateTwo } from './state-two'

@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.3, 0.3, 0.3)
  },
  states: [
    StateOne,
    StateTwo
  ]
})
export class SceneTest extends SceneInterface {}
```

## Loading and starting the scene

To load the scene we need to use the [KJS.Scene](https://khanonjs.com/api-docs/modules/kjs.KJS.Scene.html) global controller to call the [load](https://khanonjs.com/api-docs/functions/kjs.KJS.Scene.load.html) method. It returns a [LoadingProgress](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html) object that we will use to receive loading events. Once the scene has been completely loaded, the loading progress [onComplete](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onComplete) observable emits an event calling the added callback, from where we can start `SceneTest` using `StateOne` as the entry state.

Add these lines to the app *onStart* method:

**app.ts**
```
onStart() {
  const progress = KJS.Scene.load(SceneTest)
  progress.onComplete.add(() => {
    KJS.Scene.start(SceneTest, StateOne)
  })
  progress.onError.add(() => {
    KJS.throw('Error loading scene.')
  })
}
```

In case of loading error, we use [KJS.throw](https://khanonjs.com/api-docs/functions/kjs.KJS.throw.html) to stop the application. It will drive to the app [onError](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onError) and the application will stop.

## Switching state

Now the scene started and the entry state `StateOne` has also started, we can show the GUI from the state's *onStart*. We can add the lines to show and hide the GUI as follows:

**state-one.ts**
```
@SceneState()
export class StateOne extends SceneStateInterface {
  onStart(): void {
    Logger.trace('Hello, State One')
    this.showGUI(SceneGUI, { stateName: 'StateOne', onSwitchState: () => this.onSwitchState() })
  }

  onEnd(): void {
    Logger.trace('Goodbye, State One')
    this.hideGUI(SceneGUI)
  }

  onSwitchState() {
    this.switchState(StateTwo, {})
  }
}
```

**state-two.ts**
```
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
```

As you can see, the state's [onStart](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onStart) displays the GUI calling [showGUI](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#showGUI), and state's [onEnd](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onEnd) hides the GUI calling [hideGUI](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#hideGUI). We need to pass the *stateName* and *onSwitchState* properties to *showGUI* to let the GUI interact with the state. These properties will be available in the GUI [`setup`](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#setup) object.

Check the browser's console to see how the lifecycle runs for each iteration.