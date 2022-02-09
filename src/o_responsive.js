import { finalTrianglePosition, scatteredTriangles, updateBoxesPosition } from "./j_animation";
import { updateTextsPosition } from "./l_texts";
import gsap from 'gsap/all'
import { config } from "./a_config";
import { updateCssTextPositionToTriangles } from "./l_texts_css";

export const responsiveTranslate = () => {
    if(scatteredTriangles.length>0){
        updateBoxesPosition()
        

        for(let i = 0; i<scatteredTriangles.length; i++){

            gsap.to(
                scatteredTriangles[i].position,{
                    duration: config.responsive.resizeTime,
                    x: finalTrianglePosition.x[i],
                    y: finalTrianglePosition.y[i],
                    z: finalTrianglePosition.z[i]
                }
            )
        }

        // updateTextsPosition()
        updateCssTextPositionToTriangles()
    }
}
