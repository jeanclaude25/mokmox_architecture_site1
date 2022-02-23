import * as THREE from 'three'
import { renderer } from './d_renderer'
import { pyramidGroup, scene } from './c_scene'
import { camera } from './e_camera'
import { controls } from './i_controls'
import { triangleAnimation, trianglesFloat } from './j_animation'
import Stats from 'stats.js'
import { config } from './a_config'
import { lineMaterialShader } from './g_materials'
import { BACKGROUND_LAYER, CENTRAL_STRUCTURE_LAYER, FOREGROUND_LAYER, MOUSEOVER_FX_LAYER, TRIANGLES_LAYER } from './cc_layers'
import { glitchCustomPass , glitchCompose, uBloomCompose, noiseCompose, uCustom} from './dd_postProcess'

import { allow_glitch, hovered_objects } from './k_events'
import { allow_auto_tween, ending_tween} from './k_events_scroll'
import { autoTween } from './m_tween'


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

    if (trianglesFloat && config.assets.enableTriangleAnim)triangleAnimation(elapsedTime)


    if (pyramidGroup) {
        myScene2.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.005)
    }
    


    uCustom.uniforms.u_time.value = elapsedTime

    controls.update()
    camera.updateProjectionMatrix()


    if(allow_glitch){
        renderGlitch()
    }else{
        if(hovered_objects){
            if(hovered_objects.name !== 'zeroHover'){
                renderBloom()
                // renderAll()
            }else{
                renderAll()
            }
        }
        
        }

    debug?stats.end():''
    requestAnimationFrame(render)

    
    if(allow_auto_tween && !trianglesFloat){
    autoTween( tween_time_value )
    tween_time_value = Math.round(elapsedTime * 1000)
                
    }
}
const renderBloom = () => {
    // noiseCompose.render()

    camera.layers.set(MOUSEOVER_FX_LAYER)

    renderer.render(scene, camera)
    uBloomCompose.render(scene, camera)

    camera.layers.enableAll()
    renderer.render(scene, camera)

}
const renderAll = () => {
    // noiseCompose.render()

    camera.layers.enableAll()
    renderer.render(scene, camera)
    
}
const renderGlitch = () => {
    // noiseCompose.render()


    camera.layers.set(CENTRAL_STRUCTURE_LAYER)

    if(allow_glitch && ending_tween && trianglesFloat){
        glitchCompose.render()
    }else{
        glitchCustomPass.uniforms.seed_x.value = Math.random(0,1)
        glitchCustomPass.uniforms.col_s.value = Math.random(0,1)/5 + 0.05
        renderer.render(scene, camera)
    }

    camera.layers.set(MOUSEOVER_FX_LAYER)
    renderer.render(scene, camera)
    
    camera.layers.set(BACKGROUND_LAYER)
    renderer.render(scene, camera)

    camera.layers.set(TRIANGLES_LAYER)
    renderer.render(scene, camera)

    camera.layers.set(FOREGROUND_LAYER)
    renderer.render(scene, camera)
}