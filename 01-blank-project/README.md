# Overview
Start a project from scratch with the minimum codebase.

Repository and documentation [here](https://github.com/khanonjs/khanon.js-tutorials/tree/main/01-blank-project).

Watch the preview [here](https://html-preview.github.io/?url=https://raw.githubusercontent.com/khanonjs/khanon.js-tutorials/refs/heads/main/01-blank-project/dist/index.html).

# Project structure

A Khanon.js project typically consists of the `root` files, `src` folder, and `public` folder.

## `root` files

It contains the [package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) file with khanonjs, babylonjs and dependencies of your choice, [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) typescript configuration, and other files you want to add to your project such *eslint*, *tests*, etc.

*Webpack files are temporary, it will change in further Khanon.js releases.*

## `src` folder

Source files are placed in this folder.

`app.ts` is usually in the root of *src*. This is the place where the application begins.

To start a Khanon.js application you need to create a new class, extend [AppInterface](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html), and decorate it with the [App decorator](https://khanonjs.com/api-docs/functions/decorators_app.App.html).

The entry point of the application is the mandatory [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) callback. Khanon.js calls this method once everything is ready to start after creating the Babylon.js engine.

**app.ts**
```
@App({
  name: '01-blank-project'
})
export class MyApp extends AppInterface {
  onStart() {
    // Entry point of your app

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

It contains `index.html`, `assets` folder, and any other files and dependencies of your application.

This is the folder that will be published to the server along with the compiled application files.

# Running the application

To run the application just go to the *root* folder and run the `start` npm script:

`npm run start`

# Building and publishing the project

Build the project running the `build` npm script:

`npm run build`

Once the app is built, `dist` folder is created with the compiled `app.js` and the content of `public` folder.

The content of *dist* folder is what you have to copy to your server. After that just run `index.html` in any browser to start the application.