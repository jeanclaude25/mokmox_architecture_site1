import * as THREE from 'three'
import { BACKGROUND_LAYER } from './cc_layers';
import { scene } from './c_scene';
import linesHoverVertexShader from './shaders/linesHover/vertex.glsl' 
import linesHoverFragmentShader from './shaders/linesHover/fragment.glsl'
import { config } from './a_config';
import { camera } from './e_camera';


export const create_background = () => {


        const geometry = new THREE.PlaneBufferGeometry( 25, 25 )
        const material = new THREE.RawShaderMaterial({
            vertexShader: linesHoverVertexShader,
            fragmentShader: linesHoverFragmentShader,
            side: THREE.DoubleSide,
            transparent:true,
            uniforms:{
                uSizeRail: {value: 20},
                uModulo: {value: 0.486},
                uRotation: {value: 0.5},
                uOpacity: {value:1},
                uColor: {value: new THREE.Color(config.onHover.color.line)},
                uTime: {value: config.onHover.timeForLine},
                uMultiplier : {value: 2.0}
            }
        })
        const background = new THREE.Mesh( geometry, material );
        background.name = 'background'
        // loaded_objects.push(plane)
        background.position.set(-4,-3,-6)
        background.lookAt(camera.position)
        background.layers.set(BACKGROUND_LAYER)
        scene.add( background )

                /**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){

    /**
     * gui.gui
     */
    const gui = require('./a_gui')
    const bakgui = gui.gui.addFolder('Background')
    gui.createPositionGuiDebug(bakgui, background, -15, 15)
    gui.createRotationGuiDebug(bakgui, background)
    gui.createScaleGuiDebug(bakgui, background)
    bakgui.add(background.material, 'visible')
}
    }