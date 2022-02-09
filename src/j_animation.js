import * as THREE from 'three'
import { isMobile } from './a_detect_mobile'
import * as TWEEN from '@tweenjs/tween.js'
import { loadTexts } from './l_texts'
import { enableScroll, remove_scrollLogic, scrollingLogic } from './k_events_scroll'
import { tween_time_value } from './i_draw'
import { objectFromRaycast, onlyBackground, pointerConvert } from './i_raycaster'
import { triangleGroup } from './c_scene'

export let trianglesFloat = false
export const scatteredTriangles = []
/**Approximative and Basis points */
export const finalTrianglePositionMobile = {
    x:[0.5, 3.5, 7.686, 12.09, -6.5, -2.7, -0.38, -0.791],
    y:[6.5, 5.5, 3.74, 2.49, -1.5, -2.5, -4.18, -5.322],
    z:[0, 0, -0.71, 1.308, 0, 0, -0.7, -1.871]
}
export const finalTrianglePositionDesktop = {
    x:[10, 5, 11, 21.5, 13, 16, 19, 9.5],
    y:[-2.5, -0.5, -4.5, -0.5, 1.5, 5.5, -0.7, 3],
    z:[5, -2, 0, 6, 14.5, 14.5, 15, 9]
}

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
    // if(isMobile){
    //     finalTrianglePositionMobile.x = instance_list.x
    //     finalTrianglePositionMobile.y = instance_list.y
    //     finalTrianglePositionMobile.z = instance_list.z
    // // }else{
    //     finalTrianglePositionDesktop.x = instance_list.x
    //     finalTrianglePositionDesktop.y = instance_list.y
    //     finalTrianglePositionDesktop.z = instance_list.z
    // }
    
    console.log(finalTrianglePositionMobile)
    //5 apply to triangles position
}





const finalAngle = [-1.3, 0.1, -0.78, -0.78, -0.29, 0.82, 1.04, 0.9]
// const finalAngle = [0,0,0,0,0,0,0,0]

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
    
    // array.forEach((child)=>{
    //     //Position
    //     //Rotation
    //     const rotQuatWorld = new THREE.Quaternion()
    //     child.getWorldQuaternion(rotQuatWorld)
    //     const rotEulWorld = new THREE.Euler()
    //     rotEulWorld.setFromQuaternion( rotQuatWorld )

    //     triangleGroup.add(child) //Group change

    //     //Apply Position
    //     //Apply Rotation
    //     child.rotation.set(rotEulWorld)


    // })

    for (let i = 0; i < array.length; i++) {
        
        const position = array[i].position
        const rotation = array[i].rotation
        // const quaternion = array[i].quaternion


        
        const oldRotation = array[i].rotation

        array[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0.8).normalize(), finalAngle[i])
        const rotationZ = new THREE.Vector3()
        rotationZ.copy(array[i].rotation)
        array[i].rotation.set(oldRotation.x, oldRotation.y, oldRotation.z)
        
        const obj2 = {
            x: rotationZ.x + Math.PI * 2,
            y: rotationZ.y + Math.PI * 2,
            z: rotationZ.z + Math.PI * 2,
        }
        // const obj2 = {
        //         x: 0,
        //         y: 0,
        //         z: 0
        //     }

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
        if (isMobile()){
            finalPosition.x = finalTrianglePositionMobile.x[i]
            finalPosition.y = finalTrianglePositionMobile.y[i]
            finalPosition.z = finalTrianglePositionMobile.z[i]
        }else{
            finalPosition.x = finalTrianglePositionDesktop.x[i]
            finalPosition.y = finalTrianglePositionDesktop.y[i]
            finalPosition.z = finalTrianglePositionDesktop.z[i]

        }
        
        new TWEEN.Tween(position).to(finalPosition, 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        new TWEEN.Tween(scale).to(obj3, 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)

        

        
    }
}