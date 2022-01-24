//Layers
export const CENTRAL_STRUCTURE_LAYER = 0
export const FOREGROUND_LAYER = 1
export const TRIANGLES_LAYER = 2
export const MOUSEOVER_FX_LAYER = 3
export const BACKGROUND_LAYER = 5

export const LAYERS_LIST = [CENTRAL_STRUCTURE_LAYER,
                            FOREGROUND_LAYER, 
                            TRIANGLES_LAYER, 
                            MOUSEOVER_FX_LAYER,
                            BACKGROUND_LAYER]

export const add_to_all_layers = (obj) =>{
    LAYERS_LIST.forEach((layer)=>{
        obj.layers.enable(layer)
    })
}