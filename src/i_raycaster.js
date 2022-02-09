import * as THREE from 'three'
import { config } from './a_config';
import { TRIANGLES_LAYER } from './cc_layers';
import { scene, sizes } from "./c_scene";
import { renderer } from './d_renderer';
import { camera } from './e_camera'
import { loaded_objects } from './m_tween';

export const onlyBackground = []
//Take scroll.width to be more accurate or use something like locomotive
export const pointerConvert = (pointer,window) => {
    const rect = renderer.domElement.getBoundingClientRect();
    return {
            x: (pointer.x - rect.left) / (rect.width - rect.left) * 2 - 1, 
            y: -((pointer.y - rect.top)/ (rect.bottom - rect.top)) * 2 + 1
            }
}


 const raycaster = new THREE.Raycaster()
 raycaster.layers.set(TRIANGLES_LAYER)
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

 export const getScreenPositionFromObject = (object) => {
   const width = sizes.width, height = sizes.height;
   const widthHalf = width / 2, heightHalf = height / 2;
   
   const pos = object.position.clone();
   pos.project(camera);
   pos.x = ( pos.x * widthHalf ) + widthHalf;
   pos.y = - ( pos.y * heightHalf ) + heightHalf;
   return pos
 }
    

        const geometry = new THREE.PlaneBufferGeometry( 100, 100 )
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00, visible:false} )
        const plane = new THREE.Mesh( geometry, material );
        plane.name = 'zeroHover'
        plane.position.z = -1
        loaded_objects.push(plane)
        onlyBackground.push(plane)
        plane.layers.set(TRIANGLES_LAYER)
        scene.add( plane )

        const g_logo = new THREE.PlaneBufferGeometry( 1.6, 3.3 )

        const p_logo = new THREE.Mesh( g_logo, material );
        p_logo.name = 'logo'
        p_logo.position.set(-1.424,-0.414,-1)
        p_logo.rotation.set(-0.01,0.867,0)

        loaded_objects.push(p_logo)
        p_logo.layers.set(TRIANGLES_LAYER)
        scene.add( p_logo )