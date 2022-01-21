import * as THREE from 'three'
import { config } from './a_config'
import { container, sizes } from './c_scene'


export const canvas = document.querySelector(config.html.canvasID)

/**
 * Renderer
 */
 export const renderer = new THREE.WebGLRenderer({
    antialias: config.scene.antialias.enable,
    alpha: config.scene.alpha,
    powerPreference:'high-performance'
})

renderer.sortObjects = false;
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(config.scene.pixelRatio) //quality


container.insertBefore(renderer.domElement, container.firstChild)
    