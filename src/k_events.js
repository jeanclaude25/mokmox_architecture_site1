import * as THREE from 'three'
import { config } from "./a_config";
import { isMobile, mobileAndTabletCheck } from './a_detect_mobile';
import { canvas, refreshSizes, scene, sizes } from "./c_scene";
import { passes } from './dd_postProcess';
import { renderer, resizeRenderer } from "./d_renderer";
import { camera } from "./e_camera";
import { changeMaterialColor, changeUniformsColor } from './g_materials';
import { objectFromRaycast, pointerConvert } from './i_raycaster';
import { disableScroll, enableScroll, ending_tween } from './k_events_scroll';
import { loaded_objects } from './m_tween';
import { responsiveTranslate } from './o_responsive';

export let hovered_objects = null
export let allow_glitch = false
    export const mouse = {
        hovered_object:null,
        clicked_object:null,
        delta:0,
        logDelta: 0,
    }

    export const events = () => {

        if(!mobileAndTabletCheck()){
            document.body.addEventListener('click',(e)=>{
                enableScroll()
                
            })
            
            canvas.addEventListener('mousemove',(e) =>{
                    e.stopPropagation()
                    hoveredObjects(objectFromRaycast(pointerConvert(e,canvas))) 
                })
            canvas.addEventListener('click', (e) => {
            e.stopPropagation()
                if(hovered_objects.name !=='zeroHover' && hovered_objects.name !== 'logo'){
                    window.location.href = hovered_objects.name
                }
            })

        }else{
            document.body.addEventListener('touchend',(e)=>{
                enableScroll()
            })
            canvas.addEventListener('touchend', (e) => {
            e.stopPropagation()
                if(hovered_objects.name !=='zeroHover' && hovered_objects.name !== 'logo'){
                    window.location.href = hovered_objects.name
                }
            })

        }


        window.addEventListener('resize', () =>
        {
            refreshSizes()

            const hFOV = 2 * Math.atan(Math.tan(camera.fov * Math.PI / 180 / 2) * camera.aspect) * 180 / Math.PI; // degrees
            const cameraHeight = Math.tan(THREE.MathUtils.degToRad(hFOV / 2));
            const ratio = camera.aspect / 1;
            const newCameraHeight = cameraHeight / ratio;
            // camera.fov = THREE.MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
            
            camera.fov = isMobile()?config.camera.fov.mobile:config.camera.fov.pc
            camera.aspect = sizes.width/ sizes.height ;
            camera.updateProjectionMatrix();

            resizeRenderer(renderer)
            passes.forEach((child)=> resizeRenderer(child) )
            
            responsiveTranslate()
        })
    

        
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
                    if(child.name!=='zeroHover' && child.name!=='logo'){

                    /**Do what you want when object isn't mouOver anymore */
                    if(config.onHover.enableChangeColor){
                        changeUniformsColor(child.material, 'uColorA', config.onHover.time, config.onHover.color.gradientA)
                        changeUniformsColor(child.material, 'uColorB', config.onHover.time, config.onHover.color.gradientB)

                        }
                        if(config.onHover.enableRails){
                            child.children[0].visible = false
                        }
                        allow_glitch = false

                    }
                    
                    
                
            })
        }
    }
    
    const setObjectHover = (ob) =>{

        if(hovered_objects != ob){
            // ob.name != 'zeroHover'?console.log("HoverReference " + ob.parent.name):''
         
        zeroHoveredAllObjects(ob)
        hovered_objects = ob
        if(!ob.hovered ){
            ob.hovered = true
            scene.hoveredIsNull = false
            if(ob.name === 'logo'){
                enableGlitchEffect(true)
            }
            if(ob.name!=='zeroHover' && ob.name!=='logo'){
                /**Actions to do when object is mouseOver Here */
                if(config.onHover.enableChangeColor){
                    changeUniformsColor(ob.material, 'uColorA', config.onHover.time, config.onHover.colorHover.gradientA)
                    changeUniformsColor(ob.material, 'uColorB', config.onHover.time, config.onHover.colorHover.gradientB)
                    }
                
                if(config.onHover.enableRails && ending_tween){
                    ob.children[0].visible = true
                }
                

             }
        }
        }

    
        }

const hoveredObjects = (ob) => ob.length>0 && config.onHover.enable? setObjectHover(ob[0].object):''

const enableGlitchEffect = (val) =>{
allow_glitch = true
setTimeout(()=>{
    allow_glitch = false
}, config.onHover.glitchTime * 1000)
}