import * as BABYLON from '@babylonjs/core'
import {
  Particle,
  ParticleInterface,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'

@Particle({
  renderOverScene: false
})
export class ParticleFountain extends ParticleInterface {
  @Sprite({
    url: './assets/sprites/water-flare.png'
  }) water: SpriteConstructor

  onInitialize(particle: ParticleInterface): void {
    const ps = particle.babylon.particleSystem

    particle.setSprite(this.water)

    // Where the particles come from
    ps.minEmitBox = new BABYLON.Vector3(-0.1, 0, 0) // Starting all from
    ps.maxEmitBox = new BABYLON.Vector3(0.1, 0, 0) // To...

    // Colors of all particles
    ps.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0)
    ps.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0)
    ps.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0)

    // Size of each particle (random between...
    ps.minSize = 0.01
    ps.maxSize = 0.05

    // Life time of each particle (random between...
    ps.minLifeTime = 2
    ps.maxLifeTime = 3.5

    // Emission rate
    ps.emitRate = 300

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE

    // Set the gravity of all particles
    ps.gravity = new BABYLON.Vector3(0, -9.81, 0)

    // Direction of each particle after it has been emitted
    ps.direction1 = new BABYLON.Vector3(-2, 8, 2)
    ps.direction2 = new BABYLON.Vector3(2, 8, -2)

    // Angular speed, in radians
    ps.minAngularSpeed = 0
    ps.maxAngularSpeed = Math.PI

    // Speed
    ps.minEmitPower = 0.3
    ps.maxEmitPower = 0.6
    ps.updateSpeed = 0.025
  }
}
