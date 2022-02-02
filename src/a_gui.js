import * as dat from 'dat.gui'
import { config } from './a_config'


const debug = window.location.href.includes(config.debug.commandLine)?true:false;
/**
 * Debug GUI
 */
 export const debugObject = {}

export const gui = debug?new dat.GUI({
    closed: true,
    width: 400,
    
}):''

/**MENU */
export const camgui = debug?gui.addFolder('Camera'):''
export const scateredObjects = debug?gui.addFolder('scateredTriangles'):''

export const textGui = debug?gui.addFolder('Texts'):''

/**Functions */
export const createPositionGuiDebug = (parentFolder, objet, min=-30, max=30, step=0.001) => {
    const pos = parentFolder.addFolder('position')
    pos.add(objet.position, 'x').min(min).max(max).step(step)
    pos.add(objet.position, 'y').min(min).max(max).step(step)
    pos.add(objet.position, 'z').min(min).max(max).step(step)

}
export const createRotationGuiDebug = (parentFolder, objet, min=-Math.PI, max=Math.PI, step=0.001) => {
    const pos = parentFolder.addFolder('rotation')
    pos.add(objet.rotation, 'x').min(min).max(max).step(step)
    pos.add(objet.rotation, 'y').min(min).max(max).step(step)
    pos.add(objet.rotation, 'z').min(min).max(max).step(step)
}

export const createScaleGuiDebug = (parentFolder, objet, min=-0, max=2, step=0.001) => {
    const pos = parentFolder.addFolder('scale')
    pos.add(objet.scale, 'x').min(min).max(max).step(step)
    pos.add(objet.scale, 'y').min(min).max(max).step(step)
    pos.add(objet.scale, 'z').min(min).max(max).step(step)
}