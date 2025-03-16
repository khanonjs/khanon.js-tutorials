# Overview
Load 2D sprites and particles into the scene.

Repository and documentation [here](https://github.com/khanonjs/khanon.js-tutorials/tree/main/04-loading-sprites).

Watch the preview [here](https://html-preview.github.io/?url=https://raw.githubusercontent.com/khanonjs/khanon.js-tutorials/refs/heads/main/04-loading-sprites/dist/index.html).

Art by [**Vixit**](https://x.com/Vixit_art/status/1820097429095555312). Follow her amazing jobs in [Instagram](https://www.instagram.com/vixit_art/) and [X](https://x.com/Vixit_art).

## What will we do?

In this tutorial we will compose an animated scene. This scene is composed by the static background, an animated girl waiting in the bus stop, and a bunch of different particles.

The falling snow is composed by 3 different particle systems, all of them using the same snow sprite:
- Farer particles, smaller and slower.
- Nearer particles, bigger and faster.
- Particles illuminated by the scene lamps, which can be reused from different positions.

# Creating the scene

We already know how to create scenes in Khanon.js, but in this case we also need to create the camera.

Decorate a class with the [Camera](https://khanonjs.com/api-docs/functions/decorators_camera.Camera.html) decorator and extend [CameraInterface](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html). You need to initialize a Babylon.js camera in the [onInitialize](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#onInitialize) method and return it. You can customize the camera as desired.

Our camera looks at the (0, 0, 1) direction and is placed at (0, 0, -380) position, meaning it looks to the world origin (0, 0, 0).

**src/camera.ts**
```
import * as BABYLON from '@babylonjs/core'
import {
  Camera,
  CameraInterface
} from '@khanonjs/engine'

@Camera()
export class SceneCamera extends CameraInterface {
  onInitialize(scene: BABYLON.Scene) {
    const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 0, -380), scene)
    camera.target = new BABYLON.Vector3(0, 0, 1)
    camera.inputs.clear()
    return camera
  }
}

```

Switch to this camera from the scene's *onStart*. Cameras can use the *setup* object, but in this case we don't need it, so the second argument is an empty object `this.switchCamera(SceneCamera, {})`.

**src/scene.ts**
```
import { SceneCamera } from './camera'

export class SceneBusStop extends SceneInterface {
  onStart() {
    this.switchCamera(SceneCamera, {})
  }
}
```

# Loading sprites into the scene

There are two ways of loading sprites: using decorated *properties*, and using decorated *classes*. The difference between them is that property decorators are created within the class that is going to use them, restricting their use to that context. They lack of lifecycle callbacks, but are faster to implement. Decorated classes can be reused between different components (scenes, states and actors) and you can implement their lifecycle.

## Property decorated sprite

The background is a static rendered image without any logic, and we don't need to reuse it, so we can implement it as a property decorator.

```
@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.05)
  }rticleSnowLamp
  ]
})
export class SceneBusStop extends SceneInterface {
  @Sprite({ url: './assets/background.png' }) Background: SpriteConstructor

  onStart() {
    this.switchCamera(SceneCamera, {})
  }
}
```

Check the decorator props [SpriteProps](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html) to see how you can configure a sprite.

## Class decorated sprite

The girl sprite has two animations, so we can initialize it in the sprite's [onSpawn](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#onSpawn). Firstly we need to declare the animations in the [animations](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#animations) property decorator. We also need to declare *cellWidth* and *cellHeight* for animated sprites. Once the sprite has been spawned by the scene, *onSpawn* is invoked, from where we set its position, and play a randon animation. We will keep playing a random animation on [completed](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#playAnimation) callback argument, calling `startAnimation` on each iteration.

*renderingGroupId* is set to 1, meaning it will be drawn over the background, no matter their depth order (background's *renderingGroupId* is 0). Read more about it [here](https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/transparent_rendering#rendering-groups).

**src/sprite-girl.ts**
```
@Sprite({
  url: './assets/girl.png',
  cellWidth: 31,
  cellHeight: 39,
  animations: [
    { id: 'move-ball', frameStart: 0, frameEnd: 18, loop: true, delay: 50 },
    { id: 'idle', frameStart: 19, frameEnd: 37, loop: true, delay: 60 }
  ],
  renderingGroupId: 1
})
export class SpriteGirl extends SpriteInterface {
  onSpawn() {
    this.position.x = -17
    this.position.y = -52
    this.position.z = 0
    const startAnimation = () => {
      this.playAnimation(Math.random() < 0.3 ? 'move-ball' : 'idle', {}, startAnimation)
    }
    startAnimation()
  }
}

```

## Spawning the sprites

The girl sprite needs to be declared in the [sprites](https://khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#sprites) decorator prop. Then both sprites can be spawned from the *onStart* method.
We are storing the background's bouding info `boundingInfo` to use it later. Do it calling to the background's Babylon.js mesh `background.babylon.mesh`. Khanon.js is transparent to Babylon.js objects, you will be able to access all created Babylon.js instances throught the [BabylonAccessor](https://khanonjs.com/api-docs/interfaces/models.BabylonAccessor.html) of each interface.

**src/scene.ts**
```
@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.05)
  },
  sprites: [
    SpriteGirl
  ],
  particles: [
    ParticleSnowLamp
  ]
})
export class SceneBusStop extends SceneInterface {
  private boundingInfo: BABYLON.BoundingInfo

  onStart() {
      this.switchCamera(SceneCamera, {})

      const background = this.spawn.sprite(this.Background)
      this.boundingInfo = background.babylon.mesh.getBoundingInfo()

      this.spawn.sprite(SpriteGirl)
  }
}
```

At this point the scene is rendering already the background and the animated girl.

# Loading particles

Similar to sprites, there are two ways to implement particles: in decorated methods, and decorated classes. To create particles we need to initialize the particle system, so we are required to implement their initialization in a method, that's why we need a method to define them within a class. The other option is to create their own class.

## Method decorated particles

The back and front particles are simple and we are not reusing them, so we can implement them as decorated methods within the scene class.

Firstly create the snow sprite.

**src/sprite-snow.ts**
```
import {
  Sprite,
  SpriteInterface
} from '@khanonjs/engine'

@Sprite({ url: './assets/snow.png' })
export class SpriteSnow extends SpriteInterface {}
```

And declare it in the scene. This sprite is shared between *scene.ts* and *particle-snow-lamp.ts*.

**src/scene.ts**
```
@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.05)
  },
  sprites: [
    SpriteGirl,
    SpriteSnow
  ],
  particles: [
    ParticleSnowLamp
  ]
})
export class SceneBusStop extends SceneInterface {
 // ...
}
```

Then we create the back and front particles. Set [renderOverScene](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#renderOverScene) to *true* in 2D games. Khanon.js 2D sprites are all transparent to support `.png` files, so we have to explicitly say to Babylon.js what's the depth order of particles. Otherwise they will be rendered behind the background. You can also set their depth order setting *renderOverScene* to *false* and using [renderingGroupId](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#renderingGroupId).

The decorated method is equivalent to the [onInitialize](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#onInitialize) of a class decorated particle. Here we initialize it using the [ParticleInterface](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html) received in the first argument. The second argument is the *setup* object received from the [spawn.particle](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#particle) call, which we are not using here.

To see how to create emitters and configure particles, read Babylon's [Particle System Intro](https://doc.babylonjs.com/features/featuresDeepDive/particles/particle_system/particle_system_intro).

You can access the Babylon.js [ParticleSystem](https://doc.babylonjs.com/typedoc/classes/BABYLON.ParticleSystem) from the babylon accessor `particle.babylon.particleSystem`.

The `boundingInfo` we stored previously is used to clip the particles to prevent rendering them outside the background.

The snow sprite is assigned using the [setSprite](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#setSprite) method. You can also use animated sprites calling [setAnimation](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#setAnimation).

**src/scene.ts**
```
export class SceneBusStop extends SceneInterface {
  private boundingInfo: BABYLON.BoundingInfo

  @Sprite({ url: './assets/background.png' }) Background: SpriteConstructor

  @Particle({ renderOverScene: true })
  snowBack(particle: ParticleInterface, setup: any) { // Equivalent to onInitialize
    const ps = particle.babylon.particleSystem
    particle.setSprite(SpriteSnow)
    // ... Code of particle configuration ...
    ps.clipPlane = new BABYLON.Plane(-1, 0, 0, this.boundingInfo.boundingBox.minimumWorld.x)
    ps.clipPlane2 = new BABYLON.Plane(1, 0, 0, this.boundingInfo.boundingBox.minimumWorld.x)
  }

  @Particle({ renderOverScene: true })
  snowFront(particle: ParticleInterface, setup: any) {  // Equivalent to onInitialize
    const ps = particle.babylon.particleSystem
    particle.setSprite(SpriteSnow)
    // ... Code of particle configuration ...
  }
}
```
We can now spawn both particles into the scene. To start their emission call [start](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#start) method. To stop it call [stop](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#stop) method.

To set the particle emitter position you can use the [position](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#position) decorator property, or the *offset* property of the [spawn.particle](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#particle) method..

**src/scene.ts**
```
onStart() {
    this.switchCamera(SceneCamera, {})

    const background = this.spawn.sprite(this.Background)
    this.boundingInfo = background.babylon.mesh.getBoundingInfo()

    this.spawn.sprite(SpriteGirl)

    // Smaller and slower snow particles in the back
    const particleBack = this.spawn.particle(this.snowBack, {})
    particleBack.start()

    // Bigger and faster snow particles in the front
    const particleFront = this.spawn.particle(this.snowFront, {}, new BABYLON.Vector3(10, 50, 0))
    particleFront.start()
}
```

## Class decorated particles

Finally we are creating a particle that is being emitted from the lamps of the scene. We will reuse it in 5 different lamps, with different colors, so we will use a class decorated particle with a setup configuration.

In the [setup]() object We require the `boundingInfo`, `width`, `color` and `power`. In that way we can configure the particle according to the lamp from where it is emitted.

**src/particle-snow-lamp.ts**
```
import { SpriteSnow } from './sprite-snow'

@Particle({
  renderOverScene: true,
  sprites: [
    SpriteSnow
  ]
})
export class ParticleSnowLamp extends ParticleInterface<{ boundingInfo: BABYLON.BoundingInfo, width: number, color: BABYLON.Color3, power: number }> {
  onInitialize(particle: ParticleInterface) {
    const ps = particle.babylon.particleSystem
    particle.setSprite(SpriteSnow)
    // ... Code of particle configuration ...
  }
}

```

Finally configure the five particles and spawn them from the scene.

**src/scene.ts**
```
onStart() {
  this.switchCamera(SceneCamera, {})

  const background = this.spawn.sprite(this.Background)
  this.boundingInfo = background.babylon.mesh.getBoundingInfo()

  this.spawn.sprite(SpriteGirl)

  // Smaller and slower snow particles in the back
  const particleBack = this.spawn.particle(this.snowBack, {})
  particleBack.start()

  // Bigger and faster snow particles in the front
  const particleFront = this.spawn.particle(this.snowFront, {}, new BABYLON.Vector3(10, 50, 0))
  particleFront.start()

  // Lamp particles, reuse ParticleSnowLamp and apply a different setup depending if it is white or red lamp
  const whiteSetup = {
    boundingInfo: this.boundingInfo,
    width: 9,
    power: 8,
    color: new BABYLON.Color3(1, 1, 1)
  }
  const redSetup = {
    boundingInfo: this.boundingInfo,
    width: 3,
    power: 4,
    color: new BABYLON.Color3(0.3, 0, 0)
  }

  // Snow from the left white lamp
  const particleLamp1 = this.spawn.particle(ParticleSnowLamp, whiteSetup, new BABYLON.Vector3(-42, 60, 0))
  particleLamp1.start()

  // Snow from the right white lamp 1
  const particleLamp2 = this.spawn.particle(ParticleSnowLamp, whiteSetup, new BABYLON.Vector3(48, 105, 0))
  particleLamp2.start()

  // Snow from the right white lamp 2
  const particleLamp3 = this.spawn.particle(ParticleSnowLamp, whiteSetup, new BABYLON.Vector3(58, 75, 0))
  particleLamp3.start()

  // Snow from the left red lamp
  const snowLampRed1 = this.spawn.particle(ParticleSnowLamp, redSetup, new BABYLON.Vector3(-18, 15, 0))
  snowLampRed1.start()

  // Snow from the right red lamp
  const snowLampRed2 = this.spawn.particle(ParticleSnowLamp, redSetup, new BABYLON.Vector3(82, 15, 0))
  snowLampRed2.start()
}
```

# Conclusion

There are two ways to define sprites and particles: using their own *class*, or declaring them within the scene as *propertioes* or *methods*. You need to think if it worth creating their own class, depending if you will reuse them and if you need to implement logic and lifecycle.

Access and use Babylon.js objects every time you need through the *BabylonAccessor*. You are free to use them, but avoid removing them. Khanon.js is who handle their lifetime.

Use the *setup* object everytime you need to configure your elements in Khanon.js. It is present in many different interfaces. That is helpful to avoid redundant code along your project.

