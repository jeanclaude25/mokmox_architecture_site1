import { renderer } from "./d_renderer";
import { camera } from "./e_camera";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { config } from "./a_config";



export const controls = new OrbitControls(camera, renderer.domElement);
        
controls.target.set(

            -0.755,
            0.5089381454383493,
            0.0041

        )

        controls.enabled = false


        if(window.location.href.includes(config.debug.commandLine))
        { 
        const gui = require('./a_gui')
        /**
         * gui.gui
         */
        const controlGui = require('./a_gui').camgui
        const targetGui = controlGui.addFolder('Target')
        targetGui.add(controls.target, 'x').min(-50).max(50).step(0.001).name('targetX')
        targetGui.add(controls.target, 'y').min(-50).max(50).step(0.001).name('targetY')
        targetGui.add(controls.target, 'z').min(-50).max(50).step(0.001).name('targetZ')
        
        }