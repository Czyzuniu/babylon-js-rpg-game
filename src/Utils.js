import * as BABYLON from "babylonjs";


 class Utils {
  constructor(scene) {
    this.scene = scene
  }


  getAnimationByName(name) {
    let animations = this.scene.animationGroups
    let animation = null
    animations.forEach((anim) => {
      if (anim.name === name) {
        animation = anim
      }
    })

    return animation
  }

}


export default Utils
