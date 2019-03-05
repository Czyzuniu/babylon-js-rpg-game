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
    this.map = {} //controls map
    this.loaded = false
    this.playerAnimations
  }

  createScene() {
    this.scene = new BABYLON.Scene(this.engine);
    this.player = new Player(this.scene)
    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 200, -20), this.scene);
    camera.attachControl(this.canvas, true);
    var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), this.scene);
    //Create a basic light, aiming 0,1,0 - meaning, to the sky.
    this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
    this.scene.gravity = new BABYLON.Vector3(0,-0.98,0)


    BABYLON.SceneLoader.ImportMesh(null, "/public/models/","world3.obj", this.scene, (newMeshes, particleSystems, skeletons) => {
      newMeshes.map((mesh) => {
        if (mesh.id == "Grid") {
          this.ground = mesh
        }
        mesh.checkCollisions = true;
      })
    })


    // let camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0,0,0), this.scene);
    // camera.radius = 45;
    // camera.heightOffset = 5;
    // camera.rotationOffset = 0;
    // camera.maxCameraSpeed = 10
    // camera.attachControl(this.canvas, true);

    this.player.render(this.scene).then((mesh) => {
      console.log('player added')
      // camera.lockedTarget = this.player.mesh;
      this.player.setAnimations(this.scene.animationGroups)
      this.loaded = true
    })
    this.scene.collisionsEnabled = true;
    //let music = new BABYLON.Sound("Music", "/public/sounds/nature_theme1.mp3", this.scene, null, { loop: true, autoplay: true });

  }


  doRender() {

    // Run the render loop.
    this.engine.runRenderLoop(() => {
      this.player.move()
      this.scene.render();
    });

    // The canvas/window resize event handler.
    window.addEventListener('resize', () => {
        this.engine.resize();
    });
  }
}
