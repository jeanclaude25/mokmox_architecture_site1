import { sizes } from "./c_scene"
import { getScreenPositionFromObject } from "./i_raycaster"
import { getBoxCenterList, scatteredTriangles } from "./j_animation"


//create css text
const textList = [
    'text_box_1', 'text_box_2', 'text_box_3', 'text_box_4',
    'text_box_5', 'text_box_6', 'text_box_7', 'text_box_8'
]
// export const createCssText = () => {
//     textList.forEach(element => {
//         const text = document.getElementById(element)
//         element.style.fontSize = 12

//     });
// }

//update css position
export const updateCssTextPositionToCssBoxes = () => {
    const boxesList = getBoxCenterList()
    for(let i=0; i<textList.length;i++){
        const text = document.getElementById(textList[i])
        text.style.marginLeft = boxesList[i].x.toString() + 'px'
        text.style.marginTop = boxesList[i].y.toString() + 'px'

    }
    
}

export const updateCssTextPositionToTriangles = () => {
    
    for(let i=0; i<textList.length;i++){
        const pos = getScreenPositionFromObject(scatteredTriangles[i])
        const text = document.getElementById(textList[i])
        text.style.marginLeft = (pos.x - text.clientWidth/2).toString() + 'px'
        text.style.marginTop = (pos.y - text.clientHeight/2).toString() + 'px'

        
    }
    
}