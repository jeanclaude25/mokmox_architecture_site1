import * as THREE from 'three'
import { config } from "./a_config";
import { mobileAndTabletCheck } from './a_detect_mobile';
import { canvas, container, refreshSizes, scene, sizes } from "./c_scene";
import { effectComposer } from './dd_postProcess';
import { renderer } from "./d_renderer";
import { camera } from "./e_camera";
import { changeMaterialColor } from './g_materials';
import { objectFromRaycast, pointerConvert } from './i_raycaster';
import { loaded_objects } from './m_tween';
import { responsiveTranslate } from './o_responsive';
import { fixThisDot } from './p_hoverEffect';

export let hovered_objects = null
export let Allow_fixing = false

    export const mouse = {
        hovered_object:null,
        clicked_object:null,
        delta:0,
        logDelta: 0,
    }

    export const events = () => {

        if(!mobileAndTabletCheck()){
            
            canvas.addEventListener('mousemove',(e) =>{
                    e.stopPropagation()
                    hoveredObjects(objectFromRaycast(pointerConvert(e,canvas))) 
                })

        }else{



        }







        window.addEventListener('resize', () =>
        {
            refreshSizes()

            const hFOV = 2 * Math.atan(Math.tan(camera.fov * Math.PI / 180 / 2) * camera.aspect) * 180 / Math.PI; // degrees
            const cameraHeight = Math.tan(THREE.MathUtils.degToRad(hFOV / 2));
            const ratio = camera.aspect / 1;
            const newCameraHeight = cameraHeight / ratio;
            // camera.fov = THREE.MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;

            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(config.scene.pixelRatio)
            
            effectComposer.setSize(sizes.width, sizes.height)
            responsiveTranslate()
        })
    
        // canvas.addEventListener('click', (e) => {
        //     if (intersects != undefined && intersects.length > 0 && intersects[0].object.name != 'zeroHover') {
        //         console.log(intersects[0].object.name);
        //         zoomOnObject(intersects[0].object)
        //         // window.location.href = intersects[0].object.name
        //     }
        // })

        
    }





    const zeroHoveredAllObjects = (actualHover) =>{
        //set all to zero
        if(!scene.hoveredIsNull){
            scene.hoveredIsNull = true
            // console.log("set all hover to zero")
            loaded_objects.forEach((child)=>{
                if (child == actualHover)return
                    child.hovered = false
                    hovered_objects = null

                    /**Do what you want when object isn't mouOver anymore */
                    if(config.onHover.enableChangeColor){
                    changeMaterialColor(child.material, config.onHover.time, config.assets.defaultColor)
                    }
                    Allow_fixing=false
                    
                
            })
        }
    }
    
    const setObjectHover = (ob) =>{

        if(hovered_objects != ob){
            ob.name != 'zeroHover'?console.log("HoverReference " + ob.parent.name):''
         
        zeroHoveredAllObjects(ob)
        hovered_objects = ob
        if(!ob.hovered ){
            ob.hovered = true
            scene.hoveredIsNull = false
            // if(!ob.selected)changeMaterialColor(ob.material, config.controls.hoverableObjects.time, config.controls.hoverableObjects.color)
            
            /**Actions to do when object is mouseOver Here */
            if(config.onHover.enableChangeColor){
                changeMaterialColor(ob.material, config.onHover.time, config.onHover.hoverColor)
            }
            Allow_fixing = true
        }
        }

    
        }

const hoveredObjects = (ob) => ob.length>0 && config.onHover.enable? setObjectHover(ob[0].object):''
    