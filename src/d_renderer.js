import * as THREE from 'three'
import { config } from './a_config'
import { container, sizes } from './c_scene'


/**
 * Renderer
 */
 export const renderer = new THREE.WebGLRenderer({
    antialias: config.scene.antialias.enable,
    alpha: config.scene.alpha,
    powerPreference:'high-performance'
})

renderer.sortObjects = true;

export const resizeRenderer = (passe) => {
    passe.setSize(sizes.width, sizes.height)
    passe.setPixelRatio(config.scene.pixelRatio)
} 
resizeRenderer(renderer)

renderer.autoClear = false

container.insertBefore(renderer.domElement, container.firstChild)