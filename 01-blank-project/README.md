# Overview
Start a project from scratch with the minimum codebase.

Repository and documentation [here](https://github.com/khanonjs/khanon.js-tutorials/tree/main/01-blank-project)

# Project structure

A Khanon.js project is made by the `root` files, `src` folder, and `public` folder.

## `root` files

It contains the `package.json` file with basic dependencies, `tsconfig.json` with typescript configuration, and other files you want to add to your project such *eslint*, *tests*, etc.

*Webpack files and package.json scripts are temporal, it will change on production release.*

## `src` folder

Source files are stored in this folder.

Usually `app.js` is in the root of this folder. This is the place where the application starts.

To start a Khanon.js application, you need to create a class, extend [AppInterface](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html), and decorate it with the [App decorator](https://khanonjs.com/api-docs/functions/decorators_app.App.html).

The application starts in the mandatory [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) callback. Use the [KJS](https://khanonjs.com/api-docs/modules/kjs.KJS.html) namespace or the app [switchState](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#switchState) method to start running states and scenes.

```
@App({
  name: '01-blank-project'
})
export class MyApp extends AppInterface {
  onStart() {
    // Entrypoint of your app

    // Use trace logs to easily debug your project. Trace logs are highlighted in purple in the browser console.
    Logger.trace('Hello world!')
  }

  onClose() {
    Logger.info('App onClose')
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
```

## `public` folder

This is the folder that will be published to the server.

It contains `index.html`, the `assets` folder, any any other files you want to publish to your server.

# Building and publishing the project

Build the project running the `npm run build` script from the root folder.

Once the app is built, a `dist` folder is be created with the compiled `app.js` file and the content of `public` folder.

The content of `dist` folder is what you have to copy to your server; then just run `index.html` in any browser to start the application.