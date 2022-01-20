import * as THREE from 'three'
import { config } from './a_config'
import { mobileAndTabletCheck } from "./a_detect_mobile"
import { container, scene } from "./c_scene"

// Camera
export const camera = new THREE.PerspectiveCamera(5, container.clientWidth / container.clientHeight, 0.1, 1000)

camera.position.set(
    mobileAndTabletCheck() ? 65 : (30.959249425953114 - (container.clientWidth / container.clientHeight) * 10) + 25,
    mobileAndTabletCheck() ? 65 : (30.815632089115635 - (container.clientWidth / container.clientHeight) * 10) + 25,
    mobileAndTabletCheck() ? 65 : (30.015528069326546 - (container.clientWidth / container.clientHeight) * 10) + 25
)

scene.add(camera)


/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine))
{ const gui = require('./a_gui')
/**
 * gui.gui
 */
const camgui = gui.gui.addFolder('Camera Position')
camgui.add(camera.position, 'x').min(-150).max(150).step(0.001)
camgui.add(camera.position, 'y').min(-150).max(150).step(0.001)
camgui.add(camera.position, 'z').min(-150).max(150).step(0.001)
}