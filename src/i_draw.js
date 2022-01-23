import * as THREE from 'three'
import { renderer } from './d_renderer'
import { otherGroup, pyramidGroup, scene, tGroup } from './c_scene'
import { camera } from './e_camera'
import { controls } from './i_controls'
import { triangleAnimation, trianglesFloat } from './j_animation'
import { dot, fixThisDot } from './p_hoverEffect'
import Stats from 'stats.js'
import { config } from './a_config'
import { Allow_fixing, hovered_objects } from './k_events'
import { lineMaterialShader } from './g_materials'


export let actual_anim_state;

/**FOR DEBUG */
const debug = window.location.href.includes(config.debug.commandLine)

/**
 * Stats
 */

    const stats = debug? new Stats() :''
    debug?document.body.appendChild(stats.dom):''




let clock = new THREE.Clock()
let previousTime = 0


export const render = () => {
    debug?stats.begin():''
    
    const elapsedTime = clock.getElapsedTime()
    lineMaterialShader.uniforms.uTime.value = elapsedTime

    if (trianglesFloat)triangleAnimation(elapsedTime)

    if(Allow_fixing && hovered_objects.name != 'zeroHover'){
        dot.animVar = hovered_objects.animVar
        actual_anim_state = Math.round(elapsedTime * 1/config.onHover.timeForLine)%3
        fixThisDot(hovered_objects, actual_anim_state)
    }


    if (pyramidGroup) {
        myScene2.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.005)
    }

    controls.update()
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
    // renderer.render(tGroup,camera)
    // renderer.autoClear = false 

    // effectComposer.render()
    debug?stats.end():''
    requestAnimationFrame(render)
    
}