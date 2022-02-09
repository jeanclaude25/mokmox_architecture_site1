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
export const offsetPosition = {
    x:[0, 0.2, 0.1, -0.2, 0, 0, -0.2, 0],
    y:[0.6, 0.5, 1.5, -0.2, 0, 0, -0.75, -1],
    z:[0, 0, 0, 0, 0, 0, -0.5, -0.1]
}
const finalAngle = [-0.3, 0.8, -Math.PI, 0.05, 0.5, -2.6, 0.8, 0.6]

//1 create boxes

//2 Assign boxes div
const mobileOrderList = [
    'box_1', 'box_2', 'box_3', 'box_4',
    'box_8', 'box_9', 'box_10', 'box_11'
]
const pcOrderList = [
    'box_10', 'box_7', 'box_11', 'box_4',
    'box_8', 'box_1', 'box_9', 'box_5'
]
const getBoxesList = () => isMobile()?mobileOrderList:pcOrderList

//3 get boxes'centers
const getBoxCenter = (div) => {
    const point = {
        x: (div.clientWidth /2) + div.offsetLeft,
        y: (div.clientHeight /2) + div.offsetTop
    }
    return point
}
export const getBoxCenterList = () =>{
    const bList = getBoxesList()
    const centerList = []
    bList.forEach((child)=>{
        const point = getBoxCenter(document.getElementById(child))
        centerList.push(point)
    })
    return centerList
}

export const updateBoxesPosition = () => {
    const list = getBoxesList()
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






export const triangleAnimation = (time) => {
    
    for (let i = 0; i < scatteredTriangles.length; i++) {
        if(!scatteredTriangles[i].hovered){
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
}


export const scatterTriangles = (array) => {
    
    console.log(array);
    updateBoxesPosition()
    
    for (let i = 0; i < array.length; i++) {
        
        const position = array[i].position
        const rotation = array[i].rotation
        const oldRotation = array[i].rotation
        const scale = array[i].scale

        const rotationZ = new THREE.Vector3()
        rotationZ.copy(array[i].rotation)
        array[i].rotation.set(oldRotation.x, oldRotation.y, oldRotation.z)
        
        const obj2 = {
            x: rotationZ.x + Math.PI * 2,
            y: rotationZ.y + Math.PI * 2,
            z: rotationZ.z + Math.PI * 2,
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
        finalPosition.x = finalTrianglePosition.x[i] + offsetPosition.x[i]
        finalPosition.y = finalTrianglePosition.y[i] + offsetPosition.y[i]
        finalPosition.z = finalTrianglePosition.z[i] + offsetPosition.z[i]
        
        const rotationValue = finalAngle[i]//0.26 for straight
        if(Math.abs(rotationValue)>1.7){
            //revert
            array[i].textRevert = true
        }else{
            //ne pas revert
            array[i].textRevert = false
        }
        //Triangles TWEENS
        new TWEEN.Tween(position).to(finalPosition, 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        new TWEEN.Tween(rotation).to(new THREE.Vector3(-Math.PI/7.5, Math.PI/4 , rotationValue), 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        
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