import * as BABYLON from "babylonjs";
import Utils from "./Utils";
import Entity from "./Entity";

export default class Wolf extends Entity{
  constructor(scene, modelPath, modelName) {
    super(scene,modelPath, modelName)
  }

  update() {
    if (this.mesh) {
      // this.mesh.moveWithCollisions(this.scene.gravity)
    }
  }
  render() {
    return new Promise((resolve) => {
      BABYLON.SceneLoader.ImportMesh(null,this.modelPath, this.modelName,this.scene, (meshes, particleSystems, skeletons) => {
        this.mesh = meshes[0]
        this.mesh.checkCollisions = true;
        this.mesh.position.y = 50
        resolve(meshes)
      })
    })
  }

}
