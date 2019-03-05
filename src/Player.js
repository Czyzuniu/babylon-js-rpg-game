import * as BABYLON from "babylonjs";
import Utils from "./Utils";

export default class Player {
  constructor(scene) {
    this.controls = {
      inAir:false
    }
    this.scene = scene
    this.scene.actionManager = new BABYLON.ActionManager(this.scene);
    this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger,  (evt) => {
      this.controls[evt.sourceEvent.keyCode] = evt.sourceEvent.type === "keydown";
      console.log(this.controls)
    }));

    this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,  (evt) => {
      this.controls[evt.sourceEvent.keyCode] = evt.sourceEvent.type === "keydown";
      console.log(this.controls)
    }));

    this.moveSpeed = 1
    this.velocity = new BABYLON.Vector3(0,0,0)
  }

  setAnimations(anims) {
    this.animationGroups = anims
  }

  move() {
    if (this.mesh) {


      let rotation
      if (this.mesh.rotationQuaternion) {
        rotation = this.mesh.rotationQuaternion.toEulerAngles();
      }
        Utils.getAnimationByName('idle', this.animationGroups).play(true)
      if (this.controls["87"]) {
        this.mesh.moveWithCollisions(new BABYLON.Vector3(-parseFloat(Math.sin(rotation.y)) / this.moveSpeed, 0, -parseFloat(Math.cos(rotation.y)) / this.moveSpeed))
        Utils.getAnimationByName('run', this.animationGroups).play(true)
      } else {
        Utils.getAnimationByName('run', this.animationGroups).stop()
      }
      if (this.controls["83"]) {
        this.mesh.moveWithCollisions(new BABYLON.Vector3(-parseFloat(Math.sin(rotation.y)) / -this.moveSpeed / 3, 0, -parseFloat(Math.cos(rotation.y)) / -this.moveSpeed / 3))
        Utils.getAnimationByName('walk_back', this.animationGroups).play(true)
      } else {
        Utils.getAnimationByName('walk_back', this.animationGroups).stop()
      }
      if (this.controls["68"]) {
        this.mesh.rotate(BABYLON.Axis.Y,0.01, BABYLON.Space.WORLD);
      }
      if (this.controls["65"]) {
        this.mesh.rotate(BABYLON.Axis.Y,-0.01, BABYLON.Space.WORLD)
      }

      //
      if (!this.controls.inAir) {
        if (this.controls["32"]) {
          this.mesh.moveWithCollisions(new BABYLON.Vector3(0, 40, 0))
          Utils.getAnimationByName('air', this.animationGroups).play()
           this.controls.inAir = true
        }
      }


      // console.log(this.mesh.position.y)
      //
      // if (this.mesh.position.y <= 13) {
      //   this.controls.inAir = false
      // }


      this.mesh.moveWithCollisions(this.scene.gravity)
    }
  }


  render(scene) {
    return new Promise((res) => {
      BABYLON.SceneLoader.ImportMesh(null, "/public/models/male_adventurer/", "scene.gltf", scene, (meshes, particleSystems, skeletons) => {
        this.mesh = meshes[0]
        this.mesh.scaling = new BABYLON.Vector3(10, 10, -10);
        this.mesh.position.y = 200
        this.mesh.ellipsoid = new BABYLON.Vector3(8, 20, 2);
        this.mesh.ellipsoidOffset = new BABYLON.Vector3(0, 8.0, 0);
        // let material = new BABYLON.StandardMaterial('playerMaterial', scene);
        // material.alpha = 1;
        // material.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
        // var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameterX:this.mesh.ellipsoid.x, diameterY: this.mesh.ellipsoid.y, diameterZ: this.mesh.ellipsoid.z}, scene);
        // sphere.position = new BABYLON.Vector3(0, 200, 0);
        // this.mesh.addChild(sphere)
        // sphere.material = material
        //if u want to draw ellipsoid to see it
        res(this.mesh)
      })
    })
  }


}
