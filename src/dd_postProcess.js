import * as THREE from 'three'

import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'

import { GlitchPass } from './postProcessing/glitchPass/GlitchPass'
import { UnrealBloomPass } from './postProcessing/bloomPass/UnrealBloomPass'
import { SAOPass } from './postProcessing/saoPass/SAOPass'

import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

import { config } from './a_config'
import { scene } from './c_scene'
import { renderer } from './d_renderer'
import { camera } from './e_camera'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'


import backgroundVertexShader from './shaders/background/vertex.glsl' 
import backgroundFragmentShader from './shaders/background/fragment.glsl'


export const passes = []
export const glitchVal = {
    seedX:0.5,
    col_S:0.1
}

/**************NOISE ************************ */
//Third renderpass for noise
const NoiseShader = {
    uniforms: {
        tDiffuse:{ value: null},
        uTime:{value: null},
        uResolution:{value:new THREE.Vector2(60,60)},
        uScale:{value: 10},
        uColMult:{value: new THREE.Vector3(1,1,1)},
        uAlpha:{value: 0.1},
        uHaloIntensity:{value: 1.1},
        uHaloSize:{value:new THREE.Vector2(1,1)}

    },
    vertexShader: backgroundVertexShader,
    fragmentShader: backgroundFragmentShader
}
const renderPass3 = new RenderPass(scene, camera)
export const noiseCompose = new EffectComposer(renderer)
passes.push(noiseCompose)
noiseCompose.addPass(renderPass3)
export const uCustom = new ShaderPass(NoiseShader)
uCustom.material.transparent = true
noiseCompose.addPass(uCustom)
const uB_sao2 = new SAOPass(scene,camera)
noiseCompose.addPass(uB_sao2)


/**For glitch pass */

const renderPass = new RenderPass(scene, camera)
export const glitchCompose = new EffectComposer(renderer)
passes.push(glitchCompose)
glitchCompose.addPass(renderPass)
// const fxaaPass = new ShaderPass( FXAAShader );
// passes.push(fxaaPass)
// glitchCompose.addPass(fxaaPass)

// glitchCompose.addPass(uCustom)
export const glitchCustomPass = new GlitchPass(20)
glitchCustomPass.material.transparent = true
glitchCompose.addPass(glitchCustomPass)


/***************BLOOM*********** */
const renderPass2 = new RenderPass(scene, camera)
export const uBloomCompose = new EffectComposer(renderer)
passes.push(uBloomCompose)
uBloomCompose.addPass(renderPass2)
const uBloom = new UnrealBloomPass()
uBloom.threshold = 0.088
uBloom.radius = 0.058
uBloom.strength = 2.118
uBloomCompose.addPass(uBloom)
// const uB_sao = new SAOPass(scene,camera)
// uBloomCompose.addPass(uB_sao)




/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){

    /**
     * gui.gui
     */
    const camgui = require('./a_gui').gui
    
    // const posCamGui = camgui.addFolder('MouseOverBlur')
    // posCamGui.add(uBloom, 'threshold').min(-0).max(1).step(0.001)
    // posCamGui.add(uBloom, 'radius').min(-0).max(2).step(0.001)
    // posCamGui.add(uBloom, 'strength').min(0).max(5).step(0.001)

    const glitchGui = camgui.addFolder('Glitch')
    glitchGui.add(glitchCustomPass.uniforms.amount, 'value').min(0).max(1).step(0.0001).name('amount')
    glitchGui.add(glitchCustomPass.uniforms.angle, 'value').min(-Math.PI).max(Math.PI).step(0.001).name('angle')
    glitchGui.add(glitchCustomPass.uniforms.seed, 'value').min(0).max(10).step(0.001).name('seed')
    glitchGui.add(glitchVal, 'seedX').min(-1).max(1).step(0.0001).name('seed_x')
    glitchGui.add(glitchCustomPass.uniforms.seed_y, 'value').min(-1).max(1).step(0.001).name('seed_y')
    glitchGui.add(glitchCustomPass.uniforms.distortion_x, 'value').min(0).max(1).step(0.001).name('distortion_x')
    glitchGui.add(glitchCustomPass.uniforms.distortion_y, 'value').min(0).max(1).step(0.001).name('distortion_y')
    glitchGui.add(glitchVal, 'col_S').min(0).max(1).step(0.0001).name('col_s')
    glitchGui.add(glitchCustomPass.uniforms.uMultiplier, 'value').min(0).max(1000).step(0.001).name('multiplier')
    
    const noiseGui = camgui.addFolder('Noise')
    noiseGui.add(uCustom.uniforms.uAlpha, 'value').min(0).max(1).step(0.001).name('alpha')
    noiseGui.add(uCustom.uniforms.uScale, 'value').min(1).max(20).step(0.001).name('scale')

    const resoGui = noiseGui.addFolder('Resolution')
    resoGui.add(uCustom.uniforms.uResolution.value, 'x').min(1).max(120).step(0.001)
    resoGui.add(uCustom.uniforms.uResolution.value, 'y').min(1).max(120).step(0.001)
    
    const colGui = noiseGui.addFolder('color')
    colGui.add(uCustom.uniforms.uColMult.value, 'x').min(-0).max(2).step(0.001).name('r')
    colGui.add(uCustom.uniforms.uColMult.value, 'y').min(-0).max(2).step(0.001).name('g')
    colGui.add(uCustom.uniforms.uColMult.value, 'z').min(-0).max(2).step(0.001).name('b')
    
    const haloGui = noiseGui.addFolder('Halo')
    haloGui.add(uCustom.uniforms.uHaloIntensity, 'value').min(0).max(2).step(0.001).name('intensity')
    haloGui.add(uCustom.uniforms.uHaloSize.value, 'x').min(0).max(2).step(0.001)
    haloGui.add(uCustom.uniforms.uHaloSize.value, 'y').min(0).max(2).step(0.001)


    }
