import { isMobile } from "./a_detect_mobile";
import { finalTrianglePositionDesktop, finalTrianglePositionMobile, scatteredTriangles } from "./j_animation";
import { deleteTexts, loadTexts, updateTextsPosition } from "./l_texts";
import gsap from 'gsap/all'
import { config } from "./a_config";

export const responsiveTranslate = () => {
    if(scatteredTriangles.length>0){
        console.log("repositionne everything")

        for(let i = 0; i<scatteredTriangles.length; i++){

            const posTris = isMobile()?finalTrianglePositionMobile:finalTrianglePositionDesktop

            gsap.to(
                scatteredTriangles[i].position,{
                    duration: config.responsive.resizeTime,
                    x: posTris.x[i],
                    y: posTris.y[i],
                    z: posTris.z[i]
                }
            )
        }

        updateTextsPosition()
    }
}
