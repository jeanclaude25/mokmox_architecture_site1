import * as THREE from 'three'    
import { myScene, scene } from './c_scene';
        
        export const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(3, 2, 3)
        const pointLight2 = new THREE.PointLight(0xffffff, 0.73, 1.5);
        pointLight2.position.set(0.5, 1.4, -1)
        pointLight2.rotateY(Math.PI / 2)
        // const pointLightHelper = new THREE.PointLightHelper(pointLight2, 0.5)
        
        myScene.add(pointLight2)


        const pointLight3 = new THREE.PointLight(0xffffff, 0.5, 1.5);
        pointLight3.position.set(0, 0, 0.5)
        // const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 0.1)
        
        myScene.add(pointLight3)


        const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
        
        myScene.add(ambientLight)
