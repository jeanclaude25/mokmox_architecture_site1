import * as THREE from 'three'
import { isMobile } from './a_detect_mobile'
import * as TWEEN from '@tweenjs/tween.js'
import { loadTexts } from './l_texts'
import { enableScroll, remove_scrollLogic } from './k_events_scroll'
import { tween_time_value } from './i_draw'
import { objectFromRaycast, onlyBackground, pointerConvert } from './i_raycaster'
import { triangleGroup } from './c_scene'

export let trianglesFloat = false
export const scatteredTriangles = []

export const finalTrianglePosition = { x:[],y:[],z:[] }

//1 create boxes

//2 Assign boxes

const mobileOrderList = [
    'box_1',
    'box_2',
    'box_3',
    'box_4',

    'box_8',
    'box_9',
    'box_10',
    'box_11'
]
const pcOrderList = [
    'box_10',
    'box_7',
    'box_11',
    'box_4',

    'box_8',
    'box_1',
    'box_9',
    'box_10'
]
export const carreerDiv = 'box_1'

//3 get boxes'centers
export const getBoxCenter = (div) => {
    const point = {
        x: (div.clientWidth /2) + div.offsetLeft,
        y: (div.clientHeight /2) + div.offsetTop
    }
    return point
}


export const updateBoxesPosition = () => {
    const list = isMobile?mobileOrderList:pcOrderList
    const instance_list = { x:[], y:[], z:[]}

    list.forEach((child)=>{
        //uniformise
    const calibrate = pointerConvert(getBoxCenter(document.getElementById(child)))
        //convert to 3d unit
    const obUnit = objectFromRaycast(calibrate ,onlyBackground)
        
    instance_list.x.push(obUnit[0].point.x)
    instance_list.y.push(obUnit[0].point.y)
    instance_list.z.push(obUnit[0].point.z)

    })
        finalTrianglePosition.x = instance_list.x
        finalTrianglePosition.y = instance_list.y
        finalTrianglePosition.z = instance_list.z
}





// const finalAngle = [-1.3, 0.1, -0.78, -0.78, -0.29, 0.82, 1.04, 0.9]
const finalAngle = [0,0,0,0,0,0,0,0]

const addScale = [0.2, 0.6, 0.8, 0.2, 0.5, 0.1, 0.3, 0.5]


export const triangleAnimation = (time) => {
    
    for (let i = 0; i < scatteredTriangles.length; i++) {
        scatteredTriangles[i].animVar = i
        scatteredTriangles[i].position.y += Math.sin(time + i) / (800 + i * 8)
        scatteredTriangles[i].position.x += Math.sin(time + i) / (800 + i * 8)
        {
            scatteredTriangles[i].scale.x += Math.sin(time + i) / (2200 + i * 8)
            scatteredTriangles[i].scale.y += Math.sin(time + i) / (2200 + i * 8)
            scatteredTriangles[i].scale.z += Math.sin(time + i) / (2200 + i * 8)

        }
    }
}




export const scatterTriangles = (array) => {
    
    console.log(array);
    updateBoxesPosition()
    
    for (let i = 0; i < array.length; i++) {
        
        const position = array[i].position
        const rotation = array[i].rotation
        const oldRotation = array[i].rotation

        array[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0.8).normalize(), finalAngle[i])
        const rotationZ = new THREE.Vector3()
        rotationZ.copy(array[i].rotation)
        array[i].rotation.set(oldRotation.x, oldRotation.y, oldRotation.z)
        
        // const obj2 = {
        //     x: rotationZ.x + Math.PI * 2,
        //     y: rotationZ.y + Math.PI * 2,
        //     z: rotationZ.z + Math.PI * 2,
        // }
        const obj2 = {
                x: 0,
                y: 0,
                z: 0
            }

        const scale = array[i].scale

        const obj3 = {
            x: array[i].scale.x + addScale[i],
            y: array[i].scale.y + addScale[i],
            z: array[i].scale.z + addScale[i],
        }

        new TWEEN.Tween(rotation).to(obj2, 2000).easing(TWEEN.Easing.Quartic.InOut).onComplete( () => {
            trianglesFloat = true
            if (i == array.length - 1) {
                loadTexts()
                enableScroll()
                remove_scrollLogic()
            }
        }).start(tween_time_value)

        let finalPosition = new THREE.Vector3()
        finalPosition.x = finalTrianglePosition.x[i]
        finalPosition.y = finalTrianglePosition.y[i]
        finalPosition.z = finalTrianglePosition.z[i]
        
        //Triangles TWEENS
        new TWEEN.Tween(position).to(finalPosition, 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        new TWEEN.Tween(rotation).to(new THREE.Vector3(0, Math.PI/4 ,0), 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        
        // new TWEEN.Tween(scale).to(obj3, 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        new TWEEN.Tween(scale).to(new THREE.Vector3(0.6,1,1), 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        
        //Zero for GROUP TWEENS
        const trisPosOrigin = triangleGroup.position
        new TWEEN.Tween(trisPosOrigin).to(new THREE.Vector3(0.8,0,0.4), 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        const trisRotOrigin = triangleGroup.rotation
        new TWEEN.Tween(trisRotOrigin).to(new THREE.Vector3(0,0,0), 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        const trisScOrigin = triangleGroup.scale
        new TWEEN.Tween(trisScOrigin).to(new THREE.Vector3(1,1,1), 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
    }
}