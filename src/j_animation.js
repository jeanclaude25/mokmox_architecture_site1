import * as THREE from 'three'
import { isMobile } from './a_detect_mobile'
import { raycastDetect } from "./i_raycaster"
import * as TWEEN from '@tweenjs/tween.js'
import { mouse } from './k_events'
import { loadTexts } from './l_texts'
import { enableScroll, scrollingLogic } from './k_events_scroll'
import { controls } from './i_controls'

export let trianglesFloat = false
export const scatteredTriangles = []

export const triangleAnimation = (time) => {
    if(raycastDetect.length!=9){//Add ZeroHover to the Raycast
        Array.prototype.push.apply(raycastDetect, scatteredTriangles)
        console.log(raycastDetect)
    }
    for (let i = 0; i < scatteredTriangles.length; i++) {
        scatteredTriangles[i].position.y += Math.sin(time + i) / (800 + i * 8)
        scatteredTriangles[i].position.x += Math.sin(time + i) / (800 + i * 8)
        {
            scatteredTriangles[i].scale.x += Math.sin(time + i) / (2200 + i * 8)
            scatteredTriangles[i].scale.y += Math.sin(time + i) / (2200 + i * 8)
            scatteredTriangles[i].scale.z += Math.sin(time + i) / (2200 + i * 8)

        }
    }
}


const exitHoveredObject = () =>{
    document.body.style.cursor = 'default'
    if(config.onHover.enableChangeColor && mouse.hovered_object!=undefined){
        mouse.hovered_object.material.color = new THREE.Color(config.onHover.defaultColor)
    
    }
}

const zoomOnObject = (obj) => {
    console.log("ZOOM on "+ obj)
    // controls.target = obj.position

    gsap.to(
        controls.target,{
            duration: 1,
            x: obj.children[0].position.x,
            y: obj.children[0].position.y
        }
    )


    console.log(camera)
}

const thisObjectNeedAnHoverAnim = (object) =>{
    if(object==mouse.hovered_object) return
    console.log("hovered "+ object.name)
    document.body.style.cursor = 'pointer'
    if(config.onHover.enableChangeColor){
        object.material.color = new THREE.Color(config.onHover.hoverColor)
    }
    console.log(object.position)
    
    
}

const restoreValue = () => {

}

export let obj3;
export const scatterTriangles = (array) => {
    console.log(array);
    for (let i = 0; i < array.length; i++) {
        const position = array[i].position


        let obj = { x: 0, y: 0, z: 0 }
        if (i == 0 || i == 1 || i == 2 || i == 3) {
            obj = { x: 2.5 + i * 3, y: i % 2 * 2 - 2.5, z: -2 }
        } else {
            obj = { x: 1 + i * 3, y: 2.5 + i % 2 * 2 - 0.5, z: 15 }
        }






        const rotation = array[i].rotation
        let obj2 = {
            x: 0, y: 0, z: i % 2 == 0 ? Math.PI : 0,
        }
        const oldRotation = array[i].rotation
        let angle = 0
        let scale2 = 0.5
        if (i == 0) {
            scale2 = 0.2
            angle = -5 * Math.PI / 12
            obj.x = 10
            obj.z += 7
        } else if (i == 1) {
            angle = Math.PI / 30
            scale2 = 0.6
            obj.x = 5

        }
        else if (i == 2) {
            scale2 = 0.8
            obj.x = 11
            obj.z += 2
            obj.y -= 2


            angle = - Math.PI / 4
        } else if (i == 3) {
            obj.x = 21.5
            obj.z += 8

            scale2 = 0.2

            angle = - Math.PI / 4
        }
        else if (i == 4) {
            obj.z = 14.5
            obj.y -= 0.5

            scale2 = 0.5



            angle = - Math.PI / 10.5
        }
        else if (i == 5) {
            obj.y += 1.5
            obj.z -= 0.5

            scale2 = 0.1

            angle = Math.PI / 3.8
        }
        else if (i == 6) {
            obj.y -= 2.7
            obj.z = 15

            scale2 = 0

            angle = Math.PI / 3
        } else if (i == 7) {
            angle = Math.PI / 3.5
            obj.y -= 1
            obj.z -= 6
            obj.x -= 12.5
        }


        array[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0.8).normalize(), angle)
        const rotationZ = new THREE.Vector3()
        rotationZ.copy(array[i].rotation)
        array[i].rotation.set(oldRotation.x, oldRotation.y, oldRotation.z)
        obj2 = {
            x: rotationZ.x + Math.PI * 2,
            y: rotationZ.y + Math.PI * 2,
            z: rotationZ.z + Math.PI * 2,
        }






        const scale = array[i].scale

        obj3 = {
            x: array[i].scale.x + scale2,
            y: array[i].scale.y + scale2,
            z: array[i].scale.z + scale2,
        }

        if (isMobile()) {
            obj = {
                x: i - 2.5 + (i < 4 ? 7 : -6) + i * 2 - (i < 4 ? 4 : 10),
                y: i - 2.5 + (i < 4 ? 3 : -1) - i * 2 + 6,
                z: 0,
            }
            if (i == 2) {
                obj.x += 2
            }
            if (i == 7) {
                obj.x -= 2
            }
        }

        new TWEEN.Tween(rotation).to(obj2, 2000).easing(TWEEN.Easing.Quartic.InOut).onComplete( () => {
            trianglesFloat = true
            if (i == array.length - 1) {
                loadTexts()
                enableScroll()

                window.removeEventListener('scroll', scrollingLogic)
                window.removeEventListener('touchmove', scrollingLogic)

            }
        }).start(mouse.logDelta)

        new TWEEN.Tween(position).to(obj, 2000).easing(TWEEN.Easing.Quadratic.InOut).start(mouse.logDelta)

        new TWEEN.Tween(scale).to(obj3, 2000).easing(TWEEN.Easing.Quadratic.InOut).start(mouse.logDelta)

    }
}