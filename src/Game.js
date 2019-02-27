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
    // Create a basic BJS Scene object.
    this.scene = new BABYLON.Scene(this.engine);
    //this.scene.enablePhysics();
   // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).

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



    var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0,0,0), this.scene);

// The goal distance of camera from target
    camera.radius = 5;

// The goal height of camera above local origin (centre) of target
    camera.heightOffset = -0.5;

// The goal rotation of camera around local origin (centre) of target in x y plane
    camera.rotationOffset = 0;


// The speed at which acceleration is halted
    camera.maxCameraSpeed = 10

// This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);

    // this.player.render(this.scene).then((mesh) => {
    //   console.log('player added')
    //   camera.lockedTarget = this.player.mesh;
    //   this.loaded = true
    // })
    //
    BABYLON.SceneLoader.ImportMesh(null, "/public/models/male_adventurer/", "Scene.gltf", this.scene, (meshes, particleSystems, skeletons) => {
          this.player.mesh = meshes[0]
          //this.player.mesh.scaling.multiply(new BABYLON.Vector3(50, 50, 50))
          this.player.mesh.position.y = 100
          camera.lockedTarget = this.player.mesh;
          this.playerAnimations = this.scene.animationGroups
          this.getAnimationByName("idle").play(true)
    })

    this.scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    this.scene.collisionsEnabled = true;
    //let music = new BABYLON.Sound("Music", "/public/sounds/nature_theme1.mp3", this.scene, null, { loop: true, autoplay: true });


      this.scene.registerAfterRender( () => {
        //let directionVector = direction.subtract(this.player.mesh.position);

        if (this.player.mesh) {
          if ((this.map["w"] || this.map["W"])) {

            var rotation = this.player.mesh.rotation;
            if(this.player.mesh.rotationQuaternion){
              rotation = this.player.mesh.rotationQuaternion.toEulerAngles();
            }
            rotation.negate();
            var forwards = new BABYLON.Vector3(-parseFloat(Math.sin(rotation.y)) / 1, 0, -parseFloat(Math.cos(rotation.y)) / 1);
            this.player.mesh.moveWithCollisions(forwards)

            this.getAnimationByName("run").play(true)

            //this.player.mesh.translate(new BABYLON.Vector3(0, 0, -1), 2, BABYLON.Space.LOCAL);
            // this.player.mesh.position.z += speed
          } else {
            this.getAnimationByName("run").stop()
          }
          // if ((this.map[" "])) {
          //   console.log(this.player.mesh.position)
          //   this.player.mesh.position.y -= -2
          // };
          if ((this.map["s"] || this.map["s"])) {
            //this.player.mesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,5))
            //this.player.mesh.moveWithCollisions(new BABYLON.Vector3(0, 0, 10))
          };
          if ((this.map["d"] || this.map["D"])) {
            this.player.mesh.rotate(BABYLON.Axis.Y,0.01, BABYLON.Space.WORLD);
          };

          if ((this.map["a"] || this.map["A"])) {
            this.player.mesh.rotate(BABYLON.Axis.Y,-0.01, BABYLON.Space.WORLD);
          };

          this.player.mesh.moveWithCollisions( new BABYLON.Vector3(0, -0.9, 0));
        }
      });
  }

  getAnimationByName(name) {
    console.log(name)
    let animation = null
    this.playerAnimations.forEach((anim) => {
      if (anim.name === name) {
        console.log(anim, 'tutaj')
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
