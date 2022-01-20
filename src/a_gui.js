import * as dat from 'dat.gui'


/**
 * Debug GUI
 */
 export const debugObject = {}

export const gui = new dat.GUI({
    closed: true,
    width: 400
})

export const camgui = gui.addFolder('Camera')
