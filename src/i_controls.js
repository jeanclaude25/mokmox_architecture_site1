import { renderer } from "./d_renderer";
import { camera } from "./e_camera";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



export const controls = new OrbitControls(camera, renderer.domElement);
        
controls.target.set(

            -0.755,
            0.5089381454383493,
            0.0041

        )

        controls.enabled = false