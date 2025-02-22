# Overview
In this tutorial we will see how to drive the workflow of an application simulating how a video game workflow would be. From the entry point, to show loading screens,  load and start scenes, switch of states, and using GUIs.

Repository and documentation [here](https://github.com/khanonjs/khanon.js-tutorials/tree/main/02-app-workflow)

# Workflow diagram

Let's analyze the workflow our app will follow in this tutorial:

![App worfflow](./workflow-diagram.jpg?raw=true "App worfflow")

# Starting the app

As we saw in the previous tutorial, to start the app just decorate your app class with the [App decorator](https://khanonjs.com/api-docs/functions/decorators_app.App.html).

The app decorated class [`onStart`](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) method is the entry point of the application, so here we can start doing things.

We could load a scene directly within this method, but it is a good practice start working with states since the beggining, that will help to scanalte the application in a proper way if the things get complexer in the future.

Create the app state `AppStateEntry`

**src/app-state-entry.ts**
```
@AppState()
export class AppStateEntry extends AppStateInterface {
  onStart(): void {
  }
}
```

Switch to it from the app's *onStart* method:

**src/app.ts**
```
@App({
  name: '02-app-workflow'
})
export class MyApp extends AppInterface {
  onStart() {
    // Entrypoint of your app
    Logger.info('App onStart')

    // Goto AppStateEntry
    this.switchState(AppStateEntry, {})
  }
}
```

Now `AppStateEntry` has the control of the application. Bear in mind every time we switch to a state, it will be exedcuted from scratch from the state's [`onStart`](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onStart) method. States are not persistent, once one is finished, it is removed and another starts.

Before starting the first scene, let's see how to configure it. To create a scene, you need to decorate a class with Scene decorator, and declare the assets, elements and configuration it will use:

**src/scene/scene-entry.ts**
```
hola
```

It is time to load and start our first scene. Use the global [KJS](https://khanonjs.com/api-docs/modules/kjs.KJS.html) object to work with scenes. Add these lines to the state's *onStart* method:

**src/app-state-entry.ts**
```
onStart(): void {
    KJS.Scene.load(SceneEntry).onComplete.add(() => {
      KJS.Scene.start(SceneEntry)
    })
  }
```

The [`load`](https://khanonjs.com/api-docs/functions/kjs.KJS.Scene.load.html) scene method returns a [LoadingProgress](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html) class. You can subscribe to the [`onComplete`](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onComplete), [`onError`](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onError) and [`onProgress`](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onProgress) observables to track the loading progress.

Once the scene has been loaded, we can [`start`](https://khanonjs.com/api-docs/functions/kjs.KJS.Scene.start.html) it. The scene will be automatically started and rendered on screen.

Before advancing, let's see how to add a loading screen while the scene is loading. Display the loading screen in the app's *onStart* method:

**src/app.ts**
```
onStart() {
  // Entrypoint of your app
  Logger.info('App onStart')

  // Show loading screen
  window.document.getElementById('loading-screen').style.display = 'flex'

  // Goto AppStateEntry
  this.switchState(AppStateEntry, {})
}
```

The loading screen `id="loading-screen"` has been previously added to the `index.html` file in the `public` folder.

Let's fake a 3 seconds loading time, after what we can hide the loading screen and start the scene. This is done in AppStateEntry, who is controlling the app at this point:

**src/app-state-entry.ts**
```
onStart(): void {
  KJS.Scene.load(SceneEntry).onComplete.add(() => {
    setTimeout(() => {
      // Hide the loading screen
      window.document.getElementById('loading-screen').style.display = 'none'

      // Start SceneEntry
      KJS.Scene.start(SceneEntry)
    }, 5000)
  })
}
```

Great, time to see how our first scene has been made.

# Switching to another scene




