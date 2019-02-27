import CANNON from 'cannon';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as GUI from 'babylonjs-gui';
import Player from './Player.js'

export default class Game {
  constructor( canvasId ) {
    this.canvas = document.getElementById(canvasId);
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = {};
    this.camera = {};
    this.light = {};
    this.player = new Player()
    this.map = {} //controls map
    this.loaded = false
    this.playerAnimations
  }

  createScene() {
    this.scene = new BABYLON.Scene(this.engine);
    // var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 200, -20), this.scene);
    // camera.attachControl(this.canvas, true);
    var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), this.scene);
    //Create a basic light, aiming 0,1,0 - meaning, to the sky.
    this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
    this.scene.actionManager = new BABYLON.ActionManager(this.scene);
    this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger,  (evt) => {
      this.map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,  (evt) => {
      this.map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    BABYLON.SceneLoader.ImportMesh(null, "/public/models/","world.obj", this.scene, (newMeshes, particleSystems, skeletons) => {
      newMeshes.map((mesh) => {
        mesh.checkCollisions = true;
      })
    })

    let camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0,0,0), this.scene);
    camera.radius = 45;
    camera.heightOffset = 5;
    camera.rotationOffset = 0;
    camera.maxCameraSpeed = 10
    camera.attachControl(this.canvas, true);

    this.player.render(this.scene).then((mesh) => {
      console.log('player added')
      camera.lockedTarget = this.player.mesh;
      this.playerAnimations = this.scene.animationGroups
      this.getAnimationByName("idle").play(true)
      this.loaded = true
    })
    this.scene.collisionsEnabled = true;
    let music = new BABYLON.Sound("Music", "/public/sounds/nature_theme1.mp3", this.scene, null, { loop: true, autoplay: true });
    this.scene.registerAfterRender( () => {
      if (this.player.mesh) {
        if ((this.map["w"] || this.map["W"])) {
          let rotation = this.player.mesh.rotation;
          if(this.player.mesh.rotationQuaternion){
            rotation = this.player.mesh.rotationQuaternion.toEulerAngles();
          }
          rotation.negate();
          this.player.mesh.moveWithCollisions(new BABYLON.Vector3(-parseFloat(Math.sin(rotation.y)) / 1, 0, -parseFloat(Math.cos(rotation.y)) / 1))
          this.getAnimationByName("run").play(true)
        } else {
          this.getAnimationByName("run").stop()
        }
        // if ((this.map[" "])) {
        //   this.player.mesh.position.y += 2
        // };
        if ((this.map["s"] || this.map["s"])) {
          //this.player.mesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,5))
          //this.player.mesh.moveWithCollisions(new BABYLON.Vector3(0, 0, 10))
        };
        if ((this.map["d"] || this.map["D"])) {
          this.player.mesh.rotate(BABYLON.Axis.Y,0.01, BABYLON.Space.WORLD);
        };

        if ((this.map["a"] || this.map["A"])) {
          this.player.mesh.rotate(BABYLON.Axis.Y,-0.01, BABYLON.Space.WORLD)
        };

        this.player.mesh.moveWithCollisions(this.scene.gravity);
      }
    });
  }

  getAnimationByName(name) {
    let animation = null
    this.playerAnimations.forEach((anim) => {
      if (anim.name === name) {
        animation = anim
      }
    })

    return animation
  }

  doRender() {

    // Run the render loop.
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    // The canvas/window resize event handler.
    window.addEventListener('resize', () => {
        this.engine.resize();
    });
  }
}
