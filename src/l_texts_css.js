import { sizes } from "./c_scene"
import { getBoxCenterList } from "./j_animation"


//create css text
const textList = [
    'text_box_1', 'text_box_2', 'text_box_3', 'text_box_4',
    'text_box_5', 'text_box_6', 'text_box_7', 'text_box_8'
]
//update css position
export const updateCssTextPosition = () => {
    const boxesList = getBoxCenterList()
    for(let i=0; i<textList.length;i++){
        const text = document.getElementById(textList[i])
        text.style.marginLeft = boxesList[i].x.toString() + 'px'
        text.style.marginTop = boxesList[i].y.toString() + 'px'

    }
    
}