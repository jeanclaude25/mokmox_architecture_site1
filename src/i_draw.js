import * as THREE from 'three'
import { renderer } from './d_renderer'
import { pyramidGroup, scene } from './c_scene'
import { camera } from './e_camera'
import { controls } from './i_controls'
import { triangleAnimation, trianglesFloat } from './j_animation'
import { animateThisDot, dotToAnimate } from './p_hoverEffect'
import Stats from 'stats.js'

let clock = new THREE.Clock();

export const render = () => {
    stats.begin()
    const time = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    
    if (trianglesFloat)triangleAnimation(time)

    // dotToAnimate.forEach((elem)=> animateThisDot(elem, elem.parent))
    // animateThisDot(dotToAnimate[0], dotToAnimate[0].parent)
    
 
   

    if (pyramidGroup) {
        myScene2.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.005)
    }

    controls.update()
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
    stats.end()
    requestAnimationFrame(render)
    
}