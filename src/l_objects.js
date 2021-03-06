import * as THREE from 'three'
import { config } from './a_config';
import { TRIANGLES_LAYER } from './cc_layers';
import { myScene, tGroup } from './c_scene'
import { triangleMat } from './g_materials';
import { customClone, makeLineRail, makeTriangle } from './l_geometry'



export const checkVisible = (elm, threshold, mode) => {
    threshold = threshold || 0;
    mode = mode || 'visible';

    const rect = elm.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    const above = rect.bottom - threshold < 0;
    const below = rect.top - viewHeight + threshold >= 0;
    return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
}


        export const t1 = makeTriangle({ color: new THREE.Color('cyan') })
        t1.add(makeLineRail())
        
        export const t2 = makeTriangle({ color: 'pink' })
        export const t3 = makeTriangle({ color: 'lightgreen' })
        t3.add(makeLineRail())
        export const t4 = makeTriangle({ color: 'orange' })
        tGroup.add(t1);
        export const t9 = customClone(t1)
        t9.add(makeLineRail())
        export const t10 = customClone(t1)
        export const t11 = customClone(t1)
        t11.add(makeLineRail())

        tGroup.add(t2)
        tGroup.add(t3)
        t1.rotateX(Math.PI)
        t2.rotateX(-Math.PI)

        t3.rotateX(2 * -Math.PI / 2)
        t3.rotateY(-3 * Math.PI / 4)
        t3.rotateZ(Math.PI / 4)
        t3.position.x = 0.5
        t3.position.z = -0.707
        t3.position.y = 0.5

        export const t5 = customClone(t3)
        t5.add(makeLineRail())
        t5.rotateX(Math.PI / 2)
        t5.position.set(0.5, 0.5, -0.707)

        t5.rotateY(1.5 * Math.PI / 2)
        t5.rotateZ(-Math.PI)

        tGroup.add(t5)

        export const t6 = customClone(t3)
        t6.add(makeLineRail())
        tGroup.add(t6)
        t6.position.z = -2.12
        t6.position.x = 0.5
        t6.position.y = 0.5

        export const t7 = customClone(t5)
        tGroup.add(t7)
        t7.position.z = -2.12
        t7.position.x = 0.5
        t7.position.y = 0.5

        export const t8 = customClone(t2)
        t8.add(makeLineRail())
        t8.rotateX(Math.PI)

        t8.position.y = 1
        t8.position.x = 1
        t8.position.z = -2.83

        tGroup.add(t8)

        t9.position.y = 1
        t9.position.x = 1
        t9.position.z = -2.83

        t10.position.y = 2.5;
        t10.position.z = -0.706;
        t10.position.x = 1.5
        t10.rotation.set(0, 0, 0)


        t10.rotateY(1.5 * Math.PI / 2)
        t10.rotateZ(1.5 * Math.PI / 2)


        tGroup.add(t11)
        t11.position.x = 1.5;
        t11.position.y = 2.5;
        t11.position.z = -2.12;

        t11.rotateY(1.5 * Math.PI / 2)
        t11.rotateZ(1.5 * Math.PI / 2)


        export const t12 = customClone(t11)
        t12.add(makeLineRail())
        tGroup.add(t12)
        t12.position.z = -0.707

        t12.position.x = 1.5
        t12.position.y = 2.5

        export const t13 = customClone(t12)
        t13.rotation.set(0, 0, 0)

        t13.position.y = 2.5
        t13.position.x = 1.5
        t13.position.z = -.707 - 1.414
        tGroup.add(t13)

        


        tGroup.add(t9)
        tGroup.add(t10)

        const trisArrays = [t1,t3,t5,t6,t8,t9,t11,t12]


        for(let ix = 0; ix<trisArrays.length; ix++){
            trisArrays[ix].layers.set(TRIANGLES_LAYER)
            trisArrays[ix].material.color = new THREE.Color(config.assets.defaultColor)
            trisArrays[ix].userData.name = 'scatter'
            trisArrays[ix].name = config.assets.links[ix]
            trisArrays[ix].material = triangleMat.clone()
        }
        


        tGroup.rotation.z = Math.PI / 4
        tGroup.scale.set(0.5, 0.5, 0.5)
        myScene.add(tGroup)
        myScene.position.z = 0.8
        myScene.position.x = -0.3

        export const outlines = []
        export const tList = [t4, t5, t6, null, t3, t11, t12, t8, t9,]
        export const showOutlines = () => outlines.forEach((elem)=> elem.visible = true)
            