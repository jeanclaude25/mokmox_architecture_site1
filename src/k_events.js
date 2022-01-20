import * as THREE from 'three'
import { config } from "./a_config";
import { canvas, container } from "./c_scene";
import { renderer } from "./d_renderer";
import { camera } from "./e_camera";


    export const mouse = {
        hovered_object:null,
        clicked_object:null,
        delta:0,
        logDelta: 0,
    }

    export const events = () => {
        console.log("je suis dans les events")
        // window.addEventListener('resize', onWindowResize, false);
        // canvas.addEventListener('mousemove', onDocumentMouseMove, false); // old raycaster

        window.addEventListener('resize', () =>
        {

            const hFOV = 2 * Math.atan(Math.tan(camera.fov * Math.PI / 180 / 2) * camera.aspect) * 180 / Math.PI; // degrees

            
            camera.aspect = container.clientWidth / container.clientHeight;
            const cameraHeight = Math.tan(THREE.MathUtils.degToRad(hFOV / 2));
            const ratio = camera.aspect / 1;
            const newCameraHeight = cameraHeight / ratio;

            camera.fov = THREE.MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
            camera.updateProjectionMatrix();

            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(config.scene.pixelRatio)
        })

    
        canvas.addEventListener('click', (e) => {
            if (intersects != undefined && intersects.length > 0 && intersects[0].object.name != 'zeroHover') {
                console.log(intersects[0].object.name);
                zoomOnObject(intersects[0].object)
                // window.location.href = intersects[0].object.name
            }
        })

        
    }
