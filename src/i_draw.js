import * as THREE from 'three'
import { renderer } from './d_renderer'
import { pyramidGroup, scene } from './c_scene'
import { camera } from './e_camera'
import { controls } from './i_controls'
import { triangleAnimation, trianglesFloat } from './j_animation'


let clock = new THREE.Clock();

export const render = () => {
    // TWEEN.update()
    const time = clock.getElapsedTime()
    
    if (trianglesFloat)triangleAnimation(time)


    // raycaster.setFromCamera(mouse, camera);

    // // calculate objects intersecting the picking ray
    // if(raycastDetect != undefined){

    //     intersects = raycaster.intersectObjects(raycastDetect, true)

    //     if (intersects.length > 0) {
    //         if(intersects[0].object.name!='zeroHover'){
    //             thisObjectNeedAnHoverAnim(intersects[0].object)
    //         }else{
    //             exitHoveredObject()
    //         }
            

    //         mouse.hovered_object = intersects[0].object
    //     }
    // }

    if (pyramidGroup) {
        myScene2.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.005)
    }

    controls.update()
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}