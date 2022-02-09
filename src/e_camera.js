import * as THREE from 'three'
import { config } from './a_config'
import { isMobile, mobileAndTabletCheck } from "./a_detect_mobile"
import { container, scene } from "./c_scene"

// Camera
export const camera = new THREE.PerspectiveCamera(5, container.clientWidth / container.clientHeight, 10, 1000)
camera.fov = isMobile()?config.camera.fov.mobile:config.camera.fov.pc
camera.position.set(
    mobileAndTabletCheck() ? 65 : (30.959249425953114 - (container.clientWidth / container.clientHeight) * 10) + 25,
    mobileAndTabletCheck() ? 65 : (30.815632089115635 - (container.clientWidth / container.clientHeight) * 10) + 25,
    mobileAndTabletCheck() ? 65 : (30.015528069326546 - (container.clientWidth / container.clientHeight) * 10) + 25
)

scene.add(camera)

/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){

/**
 * gui.gui
 */
const gui = require('./a_gui')
gui.camgui.add(camera, 'fov').min(1).max(180).step(1)
gui.createPositionGuiDebug(gui.camgui, camera, -150, 150)

}