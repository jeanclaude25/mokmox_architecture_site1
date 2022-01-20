import * as THREE from 'three'
import gsap from 'gsap/all'

export const changeMaterialColor = (material, time , temp_color) => {

    const color = new THREE.Color(temp_color)
        
        gsap.to(
            material.color,{
                duration: time,
                r: color.r,
                g: color.g,
                b: color.b
            }
        )
}