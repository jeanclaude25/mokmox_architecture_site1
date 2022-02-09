import * as THREE from 'three'

const otherGroup = require('./c_scene').otherGroup
const tGroup = require('./c_scene').tGroup
const pointLight = require('./h_lights').pointLight  //keep it to load lights

const tList = require('./l_objects').tList
const t1 = require('./l_objects').t1
const outlines = require('./l_objects').outlines

export const createLogo = () => {
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
}