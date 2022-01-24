import * as THREE from 'three'
import { config } from './a_config'

// Canvas
export const canvas = document.querySelector(config.html.canvas||'#container')
export const container = document.getElementById('container')

//Html canvas size
export const sizes = {
            width: null ,
            height: null
}
export const refreshSizes = () => {
    sizes.width = container.clientWidth
    sizes.height = container.clientHeight > 10 ? container.clientHeight : window.innerHeight
    if (container.clientHeight == 1) container.style.height = window.innerHeight.toString() + 'px'
}
refreshSizes()

// Scene
export const scene = new THREE.Scene()
scene.position.x -= 0.4

//create Groups
export const myScene = new THREE.Group()
export const otherGroup = new THREE.Group()
export const myScene2 = new THREE.Group()
export const tGroup = new THREE.Group()
export const textGroup = new THREE.Group()


//Add both to the main scene
myScene2.add(myScene)

myScene.add(otherGroup)



scene.add(myScene2)
scene.add(textGroup)

export let pyramidGroup;



/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){ 
    
    const gui = require('./a_gui')
/**
 * gui.gui
 */
const camgui = gui.gui.addFolder('Scene Groups')
camgui.add(myScene, 'visible').name('myScene')
camgui.add(myScene2, 'visible').name('myScene2')
camgui.add(otherGroup, 'visible').name('otherGroup')
camgui.add(tGroup, 'visible').name('tGroup')
camgui.add(textGroup, 'visible').name('textGroup')


}