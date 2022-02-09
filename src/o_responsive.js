import { finalTrianglePosition, offsetPosition, scatteredTriangles, updateBoxesPosition } from "./j_animation";
import gsap from 'gsap/all'
import { config } from "./a_config";

export const responsiveTranslate = () => {
    if(scatteredTriangles.length>0){
        updateBoxesPosition()
        

        for(let i = 0; i<scatteredTriangles.length; i++){

            gsap.to(
                scatteredTriangles[i].position,{
                    duration: config.responsive.resizeTime,
                    x: finalTrianglePosition.x[i] + offsetPosition.x[i],
                    y: finalTrianglePosition.y[i] + offsetPosition.y[i],
                    z: finalTrianglePosition.z[i] + offsetPosition.z[i]
                }
            )
        }

    }
}
