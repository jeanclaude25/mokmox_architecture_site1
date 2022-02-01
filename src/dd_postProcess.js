import * as THREE from 'three'

import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'

import { GlitchPass } from './postProcessing/glitchPass/GlitchPass'
import { UnrealBloomPass } from './postProcessing/bloomPass/UnrealBloomPass'
import { SAOPass } from './postProcessing/saoPass/SAOPass'

import glitchCustomVertex from './shaders/glitch/vertex.glsl'
import glitchCustomFragment from './shaders/glitch/fragment.glsl'


import { config } from './a_config'
import { scene, sizes } from './c_scene'
import { renderer } from './d_renderer'
import { camera } from './e_camera'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

export const passes = []

const renderPass = new RenderPass(scene, camera)

/**For glitch pass */
export const glitchCompose = new EffectComposer(renderer)
passes.push(glitchCompose)
glitchCompose.setPixelRatio(config.scene.pixelRatio)
glitchCompose.setSize(sizes.width, sizes.height)
glitchCompose.addPass(renderPass)
// export const glitch = new GlitchPass()
// glitchCompose.addPass(glitch)

// const gl_sao = new SAOPass(scene,camera)
// glitchCompose.addPass(gl_sao)
const glitchShader = {
    uniforms:{
        tDiffuse: {value: null},
        uTime: {value: 0}
    },
    vertexShader: glitchCustomVertex,
    fragmentShader: glitchCustomFragment
}
export const glitchCustomPass = new ShaderPass(glitchShader)
glitchCompose.addPass(glitchCustomPass)
const gl_sao = new SAOPass(scene,camera)
glitchCompose.addPass(gl_sao)


const renderPass2 = new RenderPass(scene, camera)
export const uBloomCompose = new EffectComposer(renderer)
uBloomCompose.setPixelRatio(config.scene.pixelRatio)
uBloomCompose.setSize(sizes.width, sizes.height)
uBloomCompose.addPass(renderPass2)
const uBloom = new UnrealBloomPass()
uBloom.threshold = 0.037
uBloom.radius = 1.952
uBloom.strength = 1.559
// uBloom.bloomTintColors = '#ffffff'
uBloomCompose.addPass(uBloom)
const uB_sao = new SAOPass(scene,camera)
uBloomCompose.addPass(uB_sao)

/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){

    /**
     * gui.gui
     */
    const camgui = require('./a_gui').gui
    
    const posCamGui = camgui.addFolder('MouseOverBlur')
    posCamGui.add(uBloom, 'threshold').min(-0).max(1).step(0.001)
    posCamGui.add(uBloom, 'radius').min(-0).max(2).step(0.001)
    posCamGui.add(uBloom, 'strength').min(0).max(5).step(0.001)
    
    }
