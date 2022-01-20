import * as THREE from 'three'
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
