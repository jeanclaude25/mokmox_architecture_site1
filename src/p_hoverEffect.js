import { getVertexPosition, makeDot } from "./l_geometry"
import gsap from 'gsap/all'
import * as THREE from 'three'

export const dotToAnimate = []

export const attach_dot = (obj) => {
    const dot = makeDot()
        const pos = getVertexPosition(obj, 0)
        dot.position.x = pos.x
        dot.position.y = pos.y
        dot.position.z = pos.z
        obj.add(dot)
        dotToAnimate.push(dot)
}

export const animateThisDot = (dot, objPos) => {
    
    const dotPosition = new THREE.Vector3()
    dot.getWorldPosition(dotPosition)
    console.log( Math.round(dotPosition.x *100))


    //attraper les 3 positions
    const pos=[
            getVertexPosition(objPos, 0),
            getVertexPosition(objPos, 1),
            getVertexPosition(objPos, 2)
            ]
    for(let i=0; i<3; i++){

        if(Math.round(dotPosition.x *100 ) == Math.round( pos[i].x * 100) &&
           Math.round(dotPosition.y *100 ) == Math.round( pos[i].y * 100) &&
           Math.round(dotPosition.z *100 ) == Math.round( pos[i].z * 100) ){
               
            //lancer le prochain gsap
            const val = i==2?0:i+1
            gsap.to(
                dot.position,{
                    duration: 0.5,
                    x: pos[val].x,
                    y: pos[val].y,
                    z: pos[val].z
                }
            )

        }
    }
    

}