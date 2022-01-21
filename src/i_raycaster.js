import * as THREE from 'three'
import { scene } from "./c_scene";
import { renderer } from './d_renderer';
import { camera } from './e_camera'
import { loaded_objects } from './m_tween';

//Take scroll.width to be more accurate or use something like locomotive
export const pointerConvert = (pointer,window) => {
    const rect = renderer.domElement.getBoundingClientRect();
    return {
            x: (pointer.x - rect.left) / (rect.width - rect.left) * 2 - 1, 
            y: -((pointer.y - rect.top)/ (rect.bottom - rect.top)) * 2 + 1
            }
}


 const raycaster = new THREE.Raycaster()
 export const positionFromRaycast = {x:null,y:null,z:null}

 export const objectFromRaycast = (pointerFormatted, temp_arrayObjects) => {
    const arrayObjects = temp_arrayObjects || loaded_objects

    raycaster.setFromCamera(pointerFormatted, camera)
    const intersects = raycaster.intersectObjects(arrayObjects)
    if(intersects[0] != undefined){
    if(intersects[0].point != undefined){
       positionFromRaycast.x = intersects[0].point.x
       positionFromRaycast.y = intersects[0].point.y
      }
   }

   return intersects
 }
    



        const geometry = new THREE.PlaneBufferGeometry( 100, 100 )
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00, visible:false} )
        const plane = new THREE.Mesh( geometry, material );
        plane.name = 'zeroHover'
        plane.position.z = -1
        loaded_objects.push(plane)
        export const raycastDetect = [plane]
        scene.add( plane )