import * as BABYLON from "babylonjs";
import Utils from "./Utils";

export default class Player {
  constructor(scene) {
    this.controls = {
      inAir:true,
      isMoving:false
    }
    this.scene = scene
    this.scene.actionManager = new BABYLON.ActionManager(this.scene);
    this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger,  (evt) => {
      this.controls[evt.sourceEvent.keyCode] = evt.sourceEvent.type === "keydown";

    }));

    this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,  (evt) => {
      this.controls[evt.sourceEvent.keyCode] = evt.sourceEvent.type === "keydown";
    }));

    this.moveSpeed = 10
    this.velocity = new BABYLON.Vector3(0,0,0)
    this.prevTime = performance.now();


    this.utils = new Utils(scene)


    this.statistics = {
      hp:100,
      mana:100,
      level:1
    }
  }

  move() {
    if (this.mesh) {

      let time = performance.now();
      // Create a delta value based on current time
      let delta = ( time - this.prevTime ) / 1000;

      // Set the velocity.x and velocity.z using the calculated time delta
      // this.velocity.x -= this.velocity.x * 10.0 * delta;
      // this.velocity.z -= this.velocity.z * 10.0 * delta;
      this.velocity.y += this.scene.gravity.y * delta;


      let rotation
      if (this.mesh.rotationQuaternion) {
        rotation = this.mesh.rotationQuaternion.toEulerAngles();
      }

      if (this.controls["87"]) {
        this.mesh.moveWithCollisions(new BABYLON.Vector3(-parseFloat(Math.sin(rotation.y)) / this.moveSpeed, 0, -parseFloat(Math.cos(rotation.y)) / this.moveSpeed))
        this.playAnimation('run', true)
        this.controls.isMoving = true
      } else {
        this.controls.isMoving = false
        this.utils.getAnimationByName('run').stop()
      }
      if (this.controls["83"]) {
        this.mesh.moveWithCollisions(new BABYLON.Vector3(-parseFloat(Math.sin(rotation.y)) / -this.moveSpeed / 3, 0, -parseFloat(Math.cos(rotation.y)) / -this.moveSpeed / 3))
        this.playAnimation('walk_back', true)
        this.controls.isMoving = true
      } else {
        this.utils.getAnimationByName('walk_back').stop()
        this.controls.isMoving = false
      }
      if (this.controls["68"]) {
        this.mesh.rotate(BABYLON.Axis.Y,0.01, BABYLON.Space.WORLD);
      }
      if (this.controls["65"]) {
        this.mesh.rotate(BABYLON.Axis.Y,-0.01, BABYLON.Space.WORLD)
      }

      if (!this.controls.inAir) {
        if (this.controls["32"]) {
          this.velocity.y = 0.35
          this.statistics.hp -= 5
          this.controls.inAir = true
        }
      } else {
        this.utils.getAnimationByName('air').play(true)
      }

      if (!this.controls.isMoving && !this.controls.inAir) {
        this.utils.getAnimationByName('idle').play(true)
      }


      this.mesh.moveWithCollisions(this.velocity)
      this.prevTime = time;



      if (this.statistics.hp <= 0) {
        //window.location.reload()
      }
    }
  }

  playAnimation(name,isLoop) {
    if (!this.controls.inAir) {
      this.utils.getAnimationByName(name).play(isLoop)
    }
  }


  getStat(key) {
    if (this.statistics.hasOwnProperty(key)) {
      return this.statistics[key]
    }
  }

  render(scene) {
    return new Promise((res) => {
      BABYLON.SceneLoader.ImportMesh(null, "/public/models/male_adventurer/", "scene.gltf", scene, (meshes, particleSystems, skeletons) => {
        this.mesh = meshes[0]
        this.mesh.position.y = 200
        this.mesh.ellipsoid = new BABYLON.Vector3(0.5, 1.25, 0.5);
        //this.mesh.ellipsoidOffset = new BABYLON.Vector3(0, 1.8, 0);
        // let material = new BABYLON.StandardMaterial('playerMaterial', scene);
        // material.alpha = 1;
        // material.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
        // var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameterX:this.mesh.ellipsoid.x, diameterY: this.mesh.ellipsoid.y, diameterZ: this.mesh.ellipsoid.z}, scene);
        // sphere.position = new BABYLON.Vector3(0, 200, 0);
        // this.mesh.addChild(sphere)
        // sphere.material = material
        //if u want to draw ellipsoid to see it

        this.mesh.onCollideObservable.add(() => {
          this.utils.getAnimationByName('air').stop()
          this.controls.inAir = false
          this.velocity.y = 0
        })

        res(this.mesh)
      })
    })
  }


}
