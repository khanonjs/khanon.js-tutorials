# Overview
In this tutorial we will see how to manage the workflow of an application simulating a video game workflow.

Repository and documentation [here](https://github.com/khanonjs/khanon.js-tutorials/tree/main/03-app-workflow).

# Workflow diagram

Let's analyze the workflow our app will follow in this tutorial:

![App worfflow](https://github.com/khanonjs/khanon.js-tutorials/blob/main/03-app-workflow/workflow-diagram.jpg?raw=true "App worfflow")

- The app starts displaying a `HTML loading screen`. At this point nothing has been loaded, so we need to show something while the Babylon.js engine starts.
- Once Babylon.js is ready, Khanon.js starts the app and it goes to the `app state game intro`, where an intro animation could be shown thru the *game intro scene*.
- After the intro, the app goes to the `app state main menu`, where *main menu scene* has a first *loading state* from where it loads asynchronous data, and a second *menu interface state* that displays the GUI to allow the user to start doing things.
- In our tutorial the user can only choose to play the game from the menu interface, driving the app to the `app state play game`.
- The *play game scene* firstly shows the *stage intro state*, after which the action starts in the *stage play state*.
- In the *stage play state* the user can restart the stage, go to the next stage, quit the game, or finish the game. Restart and go to the Next stage restarts the `app state play game` at the same or next stage; Quit the game drives the user back to the `app state main menu`, and Finishing the game goes to the last `app state game over`.

# Starting the app

By default, *index.html* displays a loading screen. This is what the user sees before the app is launched.

**public/index.html**
```
<body>
  <div id="loading-background">
    <div id="loading" class="initial-loading"></div>
  </div>
  <div id="khanonjs"></div>
</body>
```

As we saw in the previous tutorial, to create the app just decorate your app class with the [App decorator](https://khanonjs.com/api-docs/functions/decorators_app.App.html).

Once the app started, the app's [`onStart`](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) is the entry point of the application, so here we can start doing things.

We could load a scene directly from this method, but it is a good practice working with states from the beggining, that will help to modulate and scalate the application in a proper way.

`HTMLController` is a class we created to handle [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) elements, we will use it along the app to show and hide elements.

After simulating a 5 seconds load, we can go o the first app state `AppStateGameIntro`.

**src/app.ts**
```
@App({
  name: '03-app-workflow'
})
export class MyApp extends AppInterface {
  onStart() {
    HTMLController.initialize()
    HTMLController.showLoading('initial-loading')

    KJS.setTimeout(() => {
      this.switchState(AppStateGameIntro, {})
    }, 5000)
  }
}
```

# Game intro

App states are designed to automatically load, configure, and unload scenes. The scenes declared in the [scenes](https://khanonjs.com/api-docs/interfaces/decorators_app_app_state.AppStateProps.html#scenes) decorator prop will be loaded before the state begins, and will be unloaded when we switch to a new state that doesn't declare the same scene.

Since `SceneGameIntro` is already loaded, we can start it from the [onStart](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onStart) method.

**app-states/app-state-game-intro.ts**
```
@AppState({
  scenes: [SceneGameIntro]
})
export class AppStateGameIntro extends AppStateInterface {
  onStart() {
    KJS.Scene.start(SceneGameIntro, StateIntro, {
      loadingClass: 'game-intro',
      context: 'The game is displaying the first intro before going to the main menu. Wait 10 seconds or skip the intro.',
      nextAppState: AppStateMainMenu
    })
  }
}
```

Note that besides starting the scene, we are telling what state launch, and the state setup properties required.

In this tutorial all the scenes are empty, and we work only with states. In Khanon.js, scenes are meant to deal with the scene graphical composition and dynamics, and states are meant to deal with the scene logical part.

We need to declare the states in the [states](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#states) decorator prop to tell Khanon.js what it has to load for the scene.

**src/scenes/game-intro/scene-game-intro.ts**
```
@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.2, 0.2, 0.2)
  },
  states: [StateIntro]
})
export class SceneGameIntro extends SceneInterface {}
```

Scenes and states (like any other component) can be reused from different places of your application. In the case of `StateIntro` we are using it from different scenes, that's why it is contained in the *common* folder.

When you define a state, you can also declare the properties you need to run this state. These properties are declared in the generic [S](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html) type besides the extended `SceneStateInterface` class, and are accessible from the [setup](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#setup) object.

In this case, we are requiring the HTML intro class that will be displayed, a context text, and the next app state where the app will go after showing the intro: `<{ introClass: string, context: string, nextAppState: AppStateConstructor }>`

In the onStart method we display the intro HTML, the `GUIInfo` interface to which we send the context text, the `GUIIntro` that displays a button to skip the intro, and start a fake 10 seconds intro duration.

Remember hide and clear things you don't need anymore after the state ends in the onEnd method.

**src/scenes/common/state-intro.ts**
```
@SceneState()
export class StateIntro extends SceneStateInterface<{ introClass: string, context: string, nextAppState: AppStateConstructor }> {
  private timeout: KJS.Timeout

  onStart() {
    HTMLController.showLoading(this.setup.introClass)

    this.showGUI(GUIInfo, {
      context: this.setup.context,
      seconds: 10
    })

    this.showGUI(GUIIntro, { onSkip: () => this.end() })

    this.timeout = KJS.setTimeout(() => {
      this.end()
    }, 10000)
  }

  onEnd() {
    HTMLController.hideLoading()

    KJS.clearTimeout(this.timeout)
  }

  end() {
    KJS.switchAppState(this.setup.nextAppState, {})
  }
}
```

We created the `end` method to end the intro and go to the next state. This method can be called from two different places: after the 10 seconds timeout, or clicking the skip button from the `GUIIntro` interface. To bind the skip button to the *end* method we use again the setup object declared in the generic [S](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html) type of GUIIntro.

Use [onInitialize](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#onInitialize) and the conatiner [AdvancedDynamicTexture](https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#advanceddynamictexture) to add the GUI elements.

The skip button `onPointerUpObservable` is binded to the `this.setup.onSkip()` method, which we declared in the [showGUI](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#showGUI) second argument: `this.showGUI(GUIIntro, { onSkip: () => this.end() })`.

```
@GUI()
export class GUIIntro extends GUIInterface<{ onSkip: () => void }> {
  onInitialize(container: BABYLON_GUI.AdvancedDynamicTexture) {
    const background = new BABYLON_GUI.Rectangle()
    container.addControl(background)

    const button = BABYLON_GUI.Button.CreateSimpleButton('but', 'Skip intro')
    button.onPointerUpObservable.add(() => {
      this.setup.onSkip()
    })
    background.addControl(button)
  }
}
```

# Main menu

The main menu scene is started from `AppStateMainMenu`, launching `StateMenuLoad`. This state doesn't have any setup object, so we can omit it.

**src/app-states/app-state-main-menu.ts**
```
@AppState({
  scenes: [SceneMainMenu]
})
export class AppStateMainMenu extends AppStateInterface {
  onStart() {
    HTMLController.showLoading('game-intro')

    KJS.Scene.start(SceneMainMenu, StateMenuLoad)
  }
}
```

Main menu scene uses two states: `StateMenuLoad` and `StateMenuInterface`.

**src/scenes/main-menu/scene-main-menu.ts**
```
@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.2, 0.2, 0.2)
  },
  states: [
    StateMenuLoad,
    StateMenuInterface
  ]
})
export class SceneMainMenu extends SceneInterface {}
```

Like we did before, `StateMenuLoad` shows a loading spinner, shows the GUIInfo that displays the app context information, and fakes a 5 seconds loading duration.

This time we don't show any skip button because we are simulating loading some data from somewhere.

After the fake data has been loaded we switch to the `StateMenuInterface`.

**src/scenes/main-menu/state-menu-load.ts**
```
@SceneState()
export class StateMenuLoad extends SceneStateInterface {
  private timeout: KJS.Timeout

  onStart() {
    HTMLController.showLoading('menu-load')

    this.showGUI(GUIInfo, {
      context: 'The main menu is loading asynchronous data, 5 seconds fake loading.',
      seconds: 5
    })

    this.timeout = KJS.setTimeout(() => {
      this.switchState(StateMenuInterface, {})
    }, 5000)
  }

  onEnd() {
    HTMLController.hideLoading()

    KJS.clearTimeout(this.timeout)
  }
}
```

StateMenuInterface shows the GUIInfo and `GUIMenuInterface`, to which we bind the `playGame` method.

Once the user press the play game button, *playGame* is called and we go to the next app state `AppStatePlayGame`.

**src/scenes/main-menu/state-menu-interface.ts**
```
@SceneState()
export class StateMenuInterface extends SceneStateInterface {
  onStart() {
    this.showGUI(GUIInfo, {
      context: 'This is the main menu interface, the user can choose what to do now.'
    })

    this.showGUI(GUIMenuInterface, { onPlayGame: () => this.playGame() })
  }

  onEnd() {
    this.hideGUI(GUIMenuInterface)
  }

  playGame() {
    KJS.switchAppState(AppStatePlayGame, {})
  }
}
```

*playGame* method is bided again to the button through the setup generic interface property: `<{ onPlayGame: () => void }>`

**src/scenes/main-menu/gui-menu-interface.ts**
```
@GUI()
export class GUIMenuInterface extends GUIInterface<{ onPlayGame: () => void }> {
  onInitialize(container: BABYLON_GUI.AdvancedDynamicTexture) {
    const background = new BABYLON_GUI.Rectangle()
    container.addControl(background)

    const button = BABYLON_GUI.Button.CreateSimpleButton('but', 'Play game')
    button.onPointerUpObservable.add(() => {
      this.setup.onPlayGame()
    })
    background.addControl(button)
  }
}
```

# Play game

When the user clicks on play game button in the main menu, the app switch to `AppStatePlayGame`.

