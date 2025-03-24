# Overview
Compose a 3D scene and add 3D animated characters.

This tutorial can be found [here](https://github.com/khanonjs/khanon.js-tutorials/tree/main/05-creating-3d-scene).

Watch the preview [here](https://html-preview.github.io/?url=https://raw.githubusercontent.com/khanonjs/khanon.js-tutorials/refs/heads/main/05-creating-3d-scene/dist/index.html).

Background Art [Pretty park set](https://poly.pizza/bundle/Pretty-park-set-G2WINPAG9S) by [Isa Lousberg](https://poly.pizza/u/Isa%20Lousberg) via Poly Pizza.

Characters Art [Ultimate Monsters Bundle](https://poly.pizza/bundle/Ultimate-Monsters-Bundle-5oyGWAmOB6) by [Quaternius](https://poly.pizza/u/Quaternius) via Poly Pizza.

## What will we do?

In this tutorial we will compose a 3D scene with a background, a custom skybox and light, a particle system, and some 3D animated characters. The animated characters will be playing random animations after a number of *idle* loops.

# Loading the 3D background

The 3D elements have been modified and exported from [Blender](https://www.blender.org/) to `.glb` format. Babylon supports [glTF](https://es.wikipedia.org/wiki/GlTF) files, but also its own [.babylon](https://doc.babylonjs.com/setup/support/.babylonFileFormat) format. In case you want to use *.babylon* format, there are some extensions that can be used to export 3D elements. You can find them [here](https://doc.babylonjs.com/features/featuresDeepDive/Exporters/).

Unlike 2D scenes where we have to load their elements sprite by sprite, 3D scenes can be imported directly from a file exported from a 3D editor. To load a 3D scene into our code, we must to set the scene's [url](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#url) decorator property. In this case we are loading *pretty-park.glb*.

This file contains the ground and the background of the scene. Characters, skybox, and particles will be loaded apart of it.

**src/scene.ts**
```
@Scene({
  url: './assets/pretty-park.glb',  // Load this file into the scene
  configuration: {
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.05)
  },
})
export class SceneMonsters extends SceneInterface {
}
```

## Camera

Then we create a camera and place it some points away from the center.

**src/camera.ts**
```
@Camera()
export class SceneCamera extends CameraInterface {
  onInitialize(scene: BABYLON.Scene): BABYLON.TargetCamera {
    const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 4, -9), scene)
    camera.target = new BABYLON.Vector3(0, 0, 7)
    camera.inputs.clear()
    return camera
  }
}
```

Switch the camera.

**src/scene.ts**
```
onStart() {
  this.switchCamera(SceneCamera, {})
}
```

# Creating 3D custom elements

Now we create the [skybox](https://doc.babylonjs.com/features/featuresDeepDive/environment/skybox) and the [light](https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction) using Babylon's methods. We do this in the [onLoaded](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoaded) scene method. Khanon.js has no knowledge of these elements, so their lifetime is your responsability. You must store them to later dispose on scene [onUnload](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onUnload).

Unlike 2D sprites, 3D meshes are rendered according to the environment lights; so we will need to add lights to a *.babylon* scene file, or add them manually like in this tutorial.

**src/scene.ts**
```
onLoaded(): void {
  this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 0, 0), this.babylon.scene)

  this.skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, this.babylon.scene)
  const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', this.babylon.scene)
  skyboxMaterial.backFaceCulling = false
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('./assets/sky/sky1', this.babylon.scene)
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
  this.skybox.material = skyboxMaterial
}

onUnload(): void {
  this.light?.dispose()
  this.skybox?.dispose()
  this.light = undefined
  this.skybox = undefined
}
```

At this point, if you run the app you will see the scene in front of the camera. No we can add some particles in the same way we did it in the 2D sprites tutorial. All elements in Khanon.js are generated in the same 3D environment, so they are loaded into the scene the same way, regardless of whether they are sprites or meshes.

# Creating particles

Create a particle system to simulate the water of a fountain. [renderOverScene](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#renderOverScene) is set to *false* because we are now working with 3D elements instead 2D sprites. *water-flare.png* is the sprite used for the particles.

**src/particle-fountain.ts**
```
export class ParticleFountain extends ParticleInterface {
  @Sprite({
    url: './assets/sprites/water-flare.png'
  }) water: SpriteConstructor

  onInitialize(particle: ParticleInterface): void {
    const ps = particle.babylon.particleSystem

    particle.setSprite(this.water)

    // ... Code of particle configuration ...
  }
}
```

Now we have to add the particle to the scene, place it over the fountain, and start it. In further tutorials we will see how to automatically attach particles and elements to actors imported from the scene's file, but at the moment we place them manually `new BABYLON.Vector3(-0.84, 1.5, 0.55)`.

**src/scene.ts**
```
@Scene({
  url: './assets/pretty-park.glb',
  configuration: {
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.05)
  },
  particles: [
    ParticleFountain
  ]
})
export class SceneMonsters extends SceneInterface {
  onStart() {
    this.switchCamera(SceneCamera, {})

    const particle = this.spawn.particle(ParticleFountain, {}, new BABYLON.Vector3(-0.84, 1.5, 0.55))
    particle.start()
  }
}
```

# Adding 3D animated characters

Finally we will add some 3D animated characters to the scene.

Just like sprites, we can define meshes in a decorated property within the scene class, or in their own decorated class.

## Property decorated mesh

We are using a simple *armabee* character with a single animation, without any logic, so we can define it within the scene class. We are using [scene.spawn.mesh](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#mesh) to spawn four of them. Use the second argument to set the number of meshs you want to spawn, and the third argument as spawn callback, from where we set their *scale*, *position*, *orientation*, and *animation*.

Use the mesh decorator proeprty [url](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#url) to declare the file from where the mesh will be loaded. Mesh [animations](https://khanonjs.com/api-docs/interfaces/decorators_mesh.MeshProps.html#animations) are declared in the same way than sprites, although in this case we do not need to define the start and end frame. These animations have to be created in the 3D editor and exported alongside the mesh.

We start the *armabee* animations at a random time to avoid them playing synchronized.

**src/scene.ts**
```
@Mesh({
  url: './assets/monsters/armabee.glb',
  animations: [
    { id: 'idle', loop: true }
  ]
}) Armabee: MeshConstructor

onStart() {
  this.switchCamera(SceneCamera, {})

  const particle = this.spawn.particle(ParticleFountain, {}, new BABYLON.Vector3(-0.84, 1.5, 0.55))
  particle.start()

  let positions: BABYLON.Vector3[] = []

  positions = [
    new BABYLON.Vector3(-3, 2 + Math.random() * 2, -1 + Math.random()),
    new BABYLON.Vector3(-1.2, 2 + Math.random() * 2, -1 + Math.random()),
    new BABYLON.Vector3(0.6, 2 + Math.random() * 2, -1 + Math.random()),
    new BABYLON.Vector3(2, 2 + Math.random() * 2, -1 + Math.random())
  ]
  this.spawn.mesh(this.Armabee, 4, (mesh, index) => {
    mesh.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)
    mesh.position = positions[index]
    mesh.lookAt(this.getCamera().position)
    this.setTimeout(() => mesh.playAnimation('idle'), Math.random() * 1000)
  })
}
```

## Class decorated mesh

The other animated characters have more than one animation, and we are applying some logic to them, so we start creating a base class that will be extended by each mesh.

This class extends from [MeshInterface](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html). Typescript doesn't allow to extend from more than one class, so we need to extend one by one in each file of hierarchy. That's why we need to extend the mesh interface firstly in the base class.

The logic of this class is to play a random animation after a number of *idle* loops. *idle* and *randomList* represent animation Ids.

**src/mesh-base.ts**
```
import { MeshInterface } from '@khanonjs/engine'

export class MeshBase extends MeshInterface {
  idleToRandomAnimation(idle: string, randomList: string[]) {
    const maxIdleLoops = 3
    let idleRepeat = Math.ceil(Math.random() * maxIdleLoops)
    // Play idle in loop 'idleRepeat' times
    this.playAnimation(idle, { loop: true, speedRatio: 2.0 },
      () => {
        --idleRepeat
        if (idleRepeat === 0) {
          // When the loop is completed, play any animation from the random Ids list
          this.playAnimation(randomList[Math.floor(Math.random() * randomList.length)], {},
            () => {
              // On complete, start again
              this.idleToRandomAnimation(idle, randomList)
            })
        }
      })
  }
}
```

Now we can create two more characters and inherit from this class.

They both will be playing that `idleToRandomAnimation` logic with their own animation Ids.

**src/mesh-cactoro.ts**
```
import { Mesh } from '@khanonjs/engine'

import { MeshBase } from './mesh-base'

@Mesh({
  url: './assets/monsters/cactoro.glb',
  animations: [
    { id: 'idle' },
    { id: 'bite' },
    { id: 'no' },
    { id: 'jump' }
  ]
})
export class MeshCactoro extends MeshBase {
  onSpawn() {
    this.idleToRandomAnimation('idle', ['no', 'bite', 'jump'])
  }
}
```

**src/mesh-hywirl.ts**
```
import { Mesh } from '@khanonjs/engine'

import { MeshBase } from './mesh-base'

@Mesh({
  url: './assets/monsters/hywirl.glb',
  animations: [
    { id: 'idle' },
    { id: 'punch' },
    { id: 'yes' }
  ]
})
export class MeshHywirl extends MeshBase {
  onSpawn() {
    this.idleToRandomAnimation('idle', ['punch', 'yes'])
  }
}
```

We finally spawn them into the scene.

**src/scene.ts**
```
onStart() {
  // ...

  // Add two MeshCactoro
  positions = [
    new BABYLON.Vector3(2, 0, 0),
    new BABYLON.Vector3(3.5, 0, -1.5)
  ]
  this.spawn.mesh(MeshCactoro, 2, (mesh, index) => {
    mesh.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5)
    mesh.position = positions[index]
    mesh.lookAt(this.getCamera().position)
  })

  // Add one MeshHywirl
  const mesh = this.spawn.mesh(MeshHywirl)
  mesh.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5)
  mesh.position = new BABYLON.Vector3(-3, 0, -3)
  mesh.lookAt(this.getCamera().position)
}
```

The scene is now composed. We loaded the background from a file, added custom slybopx and light, created fountain particles, and spawned characters playing their own animations.

# Conclusion

As you see, 2D sprites and 3D meshes are defined in a quite similar way. They both are generated in the 3D environment, they use similar transform methods, and are spawned in the same way. The only differece is that sprites are always facing the camera, they are plane, and lights don't affect them. Instead, meshes are affected by the environment lights, and can be seen 360 dergrees around them. 3D scenes can also be loaded from files.

The particles used for 2D apps are the same than for 3D apps, but for the [renderOverScene](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#renderOverScene) property, which use to be *true* in 2D apps and *false* in 3D apps.

Apart of reusing Khanon.js components, we can also inherit from base classes that implement a common logic to different decorated classes.