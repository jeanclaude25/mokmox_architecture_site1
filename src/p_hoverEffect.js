import { getVertexPosition, makeDot } from "./l_geometry"
import gsap from 'gsap/all'
import * as THREE from 'three'
import { scene } from "./c_scene"
import { config } from "./a_config"
import { actual_anim_state } from "./i_draw"



export const dot = makeDot()
scene.add(dot)
const offsetCorrect = {
    x:0.38,
    y:0,
    z:0
}
/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){
    const camgui = require('./a_gui').gui
    const dotGui = camgui.addFolder('DOT')
    
    const posCamGui = dotGui.addFolder('position')
    posCamGui.add(offsetCorrect, 'x').min(-5).max(5).step(0.001)
    posCamGui.add(offsetCorrect, 'y').min(-5).max(5).step(0.001)
    posCamGui.add(offsetCorrect, 'z').min(-5).max(5).step(0.001)
    
}
let anim_state;
export const fixThisDot = (trackedObj, i) => {
    
if(anim_state != actual_anim_state){

        //attraper les 3 positions
    const pos=[
        getVertexPosition(trackedObj, 0),
        getVertexPosition(trackedObj, 1),
        getVertexPosition(trackedObj, 2)
        ]
        // dot.position.x = pos[i].x + offsetCorrect.x
        // dot.position.y = pos[i].y + offsetCorrect.y
        // dot.position.z = pos[i].z + offsetCorrect.z
        console.log("bfd")
        gsap.to(
            dot.position,{
                duration: config.onHover.timeForLine,
                x: pos[i].x + offsetCorrect.x,
                y: pos[i].y + offsetCorrect.y,
                z: pos[i].z + offsetCorrect.z
            }
        )


    }
    
            anim_state = actual_anim_state

        
    }
    

