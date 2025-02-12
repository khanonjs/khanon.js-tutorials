const fs = require('fs');
const path = require('path');

const tutorials = [
  '01-blank-project',
  '02-app-workflow',
  '03-adding-2d-sprites',
  '04-adding-3d-meshes',
  '05-working-with-actors',
  '06-creating-simple-2d-game',
  '07-creating-simple-3d-game',
]

const babylonjs_version = '~7.47.2'
const khanonjsjs_version = '0.0.123'

tutorials.forEach(tutorialName => {
   console.log(`Updating packages for tutorial '${tutorialName}'...`)
   const package = require(`../${tutorialName}/package.json`)
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



