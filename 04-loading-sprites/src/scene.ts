import * as BABYLON from '@babylonjs/core'
import {
  Particle,
  ParticleInterface,
  Scene,
  SceneInterface,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'

import { SceneCamera } from './camera'
import { ParticleSnowLamp } from './particle-snow-lamp'
import { SpriteGirl } from './sprite-girl'
import { SpriteSnow } from './sprite-snow'

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
  private boundingInfo: BABYLON.BoundingInfo

  @Sprite({ url: './assets/background.png' }) Background: SpriteConstructor

  @Particle({ renderOverScene: true })
  snowBack(particle: ParticleInterface, setup: any) { // Equivalent to onInitialize
    const ps = particle.babylon.particleSystem
    particle.setSprite(SpriteSnow)
    ps.createBoxEmitter(
      new BABYLON.Vector3(0.8, -0.8, 0),
      new BABYLON.Vector3(1.5, -1.5, 0),
      this.boundingInfo.boundingBox.maximumWorld.add(new BABYLON.Vector3(-100, 0, 0)),
      this.boundingInfo.boundingBox.minimumWorld.add(new BABYLON.Vector3(0, 100, 0))
    )
    ps.minSize = 0.1
    ps.maxSize = 1
    ps.minEmitPower = 7
    ps.maxEmitPower = 10
    ps.updateSpeed = 0.07
    ps.minLifeTime = 7
    ps.maxLifeTime = 13
    ps.emitRate = 170
    ps.blendMode = BABYLON.Engine.ALPHA_COMBINE
    const grayScale = 1.0 - Math.random() / 2
    ps.addColorGradient(0, new BABYLON.Color4(grayScale, grayScale, grayScale, 0))
    ps.addColorGradient(0.2, new BABYLON.Color4(grayScale, grayScale, grayScale, 1))
    ps.addColorGradient(1, new BABYLON.Color4(grayScale, grayScale, grayScale, 0))
    ps.clipPlane = new BABYLON.Plane(-1, 0, 0, this.boundingInfo.boundingBox.minimumWorld.x)
    ps.clipPlane2 = new BABYLON.Plane(1, 0, 0, this.boundingInfo.boundingBox.minimumWorld.x)
  }

  @Particle({ renderOverScene: true })
  snowFront(particle: ParticleInterface, setup: any) { // Equivalent to onInitialize
    const ps = particle.babylon.particleSystem
    particle.setSprite(SpriteSnow)
    ps.createBoxEmitter(
      new BABYLON.Vector3(1.0, -1.0, 0),
      new BABYLON.Vector3(1.2, -1.2, 0),
      new BABYLON.Vector3(50, 100, 0),
      new BABYLON.Vector3(-50, -100, 0)
    )
    ps.minSize = 1
    ps.maxSize = 2
    ps.minEmitPower = 18
    ps.maxEmitPower = 23
    ps.updateSpeed = 0.07
    ps.minLifeTime = 7
    ps.maxLifeTime = 13
    ps.emitRate = 20
    ps.blendMode = BABYLON.Engine.ALPHA_COMBINE
    ps.addColorGradient(0, new BABYLON.Color4(1, 1, 1, 0))
    ps.addColorGradient(0.2, new BABYLON.Color4(1, 1, 1, 1))
    ps.addColorGradient(1, new BABYLON.Color4(1, 1, 1, 0))
    ps.clipPlane = new BABYLON.Plane(-1, 0, 0, this.boundingInfo.boundingBox.minimumWorld.x)
    ps.clipPlane2 = new BABYLON.Plane(1, 0, 0, this.boundingInfo.boundingBox.minimumWorld.x)
  }

  onStart() {
    this.switchCamera(SceneCamera, {})

    // Spawn the background sprite, by default it is placed in (0, 0, 0)
    const background = this.spawn.sprite(this.Background)
    this.boundingInfo = background.babylon.mesh.getBoundingInfo()

    // Spawn the girl sprite
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
}
