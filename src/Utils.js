import * as BABYLON from "babylonjs";


 class Utils {
  constructor() {

  }


  getAnimationByName(name, animations) {
    let animation = null
    animations.forEach((anim) => {
      if (anim.name === name) {
        animation = anim
      }
    })

    return animation
  }

}


export default new Utils()
