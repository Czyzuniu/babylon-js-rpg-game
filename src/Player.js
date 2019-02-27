import * as BABYLON from "babylonjs";


export default class Player {
  constructor() {

  }

  // render(scene) {
  //   this.mesh = BABYLON.MeshBuilder.CreateSphere("mySphere", {diameter: 3}, scene);
  //
  //   let material = new BABYLON.StandardMaterial('playerMaterial', scene);
  //   material.alpha = 1;
  //   material.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
  //   this.mesh.material = material;
  //
  //   return new Promise((res) => {
  //     res(this.mesh)
  //   })
  //
  // }

  // render(scene) {
  //
  //   return new Promise((res) => {
  //     BABYLON.SceneLoader.ImportMesh(null, "/public/models/","Player1.stl", scene, (newMeshes, particleSystems, skeletons) => {
  //       // this.model = newMeshes[0]
  //       // this.mesh = BABYLON.MeshBuilder.CreateBox("box", {height: 10, width:5, depth:5}, scene);
  //       // this.mesh.addChild(this.model);
  //
  //       console.log(newMeshes)
  //       this.mesh = newMeshes[0]
  //       this.mesh.ellipsoid = new BABYLON.Vector3(5, 20, 5);
  //
  //       // this.mesh.scaling = new BABYLON.Vector3(2, 2, 2);
  //       // this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor( this.mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100, restitution: 1, friction:1}, scene);
  //       // // player.material.diffuseTexture  = new BABYLON.Texture( "/public/models/textures/lumberJack_diffuse.png",  scene);
  //       // // // m.material.specularTexture = new BABYLON.Texture( "/file/specular.png", scene);
  //       // // // m.material.ambientTexture  = new BABYLON.Texture( "/file/ambient.png",  scene);
  //       // // // m.material.bumpTexture     = new BABYLON.Texture( "/file/bump.png",     scene);
  //
  //       this.mesh.position.y = 75
  //       this.mesh.position.z = 150
  //
  //
  //       res(this.mesh)
  //     })
  //   })
  //
  // }

  render(scene) {
    return new Promise((res) => {
      BABYLON.SceneLoader.ImportMesh(null, "/public/models/dark_elf/", "Scene.gltf", scene, function (meshes, particleSystems, skeletons) {

      });
    })
  }


}
