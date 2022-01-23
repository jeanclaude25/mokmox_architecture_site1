import * as THREE from 'three'
import linesHoverVertexShader from './shaders/linesHover/vertex.glsl' 
import linesHoverFragmentShader from './shaders/linesHover/fragment.glsl' 
import gsap from 'gsap/all'
import { config } from './a_config'

export const changeMaterialColor = (material, time , temp_color) => {

    const color = new THREE.Color(temp_color)
        
        gsap.to(
            material.color,{
                duration: time,
                r: color.r,
                g: color.g,
                b: color.b
            }
        )
}

/**MATERIALS */
export const lineMaterialShader = new THREE.RawShaderMaterial({
    vertexShader: linesHoverVertexShader,
    fragmentShader: linesHoverFragmentShader,
    // transparent:true,
    // depthTest: false,
    side: THREE.DoubleSide,
    uniforms:{
        uOpacity: { value: 1.0},
        uSizeRail: {value: 6.0},
        uRotation: {value: 0.5},
        uColor: {value: new THREE.Color('blue')},
        uTime: {value: config.onHover.timeForLine},
        uMultiplier : {value: 1.0}
    }
})
/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){

    /**
     * gui.gui
     */
    const camgui = require('./a_gui').gui
    
    const shaderGui = camgui.addFolder('Rail')
    shaderGui.add(lineMaterialShader.uniforms.uOpacity, 'value').name('opacity').min(0).max(1).step(0.001)
    shaderGui.add(lineMaterialShader.uniforms.uSizeRail, 'value').name('Size Rails').min(-6).max(6).step(0.001)
    shaderGui.add(lineMaterialShader.uniforms.uRotation, 'value').name('rotation').min(-3).max(3).step(0.001)
    shaderGui.add(lineMaterialShader.uniforms.uMultiplier, 'value').name('Speed').min(0).max(2).step(0.001)
    
    lineMaterialShader.uniforms.color255 = {value: new THREE.Color('blue')}
    shaderGui.addColor(lineMaterialShader.uniforms.color255, 'value')
    .name('color')
    .onChange(()=>{
        lineMaterialShader.uniforms.uColor.value.r = lineMaterialShader.uniforms.color255.value.r /255
        lineMaterialShader.uniforms.uColor.value.g = lineMaterialShader.uniforms.color255.value.g /255
        lineMaterialShader.uniforms.uColor.value.b = lineMaterialShader.uniforms.color255.value.b /255
     })


}