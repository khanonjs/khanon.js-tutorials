const fs = require('fs');
const path = require('path');

const tutorials = [
  '01-blank-project',
  '02-starting-scene',
  '03-app-workflow',
  '04-loading-sprites',
  '05-loading-meshes',
  '06-working-with-actors',
  '07-creating-simple-2d-game',
  '08-creating-simple-3d-game',
]

const babylonjs_version = '~7.50.0'
const khanonjsjs_version = '0.0.140'

tutorials.forEach(tutorialName => {
   console.log(`Updating packages for tutorial '${tutorialName}'...`)
   const package = require(`./${tutorialName}/package.json`)
   package.devDependencies['@babylonjs/inspector'] = babylonjs_version
   package.dependencies['@khanonjs/engine'] = khanonjsjs_version
   package.dependencies['@babylonjs/core'] = babylonjs_version
   package.dependencies['@babylonjs/gui'] = babylonjs_version

   fs.writeFile(`./${tutorialName}/package.json`, JSON.stringify(package, null, 2), (err) => {
      if (err) {
          console.log(`Error saving package in path '${path}':`, err)
          process.exit(1)
      } else {
         console.log(`Package updated in tutorial '${tutorialName}'.`)
      }
   })

   require('child_process').exec('npm i', { cwd: `./${tutorialName}` })
})



