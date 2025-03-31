# Overview
Work with actors. Build them, play actions and states.

This tutorial can be found [here](https://github.com/khanonjs/khanon.js-tutorials/tree/main/06-working-with-actors).

Watch the preview [here](https://html-preview.github.io/?url=https://raw.githubusercontent.com/khanonjs/khanon.js-tutorials/refs/heads/main/06-working-with-actors/dist/index.html).

3D Art [Animated Robot](https://poly.pizza/m/QCm7qe9uNJ) by [Quaternius](https://poly.pizza/u/Quaternius), [Red Door](https://poly.pizza/m/NZxf87zEEm) by [Kenney](https://poly.pizza/u/Kenney) via Poly Pizza.

## Purpose of this tutorial

In this tutorial we will see how to work with actors, the basic things they can do, and some simple interactions.
We will also see how to get advantage of object-oriented programming (OOP) and generic types. Khanon.js is specifically designed for OOP.

# App workflow

The app starts loaing a single scene. This scene swaps from two different states: 2D state and 3D state, each one rendering its own assets. In both states, the user can move a character along the screen until reach a door, which will be opened and will send the character to the next scene state (from 2D to 3D and viceverswa).

The logic is shared between both scene states using a parent base class. 2D and 3D actrs will share logic as well, using a base actor class. Logic is ran in states and actor actions, which we'll see how it works.

# Scene

Before starting the app we need to create the scene and scene states. So the first thing is creating the base class for both 2D and 3D states, and then the states.

We will use *onEnd* and *onLoopUpdate* callbacks. [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onLoopUpdate) is invoked every frame.
We will apply later the logic.

*SceneStateBase* must extend *SceneStateInterface* to extend the interface to its children classes.

**src/scene/state-base.ts**
```
import { SceneStateInterface } from '@khanonjs/engine'

export abstract class SceneStateBase extends SceneStateInterface {
    onEnd() {
    }

    onLoopUpdate(delta: number) {
    }
}
```

2D state, which extends *SceneStateBase*.

**src/scene/state-2d.ts**
```
import { SceneState } from '@khanonjs/engine'

import { SceneStateBase } from './state-base'

@SceneState()
export class SceneState2D extends SceneStateBase {
  onStart() {
  }
}
```

and 3D state, which also extends *SceneStateBase*.

**src/scene/state-3d.ts**
```
import { SceneState } from '@khanonjs/engine'

import { SceneStateBase } from './state-base'

@SceneState()
export class SceneState3D extends SceneStateBase {
  onStart() {
  }
}
```

We also created a camera, and we can now create the scene and app classes.

The scene defines a notification method within it, that will receive any notification id `FINISH_STAGE` sent to it. Notifications can be sent using the [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method from anywhere, to any element that defined it using the [Notification](https://khanonjs.com/api-docs/functions/decorators_notification.Notification.html) method decorator.

Everytime the scene receives a `FINISH_STAGE` notification, it will swap between 2D and 3D states. That's all the logic the scene runs.

**src/scene/scene.ts**
```
import * as BABYLON from '@babylonjs/core'
import {
  Notification,
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { SceneCamera } from './camera'
import { Messages } from './messages'
import { SceneState2D } from './state-2d'
import { SceneState3D } from './state-3d'

@Scene({
  configuration: {
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.05)
  },
  states: [
    SceneState2D,
    SceneState3D
  ]
})
export class SceneActors extends SceneInterface {
  private light?: BABYLON.HemisphericLight

  @Notification({ id: Messages.FINISH_STAGE })
  swapState() {
    if (this.isState(SceneState2D)) {
      this.switchState(SceneState3D, {})
    } else {
      this.switchState(SceneState2D, {})
    }
  }

  onStart() {
    // Switch camera
    this.switchCamera(SceneCamera, {})
  }

  onLoaded(): void {
    // Create hemispheric light
    this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 0, 0), this.babylon.scene)
  }

  onUnload(): void {
    // Release custom created elements
    this.light?.dispose()
    this.light = undefined
  }
}
```

The app just loads and runs the scene.

# App

**src/app.ts**
```
@App({
  name: '06-working-with-actors'
})
export class MyApp extends AppInterface {
  onStart() {
    KJS.Scene.load(SceneActors)
      .onComplete.add(() => {
        const loadingBackground = window.document.getElementById('loading-background')
        if (loadingBackground) {
          loadingBackground.style.display = 'none'
        }
        KJS.Scene.start(SceneActors, SceneState2D)
      })
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
```

# Actors

It is time to create the actors we will use in our scene. They are 2D robot and 2D door; 3D robot and 3D door. Robots will go to the tap direction when the user clicks or taps the screen. The doors will open when the robot is in front of them.

Let's begin by the doors, which have a simpler logic.

Create the door base class. This class *open* and *close* the door using an animation Id that will be provided by children classes using the abstract properties `animationId_Open` and `animationId_Close`. Abstract properties are properties that a parent class demands to children classes, and which will be available in the parent itself. Using this base class, we can share and run the same logic in 2D and 3D door.

The base class extends [ActorInterface](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html), which also demands what type of actor it will be (2D sprite or 3D Mesh). That generic type will be defined in children door classes extending `ActorDoorBase`, and therefore passed to *ActorInterface*. The actor type is provided by *SpriteInterface* or *SpriteInterface* in the first generic `B`.

It is not usual to have a base class for both 2D and 3D actors, normally you will use 2D or 3D actors, not mixing them, but in this tutorial we want to see how both actor's logic works in the same way.

The `body` is the main sprite or mesh used to compose the actor. We will set it in children classes.

**src/actor-doors/door-base.ts**
```
export abstract class ActorDoorBase<B extends SpriteInterface | MeshInterface = SpriteInterface | MeshInterface> extends ActorInterface<B> {
  abstract animationId_Open: string
  abstract animationId_Close: string

  open() {
    if (this.body.animation?.id === this.animationId_Close) {
      this.body.playAnimation(this.animationId_Open)
    }
  }

  close() {
    if (this.body.animation?.id === this.animationId_Open) {
      this.body.playAnimation(this.animationId_Close)
    }
  }
}
```

The 2D door defines a sprite within it with three animations (open and close). We extend `ActorDoorBase` and use the *SpriteInterface* generic type to declare this actor is built by sprites.
in the [onSpawn](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#onSpawn) method we initialize it.

**src/actor-doors/door-2d.ts**
```
@Actor()
export class ActorDoor2D extends ActorDoorBase<SpriteInterface> {
  animationId_Open = 'open'
  animationId_Close = 'close'

  @Sprite({
    url: './assets/red-door-2d.png',
    cellWidth: 32,
    cellHeight: 32,
    samplingMode: BABYLON.Texture.NEAREST_LINEAR,
    animations: [
      { id: 'open', delay: 90, frameStart: 0, frameEnd: 4, loop: false },
      { id: 'close', delay: 90, frameStart: 4, frameEnd: 8, loop: false }
    ]
  }) Body: SpriteConstructor

  onSpawn(): void {
    this.setBody(this.Body)
    this.t.scale = 0.05
    this.t.position.set(1.5, 1.7, 0)
    this.body.playAnimation(this.animationId_Close)
  }
}
```

Same process for the 3D door.

**src/actor-doors/door-3d.ts**
```
@Actor()
export class ActorDoor3D extends ActorDoorBase<MeshInterface> {
  animationId_Open = 'door|door|open|Animation Base Layer'
  animationId_Close = 'door|door|close|Animation Base Layer'

  @Mesh({
    url: './assets/red-door-3d.glb',
    animations: [
      { id: 'door|door|open|Animation Base Layer', loop: false },
      { id: 'door|door|close|Animation Base Layer', loop: false }
    ]
  }) Body: MeshConstructor

  onSpawn(): void {
    this.setBody(this.Body)
    this.t.scaling.setAll(0.7)
    this.t.position.set(1.5, 1, 0)
    this.body.playAnimation(this.animationId_Close)
    this.t.rotationQuaternion = new BABYLON.Vector3(0.05, -Math.PI / 2 + 0.3, 0).toQuaternion()
  }
}
```

# Actor states and actions

The robots are quite similar than doors, they extend from a base class. But they also implement two states and an action.
The states are `StateDoorSeek` used when we want the actor to move along the screen until reach the door, and `StateEnterDoor`, which we will use to make the actor jump when it reachs the door, and send the notification to the scene indicating the actor entered the door.

So firstly *StateDoorSeek*. This state adds two observers to scene pointer events. When the user tap the screen, it plays the `ActionPointerMove`. When the user untap, the action is stopped. This action will move the actor to the tap direction. When the state ends, we have to remove the observers. The *onLoopUpdate* method check the distance of the robot to the door. If it is in front of the door, we play the open door animation.

We are using here a setup object to receive the door instance, and we are defining *ActorRobotBase* in the third generic argument, to declare the actor type used in this class. That means `this.actor` is of *ActorRobotBase* type, giving us access to all its properties and methods. This concept is very important in Khanon.js. You can use generic types to grant access to custom class definitions. In this case, we are granting access to `lookLeft`, `lookRight`, `animationId_Idle` and `animationId_Walk` to send them to the setup object of `ActionPointerMove`.

Finally, if the robot isn't moving and it is in front of the door, it is switched to the `StateEnterDoor` state.

**src/actor-robots/state-door-seek.ts**
```
@ActorState()
export class StateDoorSeek extends ActorStateInterface<{ door: ActorDoorBase }, SceneInterface, ActorRobotBase> {
  DIST_ENTER_DOOR = 0.3

  onStart() {
    this.babylon.scene.onPointerDown = () => {
      this.actor.playAction(ActionPointerMove, {
        lookLeft: () => this.actor.lookLeft(),
        lookRight: () => this.actor.lookRight(),
        animationId_Idle: this.actor.animationId_Idle,
        animationId_Walk: this.actor.animationId_Walk
      })
    }

    this.babylon.scene.onPointerUp = () => {
      this.actor.stopAction(ActionPointerMove)
    }
  }

  onEnd() {
    this.actor.stopAction(ActionPointerMove)
    this.babylon.scene.onPointerDown = undefined
    this.babylon.scene.onPointerUp = undefined
  }

  onLoopUpdate(delta: number) {
    const dist = Math.abs(this.actor.t.position.x - this.setup.door.t.position.x)
    if (dist < this.DIST_ENTER_DOOR) {
      this.setup.door.open()
      if (!this.actor.getAction(ActionPointerMove)?.isMoving()) {
        this.actor.switchState(StateEnterDoor, { door: this.setup.door })
      }
    } else {
      this.setup.door.close()
    }
  }
}
```

*ActionPointerMove* moves the actor to the tap direction. [Actions](https://khanonjs.com/api-docs/modules/decorators_actor_actor_action.html) are tasks that we can use in actors and scenes. They can be considered as modifiers and logical runners of their parents. In our case, *ActionPointerMove* modifies the actor position and run some other logics like animations and robot direction. Actions can be played and stopped at any time, and different types of actions can work altogether.

When the action starts in the [onPlay](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#onPlay) method, we set the *idle* animation. In the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#onLoopUpdate) we run the logic of moving the actor to the tap direction, apply `lookLeft` or `lookRight` direction, and play the *walking* animation.

**src/actor-robots/action-pointer-move.ts**
```
@ActorAction()
export class ActionPointerMove extends ActorActionInterface<{
  // Setup object
  lookLeft: () => void,
  lookRight: () => void,
  animationId_Idle: string,
  animationId_Walk: string
}> {
  private vel = 0

  onPlay() {
    this.actor.body.playAnimation(this.setup.animationId_Idle)
  }

  onStop() {
    this.stopMoving()
  }

  onLoopUpdate(delta: number) {
    // Calculate actor screen coordinates: https://forum.babylonjs.com/t/world-to-screen-point/9059
    const screenActorXY = BABYLON.Vector3.Project(this.actor.t.position,
      BABYLON.Matrix.Identity(),
      this.babylon.scene.getTransformMatrix(),
      this.scene.getCamera().babylon.camera.viewport.toGlobal(
        this.babylon.scene.getEngine().getRenderWidth(),
        this.babylon.scene.getEngine().getRenderHeight()
      ))

    if (this.babylon.scene.pointerX < screenActorXY.x - 20) {
      // If the mouse pointer is in the left side, vel is negative and set actor to look left
      if (this.vel >= 0) {
        this.setup.lookLeft()
      }
      this.vel = -0.03
    } else if (this.babylon.scene.pointerX > screenActorXY.x + 20) {
      // If the mouse pointer is in the right side, vel is positive and set actor to look right
      if (this.vel <= 0) {
        this.setup.lookRight()
      }
      this.vel = 0.03
    } else {
      // If the pointer is in the middle, stop moving
      this.stopMoving()
    }
    this.actor.t.position.x += this.vel
    if (this.vel !== 0 && this.actor.body.animation?.id !== this.setup.animationId_Walk) {
      // If the actor is moving and the animation is not walk, play walk animation
      this.actor.body.playAnimation(this.setup.animationId_Walk)
    }
  }

  isMoving() {
    return this.vel !== 0
  }

  private stopMoving() {
    this.vel = 0
    this.actor.body.playAnimation(this.setup.animationId_Idle)
  }
}
```

The final state is `StateEnterDoor`, which plays a jump animation and sends the `FINISH_STAGE` notification calling the [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method.

**src/actor-robots/state-enter-door.ts**
```
@ActorState()
export class StateEnterDoor extends ActorStateInterface<{ door: ActorDoorBase }, SceneInterface, ActorRobotBase> {
  onStart() {
    this.actor.t.position.x = this.setup.door.t.position.x
    this.actor.body.playAnimation(this.actor.animationId_Jump)
  }

  onLoopUpdate(delta: number) {
    if (this.actor.visibility > 0) {
      this.actor.visibility -= 0.04
    } else {
      this.setup.door.visibility -= 0.04
      if (this.setup.door.visibility <= 0) {
        // Stop onLoopUpdate callback
        this.loopUpdate = false

        // Send FINISH_STAGE notification to any element that has defined it.
        KJS.Notify.send(Messages.FINISH_STAGE)
      }
    }
  }
}
```

We can create the actors now. Actors are logical elements of the scene. They are composed by sprites or meshes and they can interact with other actors and the scene.

Both 2D and 3D robots are quite similar, they just differ in their spawning configuration, animations, *lookRight* and *lookLeft* implementation.

Both robot actors extends `ActorRobotBase`, setting the first generic to *SpriteInterface* and *MeshInterface* respectively; and implement the abstract properties `animationId_Idle`, `animationId_Walk`, `animationId_Jump`, and methods `lookRight` and `lookLeft`.

In their decorator props they have to declare the states and actions they will use. `renderingGroupId: 1` is used to render the robots over the doors no matter their distance from camera.

The [t](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#t) property (also [transform](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#transform) property) is a shortcut to all transform methods of the actor's body. The actor [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#body) is the main sprite or mesh composing it, and it is assigned by the [setBody](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#setBody) method.

**src/actor-robots/robot-2d.ts**
```
@Actor({
  states: [
    StateEnterDoor,
    StateDoorSeek
  ],
  actions: [
    ActionPointerMove
  ],
  renderingGroupId: 1
})
export class ActorRobot2D extends ActorRobotBase<SpriteInterface> {
  animationId_Idle = 'idle'
  animationId_Walk = 'walk'
  animationId_Jump = 'jump'

  private scale = 0.030

  @Sprite({
    url: './assets/robot-2d.png',
    cellWidth: 34,
    cellHeight: 34,
    samplingMode: BABYLON.Texture.NEAREST_LINEAR,
    animations: [
      { id: 'idle', delay: 90, frameStart: 0, frameEnd: 0, loop: false },
      { id: 'walk', delay: 50, frameStart: 8, frameEnd: 15, loop: true },
      { id: 'jump', delay: 35, frameStart: 16, frameEnd: 21, loop: false }
    ]
  }) Body: SpriteConstructor

  onSpawn() {
    this.setBody(this.Body)
    this.t.scale = this.scale
    this.t.position.set(-1.5, 1.4, 0)
  }

  lookRight() {
    this.t.scaleX = -this.scale
  }

  lookLeft() {
    this.t.scaleX = this.scale
  }
}
```

The robot 3D is rotated in the *onLoopUpdate* method.

**src/actor-robots/robot-3d.ts**
```
@Actor({
  states: [
    StateEnterDoor,
    StateDoorSeek
  ],
  actions: [
    ActionPointerMove
  ],
  renderingGroupId: 1
})
export class ActorRobot3D extends ActorRobotBase<MeshInterface> {
  animationId_Idle = 'RobotArmature|Robot_Idle'
  animationId_Walk = 'RobotArmature|Robot_Walking'
  animationId_Jump = 'RobotArmature|Robot_Jump'

  private rotY = Math.PI
  private rotationVector = new BABYLON.Vector3(0, 0, 0)

  @Mesh({
    url: './assets/robot-3d.glb',
    animations: [
      { id: 'RobotArmature|Robot_Idle', loop: true },
      { id: 'RobotArmature|Robot_Walking', loop: true, speedRatio: 3 },
      { id: 'RobotArmature|Robot_Jump', loop: true }
    ]
  }) Body: MeshConstructor

  onSpawn(): void {
    this.setBody(this.Body)
    this.t.scaling.setAll(0.2)
    this.t.position.set(-1.5, 1, 0)
  }

  lookRight(): void {
    this.rotY = Math.PI - (Math.PI / 2)
  }

  lookLeft(): void {
    this.rotY = Math.PI + (Math.PI / 2)
  }

  onLoopUpdate(delta: number): void {
    this.rotationVector.y = Helper.Maths.increaseValueWithInertia(this.rotationVector.y, this.rotY, 0.1, 1)
    this.t.rotationQuaternion = this.rotationVector.toQuaternion()
  }
}
```

# Scene states

We can finally implement the scene states logic.

The state base destroys the actors crated by its children. It fade in the spawned actors and starts the `StateDoorSeek` robot state when the actors are fully visible.

**src/scene/state-base.ts**
```
export abstract class SceneStateBase extends SceneStateInterface {
    abstract robot: ActorRobotBase
    abstract door: ActorDoorBase
    visibility = 0

    onEnd() {
      // Release elements created by this state
      this.door.destroy()
      this.robot.destroy()
    }

    onLoopUpdate(delta: number) {
      this.door.visibility += 0.04
      this.robot.visibility += 0.04

      this.visibility += 0.04
      if (this.visibility > 1) {
        this.visibility = 1
        // Switch to robot state StateDoorSeek when visibility is 1
        this.robot.switchState(StateDoorSeek, { door: this.door })

        // Disable loopUpdate
        this.loopUpdate = false
      }
      this.door.visibility = this.visibility
      this.robot.visibility = this.visibility
    }
}
```

`SceneState2D` and `SceneState3D` are quite similar, each one spawns 2D or 3D actors.

**src/scene/state-2d.ts**
```
@SceneState({
  actors: [
    ActorDoor2D,
    ActorRobot2D
  ]
})
export class SceneState2D extends SceneStateBase {
  door: ActorDoor2D
  robot: ActorRobot2D
  visibility = 0

  onStart() {
    // Spawn 2D door
    this.door = this.spawn.actor(ActorDoor2D)
    this.door.visibility = this.visibility

    // Spawn 2D robot
    this.robot = this.spawn.actor(ActorRobot2D)
    this.robot.visibility = this.visibility
  }
}
```

**src/scene/state-3d.ts**
```
@SceneState({
  actors: [
    ActorDoor3D,
    ActorRobot3D
  ]
})
export class SceneState3D extends SceneStateBase {
  door: ActorDoor3D
  robot: ActorRobot3D
  visibility = 0

  onStart() {
    // Spawn 3D door
    this.door = this.spawn.actor(ActorDoor3D)
    this.door.visibility = this.visibility

    // Spawn 3D robot
    this.robot = this.spawn.actor(ActorRobot3D)
    this.robot.visibility = this.visibility
  }
}
```

We can run the app now. The scene starts by the `SceneState2D` 2D robot and door are spawned, they run a *fadeIn* animation, and `StateDoorSeek` begins.

# Conclusion

We've seen how actors work, how to execute different logic blocks depending on their state, and how to execute actions to modify them due to different events.

It is important to understand and use the powerful object-oriented programming features that typescript bring. Using heritages in a smart way to reduce code duplicities and fasten up the development process. As you can see, scenes, states, actors, are all modular, being able to add, remove, and interchage any of them with a minimum impact.

Using generics to apply custom types to different properties of our classes will give us a the flexibility to use our own classes within Khanon.js objects.