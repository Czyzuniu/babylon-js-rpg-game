import * as BABYLON from "babylonjs";
import Utils from "./Utils";

export default class Entity {
  constructor(scene, modelPath, modelName) {
    this.scene = scene
    this.modelPath = modelPath
    this.modelName = modelName
    this.mesh = null
    this.moveVector = new BABYLON.Vector3(0,this.scene.gravity.y,0)
    this.moveSpeed = 5
  }

  update() {

    // let time = performance.now();
    // // Create a delta value based on current time
    // let delta = ( time - this.prevTime ) / 1000;

  }


  calculateEllipsoid() {
    this.mesh.ellipsoid = new BABYLON.Vector3(15, 3, 15);
  }

  render() {

  }


}
