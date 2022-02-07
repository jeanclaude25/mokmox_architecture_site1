// import './style.scss'
import './style.css'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'


window.onload = () => {

    setTimeout( () => {
        const myScene = require('./c_scene').myScene
        const otherGroup = require('./c_scene').otherGroup
        const pyramidGroup = require('./c_scene').pyramidGroup
        const tGroup = require('./c_scene').tGroup
        const pointLight = require('./h_lights').pointLight  //keep it to load lights
        const render = require('./i_draw').render
        const tweenTriangle = require('./m_tween').tweenTriangle
        const callNextFunction = require('./m_tween').callNextFunction
        const tList = require('./l_objects').tList
        const t1 = require('./l_objects').t1
        const outlines = require('./l_objects').outlines
        const events = require('./k_events').events

        for (let j = 0; j < tList.length; j++) {
            if (tList[j] != null) {
                otherGroup.scale.copy(tGroup.scale)
                otherGroup.position.copy(tGroup.position)
                const t1Clone = new THREE.Mesh()
                t1Clone.rotation.copy(tList[j].rotation)

                if (j == 1) {
                    t1Clone.rotation.set(
                        Math.PI / 2,
                        3 * Math.PI / 4,
                        - Math.PI / 4,
                    )
                } else if (j == 2) {
                    t1Clone.rotation.set(
                        - Math.PI / 2,
                        Math.PI / 4,
                        - Math.PI / 4,
                    )
                }
                else if (j == 3) {
                    t1Clone.rotation.set(
                        Math.PI / 2,
                        3 * Math.PI / 4,
                        - Math.PI / 4,
                    )
                }
                else if (j == 4) {
                    t1Clone.rotation.set(
                        - Math.PI / 2,
                        Math.PI / 4,
                        - Math.PI / 4,
                    )
                }
                else if (j == 5) {
                    t1Clone.rotation.set(
                        -Math.PI / 2,
                        1.5 * Math.PI / 2,
                        - 1.5 * Math.PI / 2,
                    )
                }
                else if (j == 6) {
                    t1Clone.rotation.set(
                        -Math.PI / 2,
                        1.5 * Math.PI / 2,
                        Math.PI / 4,
                    )
                }
                t1Clone.geometry = tList[j].geometry.clone()


                t1Clone.position.set(
                    tList[j].position.x,
                    tList[j].position.y,
                    tList[j].position.z,
                )

                t1Clone.userData.name = ''
                t1Clone.material.wireframe = true
                t1.material.wireframe = false
                t1Clone.visible = false
                t1Clone.translateZ(-0.001)
                otherGroup.add(t1Clone)
                outlines.push(t1Clone)
            }



        }

        otherGroup.rotation.z = Math.PI / 4

        
        let group, group2;
        

        const tweenToEqual = (object) => {
            const input = [
                0, 0, 0,
                1, 2 * Math.sqrt(3) / 2, 0,
                2, 0, 0
            ];
            const positions = object.geometry.attributes.position.array;

            const nextTween = () => {
                for (let k = 0; k < positions.length; k++) {
                    const currentVertex = positions[k];
                    const destinationVertex = input[k]

                    const vertex = { y: currentVertex }

                    const myTween = new TWEEN.Tween(vertex).to({ y: input[k] }, 500).easing(TWEEN.Easing.Linear.None).onUpdate( () => {
                        if (k == 4) {

                        }
                        object.geometry.attributes.position.array[k] = vertex.y
                        object.geometry.attributes.position.needsUpdate = true;
                    })
                    myTween.start()
                }
            }
            nextTween()


        }
        

        


        
        const createVector = (x, y, z, camera, width, height) => {
            const p = new THREE.Vector3(x, y, z);
            const vector = p.project(camera);

            vector.x = (vector.x + 1) / 2 * width;
            vector.y = -(vector.y - 1) / 2 * height;

            return vector;
        }
        
        // const axesHelper = new THREE.AxesHelper(50)
        // myScene2.add(axesHelper)
        // console.log("debug")

        const callPreviousFunction = () => {
            const object = originalElements[originalElements.length - 1]

            if (originalElements.length > 4) {
                tweenTriangle(object.elem, { x: object.x.angle, y: object.y.angle, z: object.z.angle })
            } else if (originalElements.length > 0) {
                object.elem.material.depthWrite = true

                if (originalElements.length == 4) {


                    tweenTriangle(object.elem, { x: object.elem.rotation.x, y: object.elem.rotation.y, z: Math.PI / 6 })
                    tweenToEqual(object.elem)

                    object.elem.geometry.attributes.position.needsUpdate = true;
                    object.elem.name = 'base'


                    pyramidGroup = tGroup.clone(false)
                    pyramidGroup.add(object.elem)
                    myScene.add(pyramidGroup)

                } else if (originalElements.length == 3) {

                    tweenToEqual(object.elem)
                    tweenTriangle(object.elem, { x: Math.PI / 2, y: Math.PI / 7.05, z: -Math.PI / 2 })


                    object.elem.name = 'getme'
                    pyramidGroup.add(object.elem)


                }
                else if (originalElements.length == 2) {
                    tweenTriangle(object.elem, { x: object.elem.position.x, y: object.elem.position.y, z: object.elem.position.z })
                    tweenToEqual(object.elem)

                    object.elem.geometry.attributes.position.needsUpdate = true;

                    group2 = new THREE.Group()
                    group2.rotation.set(tGroup.rotation.x, tGroup.rotation.y, tGroup.rotation.z)
                    group2.add(object.elem)
                    group2.eulerOrder = 'YXZ'

                    myScene.add(group2)
                    const pos = object.elem.position
                    const dest = objPos = {
                        x: 0.53,
                        y: 0.95,
                        z: -2.23
                    }

                    // objRot = { x: 0.01, y: 0.559, z: 0.01 }
                    objRot = { x: 0, y: 0, z: 0 }


                    let groupRot = group2.rotation
                    let groupPos = {
                        x: Math.PI / 9.5, y: -5 * Math.PI / 6, z: 2 * Math.PI / 3
                    }
                    new TWEEN.Tween(groupRot).to(groupPos, 700).easing(TWEEN.Easing.Linear.None).start()

                    let groupS = group2.scale
                    let groupPos2 = {
                        x: 0.5, y: 0.5, z: 0.5
                    }
                    new TWEEN.Tween(groupS).to(groupPos2, 700).easing(TWEEN.Easing.Linear.None).start()

                    groupPos = group2.position
                    groupPos3 = {
                        x: -1, y: 0, z: -1
                    }
                    new TWEEN.Tween(groupPos).to(groupPos3, 700).easing(TWEEN.Easing.Linear.None).start()

                    new TWEEN.Tween(pos).to(dest, 700).easing(TWEEN.Easing.Linear.None).start()

                    object.elem.name = 'getme'

                } else {

                    tweenTriangle(object.elem, { x: object.elem.rotation.x, y: object.elem.rotation.y, z: object.elem.rotation.z })
                    tweenToEqual(object.elem)



                    const pos = object.elem.position
                    const dest = {
                        x: 0.78,
                        y: -1.130794416681027,
                        z: -1.7778735136998105
                    }

                    group = new THREE.Group()
                    group.rotation.set(tGroup.rotation.x, tGroup.rotation.y, tGroup.rotation.z)
                    group.add(object.elem)

                    // group.rotation.set(Math.PI / 9, -1 * Math.PI / 6, Math.PI / 3)
                    group.eulerOrder = 'YXZ'
                    // group.scale.set(0.5, 0.5, 0.5)
                    // group.position.set(-1, 0, -1)
                    myScene.add(group)

                    groupRot = group.rotation
                    groupPos = {
                        x: Math.PI / 9, y: -1 * Math.PI / 6, z: Math.PI / 3
                    }
                    new TWEEN.Tween(groupRot).to(groupPos, 700).easing(TWEEN.Easing.Linear.None).start()

                    groupS = group.scale
                    groupPos2 = {
                        x: 0.5, y: 0.5, z: 0.5
                    }
                    new TWEEN.Tween(groupS).to(groupPos2, 700).easing(TWEEN.Easing.Linear.None).start()

                    groupPos = group.position
                    let groupPos3 = {
                        x: -1, y: 0, z: -1
                    }
                    new TWEEN.Tween(groupPos).to(groupPos3, 700).easing(TWEEN.Easing.Linear.None).start()

                    new TWEEN.Tween(pos).to(dest, 700).easing(TWEEN.Easing.Linear.None).start()

                    object.elem.geometry.attributes.position.needsUpdate = true;
                    object.elem.name = 'getme'

                }
            }
            originalElements.pop()
        }

 
        
        render();
        callNextFunction()
        events()
    }, 1500);



}

