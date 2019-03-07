import * as BABYLON from "babylonjs";
import Utils from "./Utils";

export default class Entity {
  constructor(scene, modelPath, modelName) {
    this.scene = scene
    this.modelPath = modelPath
    this.modelName = modelName
  }

  move() {

  }

  render() {
    return new Promise((resolve) => {
      BABYLON.SceneLoader.ImportMesh(null,this.modelPath, this.modelName,this.scene, (meshes, particleSystems, skeletons) => {
        resolve(meshes)
      })
    })
  }


}
