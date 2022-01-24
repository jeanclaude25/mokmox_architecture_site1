import * as THREE from 'three'
import { config } from './a_config'
import { mobileAndTabletCheck } from "./a_detect_mobile"
import { container, scene } from "./c_scene"

// Camera
export const camera = new THREE.PerspectiveCamera(config.camera.fov, container.clientWidth / container.clientHeight, 10, 100)

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
const camgui = require('./a_gui').camgui
camgui.add(camera, 'fov').min(1).max(180).step(1)

const posCamGui = camgui.addFolder('position')
posCamGui.add(camera.position, 'x').min(-150).max(150).step(0.001)
posCamGui.add(camera.position, 'y').min(-150).max(150).step(0.001)
posCamGui.add(camera.position, 'z').min(-150).max(150).step(0.001)

}