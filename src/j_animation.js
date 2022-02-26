import * as THREE from 'three'
import { isMobile } from './a_detect_mobile'
import * as TWEEN from '@tweenjs/tween.js'
import { loadTexts } from './l_texts'
import { enableScroll, remove_scrollLogic } from './k_events_scroll'
import { tween_time_value } from './i_draw'
import { objectFromRaycast, onlyBackground, pointerConvert } from './i_raycaster'
import { container, triangleGroup } from './c_scene'
import { renderer } from './d_renderer'

export let trianglesFloat = false
export const scatteredTriangles = []

export const finalTrianglePosition = { x:[],y:[],z:[] }

export const offsetPositionMobile = {
    x:[-0.4, 0, 0.2, 0.2, 0, 0, 0.2, 0.2],
    y:[0.3, 0.5, 1.5, 0.5, 0.5, 0.5, 0.5, 0],
    z:[0, 0, 0, 0, 0, 0, 0, 0]
}
export const offsetPositionComputer = {
    x:[0.1, 0.6, 0.5, 0.4, -0.3, -0.23, -0.77, -0.2],
    y:[0.5, 0.7, 0, 0.7, 0, 0.3, -0.1, 0.4],
    z:[0, 0, 0, 0, 0.3, 0, 0, 0.4]
}
const gScale = [0.65, 0.7, 0.75, 0.65, 0.7, 0.7, 0.65, 0.7]
const finalAngle = [-0.615, 0.94, -3.114, 0.05, 0.5, -2.6, 0.769, 0.71]

//1 create boxes

//'CAREERS', 'CLIENTS', 'BROCHURES', 'CONTACTS'
// 'ABOUT+US', 'NEWS', 'GALLERY', 'OUR+WORK'

//2 Assign boxes div
const mobileOrderList = [
    'box_12', 'box_13', 'box_14', 'box_15',
    'box_52', 'box_53', 'box_54', 'box_55'
]
const pcOrderList = [
    'box_54', 'box_34', 'box_35', 'box_25',
    'box_41', 'box_11', 'box_53', 'box_32'
]
const getBoxesList = () => isMobile()?mobileOrderList:pcOrderList

//Get box size
const getBoxSizes = (div) => {
    const sizes = {
        x: div.clientWidth,
        y: div.clientHeight
    }
    return sizes
}
//3 get boxes'centers
const getBoxCenter = (div) => {
    const rect = renderer.domElement.getBoundingClientRect();
    const point = {
        x: (div.clientWidth /2) + div.offsetLeft + rect.left,
        // y: (div.clientHeight /2) + div.offsetTop + rect.top 

        y: (div.clientHeight /2) + div.offsetTop + rect.top - container.clientHeight
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

const updateBoxesPosition = () => {
    const list = getBoxesList()
    const instance_list = { x:[], y:[], z:[]}
    list.forEach((child, index)=>{
        //uniformise
    const calibrate = pointerConvert(getBoxCenter(document.getElementById(child)))  
    const obUnit = objectFromRaycast(calibrate ,onlyBackground)

    instance_list.x.push(obUnit[0].point.x)
    instance_list.y.push(obUnit[0].point.y)
    instance_list.z.push(obUnit[0].point.z)
    })

        finalTrianglePosition.x = instance_list.x
        finalTrianglePosition.y = instance_list.y 
        finalTrianglePosition.z = instance_list.z
}

export const finalTrianglePositionCalc = (i) => {
    updateBoxesPosition()
    let position = new THREE.Vector3()
    if(isMobile()){
        console.log("mobile")
    position.x = finalTrianglePosition.x[i] + offsetPositionMobile.x[i]
    position.y = finalTrianglePosition.y[i] + offsetPositionMobile.y[i]
    position.z = finalTrianglePosition.z[i] + offsetPositionMobile.z[i]
    }else{
        console.log("pc")

    position.x = finalTrianglePosition.x[i] + offsetPositionComputer.x[i]
    position.y = finalTrianglePosition.y[i] + offsetPositionComputer.y[i]
    position.z = finalTrianglePosition.z[i] + offsetPositionComputer.z[i]
     
    }
    
    return position
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
            // scatteredTriangles[i].scale.z += Math.sin(time + i) / (2200 + i * 8)

        }
    }
    }
}


export const scatterTriangles = (array) => {
    
    console.log(array);
    
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

        const finalPosition = finalTrianglePositionCalc(i)
        
        const rotationValue = finalAngle[i]//0.26 for straight
        if(Math.abs(rotationValue)>1.7){
            //revert
            array[i].textRevert = true
        }else{
            //ne pas revert
            array[i].textRevert = false
        }
        //Triangles TWEENS
        const tour = 2* Math.PI
        const sens = Math.random()>0.5?1:-1
        new TWEEN.Tween(position).to(finalPosition, 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        new TWEEN.Tween(rotation).to(new THREE.Vector3(-Math.PI/7.5 , Math.PI/4 , rotationValue + (tour * sens)), 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        
        new TWEEN.Tween(scale).to(new THREE.Vector3(0.6*gScale[i],1*gScale[i],1*gScale[i]), 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        
        //Zero for GROUP TWEENS
        const trisPosOrigin = triangleGroup.position
        new TWEEN.Tween(trisPosOrigin).to(new THREE.Vector3(5,3.97,4.5), 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        const trisRotOrigin = triangleGroup.rotation
        new TWEEN.Tween(trisRotOrigin).to(new THREE.Vector3(0,0,0), 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        const trisScOrigin = triangleGroup.scale
        new TWEEN.Tween(trisScOrigin).to(new THREE.Vector3(1,1,1), 2000).easing(TWEEN.Easing.Quadratic.InOut).start(tween_time_value)
        
    }
}