import * as THREE from 'three'
import { scene } from "./c_scene";



    let intersects;
        const raycaster = new THREE.Raycaster();

        // const onDocumentMouseMove = (event) => {

        //     // calculate mouse position in normalized device coordinates
        //     // (-1 to +1) for both components

        //     mouse.x = (event.offsetX / container.clientWidth) * 2 - 1;
        //     mouse.y = - (event.offsetY / container.clientHeight) * 2 + 1;
        // }



        const geometry = new THREE.PlaneBufferGeometry( 100, 100 )
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00, visible:false} )
        const plane = new THREE.Mesh( geometry, material );
        plane.name = 'zeroHover'
        plane.position.z = -1
        export const raycastDetect = [plane]
        scene.add( plane )