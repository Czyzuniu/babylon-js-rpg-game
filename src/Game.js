import CANNON from 'cannon';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as GUI from 'babylonjs-gui';
import Player from './Player.js'
import Entity from "./Entity";
import Wolf from "./Wolf";

export default class Game {
  constructor( canvasId ) {
    this.canvas = document.getElementById(canvasId);
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = {};
    this.camera = {};
    this.light = {};
    this.map = {} //controls map
    this.loaded = false
    this.GUIControls = {}


    this.gameMobs = []
  }

  createScene() {
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.collidableMeshList = []
    this.player = new Player(this.scene)
    // var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 200, -20), this.scene);
    // camera.attachControl(this.canvas, true);
    const light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -10, 2), this.scene);
    // //Create a basic light, aiming 0,1,0 - meaning, to the sky.
    this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
    this.scene.gravity = new BABYLON.Vector3(0,-0.98,0)

    BABYLON.SceneLoader.ImportMesh(null, "/public/models/World/","world3.obj", this.scene, (newMeshes, particleSystems, skeletons) => {
      newMeshes.map((mesh) => {
        mesh.checkCollisions = true;
        if (mesh.name === 'Grid') {
          mesh.receiveShadows = true;
        } else {
          shadowGenerator.getShadowMap().renderList.push(mesh);
        }
      })
    })

    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light0);

    const options = new BABYLON.SceneOptimizerOptions();
    options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));

    // Optimizer
    const optimizer = new BABYLON.SceneOptimizer(this.scene, options);

    for (let i = 0; i < 5; i++) {
      let wolf = new Wolf(this.scene, "/public/models/wolf/", "wolf.obj")
      wolf.render().then((res) => {
        this.gameMobs.push(wolf)
      })
    }


    let camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0,0,0), this.scene);
    camera.radius = 10;
    camera.heightOffset = 2;
    camera.rotationOffset = 0;
    camera.maxCameraSpeed = 10
    camera.attachControl(this.canvas, true);

    this.player.render(this.scene).then((mesh) => {
      console.log('player added')
      camera.lockedTarget = this.player.mesh;
      this.initializeGui()
      this.loaded = true
    })
    this.scene.collisionsEnabled = true;
    let music = new BABYLON.Sound("Music", "/public/sounds/forest.mp3", this.scene, null, { loop: true, autoplay: true });

    this.createSkyBox()

  }

  createSkyBox() {
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:10000.0}, this.scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/public/images/skyboxsun25deg/", this.scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
  }


  initializeGui() {
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("gameUI");


    const healthContainer = new BABYLON.GUI.Rectangle();
    healthContainer.width = 0.2;
    healthContainer.height = "40px";
    healthContainer.cornerRadius = 20;
    healthContainer.color = "black";
    healthContainer.thickness = 1;
    healthContainer.background = "red";
    healthContainer.left = '-35%'
    healthContainer.top = '-40%'

    const healthPoints = new BABYLON.GUI.TextBlock();
    healthPoints.text = `${this.player.getStat('hp').toString()} / 100`;
    healthPoints.color = "white";
    healthPoints.fontSize = 24;

    this.GUIControls = {
      'hp':healthPoints
    }

    healthContainer.addControl(healthPoints)
    advancedTexture.addControl(healthContainer);
  }

    updateGui() {
      if (this.loaded) {
        this.GUIControls['hp'].text = `${this.player.getStat('hp').toString()} / 100`;
      }
    }


    doRender() {
    // Run the render loop.
    this.engine.runRenderLoop(() => {
      this.player.move()
      this.updateGui()
      this.scene.render();
      for (let i of this.gameMobs) {
        i.update()
      }
    });

    // The canvas/window resize event handler.
    window.addEventListener('resize', () => {
        this.engine.resize();
    });
  }
}


var renderingZone = document.getElementById("renderCanvas");
var isFullScreen = false;

document.addEventListener("fullscreenchange", onFullScreenChange, false);
document.addEventListener("mozfullscreenchange", onFullScreenChange, false);
document.addEventListener("webkitfullscreenchange", onFullScreenChange, false);
document.addEventListener("msfullscreenchange", onFullScreenChange, false);

function onFullScreenChange() {
  if (document.fullscreen !== undefined) {
    isFullScreen = document.fullscreen;
  } else if (document.mozFullScreen !== undefined) {
    isFullScreen = document.mozFullScreen;
  } else if (document.webkitIsFullScreen !== undefined) {
    isFullScreen = document.webkitIsFullScreen;
  } else if (document.msIsFullScreen !== undefined) {
    isFullScreen = document.msIsFullScreen;
  }
}

function switchFullscreen() {
  if (!isFullScreen) {
    BABYLON.Tools.RequestFullscreen(renderingZone);
  }
  else {
    BABYLON.Tools.ExitFullscreen();
  }
};



