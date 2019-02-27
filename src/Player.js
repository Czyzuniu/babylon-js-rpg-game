import * as BABYLON from "babylonjs";


export default class Player {
  constructor() {

  }


  render(scene) {
    return new Promise((res) => {
      BABYLON.SceneLoader.ImportMesh(null, "/public/models/male_adventurer/", "scene.gltf", scene, (meshes, particleSystems, skeletons) => {
        this.mesh = meshes[0]
        this.mesh.scaling = new BABYLON.Vector3(10, 10, -1);
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
