import * as THREE from 'three'
import { renderer } from './d_renderer'
import { canvas, pyramidGroup, scene } from './c_scene'
import { camera } from './e_camera'
import { controls } from './i_controls'
import { triangleAnimation, trianglesFloat } from './j_animation'
import Stats from 'stats.js'
import { config } from './a_config'
import { lineMaterialShader } from './g_materials'
import { BACKGROUND_LAYER, CENTRAL_STRUCTURE_LAYER, FOREGROUND_LAYER, MOUSEOVER_FX_LAYER, TRIANGLES_LAYER } from './cc_layers'
import { glitchCustomPass , glitchCompose} from './dd_postProcess'

import { allow_glitch } from './k_events'
import { allow_auto_tween, disableScroll, ending_tween } from './k_events_scroll'
import { autoTween, updateTween } from './m_tween'
import { checkVisible } from './l_objects'


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
export let tween_time_value = 0

export const render = () => {
    debug?stats.begin():''
    
    const elapsedTime = clock.getElapsedTime()
    lineMaterialShader.uniforms.uTime.value = elapsedTime

    if (trianglesFloat)triangleAnimation(elapsedTime)


    if (pyramidGroup) {
        myScene2.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.005)
    }
    
    // glitch.uniforms.uTime.value = elapsedTime
    glitchCustomPass.uniforms.uTime.value = elapsedTime

    controls.update()
    camera.updateProjectionMatrix()

    camera.layers.set(BACKGROUND_LAYER)
    renderer.render(scene, camera)

    camera.layers.set(CENTRAL_STRUCTURE_LAYER)
    // renderer.render(scene, camera)

    // allow_glitch && ending_tween?
    // glitchCompose.render()
    // :renderer.render(scene, camera)
    glitchCompose.render()

    camera.layers.set(MOUSEOVER_FX_LAYER)
    renderer.render(scene, camera)
    // uBloomCompose.render()

    camera.layers.set(TRIANGLES_LAYER)
    renderer.render(scene, camera)

    camera.layers.set(FOREGROUND_LAYER)
    renderer.render(scene, camera)


    debug?stats.end():''
    requestAnimationFrame(render)

    
    if(allow_auto_tween && !trianglesFloat){
    autoTween( tween_time_value )
    console.log( tween_time_value )
    tween_time_value = Math.round(elapsedTime * 1000)
                
    }
}