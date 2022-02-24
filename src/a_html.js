import { config } from "./a_config"

const columnNumber = [8,8,7,7,7,8,8]

export const create_html = (container) => {
    // console.log(container)
    // //Create a cont
    // const s_cont = document.createElement('div')
    // s_cont.style.display = 'absolute'
    // s_cont.style.width = '100%'
    // s_cont.style.height = '100%'
    // s_cont.className = 's_container'
    // container.append(s_cont)

    const bbox = document.createElement('div')
    bbox.style.display = 'flex'
    bbox.style.flexDirection = 'column'
    bbox.style.alignItems = 'center'
    bbox.style.justifyContent = 'center'
    bbox.style.width = '100%'
    bbox.style.height = '100%'

    bbox.className = "bbox"
    container.append(bbox)

    for(let i=0; i<7; i++){
        const line = document.createElement('div')
        line.style.display = 'flex'
        line.style.alignItems = 'center'
        line.style.justifyContent = 'center'
        line.className = "box"
        bbox.append(line)

        create_column(line,i)
    }
    // return s_cont
}

const create_column = (group,num) => {

    for(let i=0; i<columnNumber[num]; i++){
        const column = document.createElement('div')
        column.style.width = '12vw'
        column.style.height = '12vh'
        column.style.minWidth = '100px'
        column.style.maxWidth = '400px'

        column.id = "box_"+num+i
        column.ariaLabel = config.assets.texts[i]
        if(
            column.id == 'box_23'||
            column.id == 'box_33'||
            column.id == 'box_43'
            ){
                column.style.minWidth = '250px'
                column.className = "box_logo"
            }
        group.append(column)
    }
}