import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as GUI from 'babylonjs-gui';

export default class Game {
  constructor( canvasId ){
    this.canvas = document.getElementById( canvasId );
    this.engine = new BABYLON.Engine( this.canvas, true );
    this.scene = {};
    this.camera = {};
    this.light = {};
  }

  createScene() {
    // Create a basic BJS Scene object.
    this.scene = new BABYLON.Scene(this.engine);
    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), this.scene);
    // Target the camera to scene origin.
    this.camera.setTarget(BABYLON.Vector3.Zero());
    // Attach the camera to the canvas.
    this.camera.attachControl(this.canvas, false);
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
    // Create a built-in "sphere" shape; with 16 segments and diameter of 2.
    let sphere = BABYLON.MeshBuilder.CreateSphere('sphere',
                                {segments: 16, diameter: 2}, this.scene);
    // Move the sphere upward 1/2 of its height.
    sphere.position.y = 1;
    // Create a built-in "ground" shape.
    let ground = BABYLON.MeshBuilder.CreateGround('ground',
                                {width: 6, height: 6, subdivisions: 2}, this.scene);
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