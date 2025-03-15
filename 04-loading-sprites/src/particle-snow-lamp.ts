import * as BABYLON from '@babylonjs/core'
import {
  Particle,
  ParticleInterface,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'

@Particle({
  renderOverTheScene: true
})
export class ParticleSnowLamp extends ParticleInterface<{ boundingInfo: BABYLON.BoundingInfo, width: number, color: BABYLON.Color3, power: number }> {
  @Sprite({ url: './assets/snow.png' }) Snow: SpriteConstructor

  onInitialize(particle: ParticleInterface) {
    const ps = particle.babylon.particleSystem
    particle.setSprite(this.Snow)
    ps.createBoxEmitter(
      new BABYLON.Vector3(0.8, -0.8, 0),
      new BABYLON.Vector3(1.5, -1.5, 0),
      new BABYLON.Vector3(this.setup.width, this.setup.width, 0),
      new BABYLON.Vector3(-this.setup.width, -this.setup.width, 0)
    )
    ps.minSize = 0.5
    ps.maxSize = 1
    ps.minEmitPower = this.setup.power - 1.5
    ps.maxEmitPower = this.setup.power + 1.5
    ps.updateSpeed = 0.07
    ps.minLifeTime = 3
    ps.maxLifeTime = 5
    ps.emitRate = 25
    ps.blendMode = BABYLON.Engine.ALPHA_COMBINE
    ps.addColorGradient(0, new BABYLON.Color4(this.setup.color.r, this.setup.color.g, this.setup.color.b, 0))
    ps.addColorGradient(0.2, new BABYLON.Color4(this.setup.color.r, this.setup.color.g, this.setup.color.b, 1))
    ps.addColorGradient(1, new BABYLON.Color4(this.setup.color.r, this.setup.color.g, this.setup.color.b, 0))
    ps.clipPlane = new BABYLON.Plane(-1, 0, 0, this.setup.boundingInfo.boundingBox.minimumWorld.x)
    ps.clipPlane2 = new BABYLON.Plane(1, 0, 0, this.setup.boundingInfo.boundingBox.minimumWorld.x)
  }
}
