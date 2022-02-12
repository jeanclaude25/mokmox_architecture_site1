import {finalTrianglePositionCalc, getBoxCenterList, scatteredTriangles } from "./j_animation";
import gsap from 'gsap/all'
import { config } from "./a_config";

export const responsiveTranslate = () => {
    if(scatteredTriangles.length>0){

        for(let i = 0; i<scatteredTriangles.length; i++){
            const newFinalPos = finalTrianglePositionCalc(i)

            gsap.to(
                scatteredTriangles[i].position,{
                    duration: config.responsive.resizeTime,
                    x: newFinalPos.x,
                    y: newFinalPos.y,
                    z: newFinalPos.z
                }
            )
        }
    }
}
