import * as THREE from 'three'    
import { config } from './a_config';
import { add_to_all_layers } from './cc_layers';
import { myScene} from './c_scene';
        
        export const pointLight = new THREE.PointLight(0xffffff, 0.1);
        pointLight.position.set(3, 2, 3)
        myScene.add(pointLight)
        add_to_all_layers(pointLight)

        const pointLight2 = new THREE.PointLight(0xffffff, 0.73, 1.5);
        pointLight2.position.set(0.5, 1.4, -1)
        pointLight2.rotateY(Math.PI / 2)
        // const pointLightHelper = new THREE.PointLightHelper(pointLight2, 0.5)
        
        myScene.add(pointLight2)
        add_to_all_layers(pointLight2)
        

        const pointLight3 = new THREE.PointLight(0xffffff, 0.5, 1.5);
        pointLight3.position.set(0, 0, 0.5)
        // const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 0.1)
        
        myScene.add(pointLight3)
        add_to_all_layers(pointLight3)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
        
        myScene.add(ambientLight)
        add_to_all_layers(ambientLight)

        
        /**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine))
{ const gui = require('./a_gui')
/**
 * gui.gui
 */
const camgui = gui.gui.addFolder('Lighting')
const ambientGui = camgui.addFolder('Ambient')
ambientGui.add(ambientLight, 'intensity').min(0).max(15).step(0.001)
ambientGui.add(ambientLight.color, 'r').min(0).max(1).step(0.001)
ambientGui.add(ambientLight.color, 'g').min(0).max(1).step(0.001)
ambientGui.add(ambientLight.color, 'b').min(0).max(1).step(0.001)

const pointGui = camgui.addFolder('Point')
gui.createPositionGuiDebug(pointGui, pointLight3, -150, 150)
pointGui.add(pointLight3, 'intensity').min(0).max(15).step(0.001)
pointGui.add(pointLight3.color, 'r').min(0).max(1).step(0.001)
pointGui.add(pointLight3.color, 'g').min(0).max(1).step(0.001)
pointGui.add(pointLight3.color, 'b').min(0).max(1).step(0.001)

}