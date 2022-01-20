import * as THREE from 'three'
import { FontLoader } from 'three'
import { isMobile } from './a_detect_mobile';
import { scene } from './c_scene';
import { camera } from './e_camera';
import { scatteredTriangles } from './j_animation'

        const loader = new FontLoader()
        let defaultFont;
        loader.load('./droid-sans.typeface.json', (font) => defaultFont = font )
        // defaultFont = loader.parse(json)


const texts = ['CAREERS', 'CLIENTS', 'BROCHURES', 'CONTACTS', 'ABOUT+US', 'NEWS', 'GALLERY', 'OUR+WORK']

const createPlane = (object) => {
    const position = new THREE.Vector3()
    object.getWorldPosition(position)
    const geometry = new THREE.SphereGeometry( 0.1, 0.1, 12 )
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} )
    const plane = new THREE.Mesh( geometry, material );
    plane.position.x = position.x
    plane.position.y = position.y
    plane.position.z = position.z

    // plane.rotation.x = rotation.x
    // plane.rotation.y = rotation.z
    // plane.rotation.z = rotation.y

    scene.add( plane )
}

export const loadTexts = () => {

    console.log(scatteredTriangles.length);
    for (let y = 0; y < scatteredTriangles.length; y++) {
        createPlane(scatteredTriangles[y])
        const letterGroup = new THREE.Group()
        const words = texts[y]
        let lastPosX = 0;

        for (let i = 0; i < words.length; i++) {
            const geometry = new THREE.TextGeometry(words.split("")[i], {
                font: defaultFont,
                size: (y == 5 || y == 1 || y == 3 || y == 6 || y == 0) ? 7 : 5,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            });
            const text = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: 0xffffff,
            }))
            text.scale.set(0.01, 0.01, 0.01)

            if (words.split("")[i] == '+') {
                text.visible = false
            }

            text.position.x = lastPosX + 0.05


            const boundingBox = new THREE.Box3();
            const mesh = text;
            mesh.geometry.computeBoundingBox()
            boundingBox.copy(mesh.geometry.boundingBox);
            mesh.updateMatrixWorld(true); // ensure world matrix is up to date
            boundingBox.applyMatrix4(mesh.matrixWorld);

            lastPosX = boundingBox.max.x

            letterGroup.add(text)
            letterGroup.name = 'link1'

        }


        scatteredTriangles[y].add(letterGroup)
        letterGroup.lookAt(camera.position)
        scatteredTriangles[y].geometry.computeBoundingBox()
        const boxy = scatteredTriangles[y].geometry.boundingBox
        letterGroup.position.y = y % 2 == 1 ? 0.1 : 0.12
        letterGroup.translateZ(10)
        letterGroup.rotation.z = 0

        letterGroup.position.x -= 0.5

        if (y == 1) {
            letterGroup.rotateZ(2 * Math.PI / 3.05)
            letterGroup.position.set(0, 0, 0)
            letterGroup.translateY(-0.4)
        } else if (y == 2) {
            letterGroup.rotateZ(- Math.PI / 2.85)
            letterGroup.position.set(0, 0, 0)
            letterGroup.translateY(0.4)
            letterGroup.translateX(-0.7)
            if (isMobile()) {
                letterGroup.rotateZ(Math.PI / 50)
                letterGroup.translateY(-0.1)
            }
        }
        else if (y == 3) {
            letterGroup.rotateZ(2 * Math.PI / 3.05)
            letterGroup.position.set(0, 0, 0)
            letterGroup.translateY(-0.4)
            letterGroup.translateX(-0.12)
            letterGroup.translateZ(2)
        }
        else if (y == 4) {
            letterGroup.position.set(0, 0, 0)
            letterGroup.translateX(-0.4)
            letterGroup.translateY(0.1)
            letterGroup.translateZ(5)
        }
        else if (y == 5) {
            letterGroup.position.set(0, 0, 0)
            letterGroup.rotateZ(Math.PI)

            letterGroup.translateY(-0.15)
            letterGroup.translateX(-0.2)
            letterGroup.translateZ(5)
        }
        else if (y == 7) {
            letterGroup.position.set(0, 0, 0)
            letterGroup.rotateZ(- Math.PI / 2.8)

            letterGroup.translateY(-0.4)
            letterGroup.translateX(-0.15)
            letterGroup.translateZ(5)
        }
        if (y == 5 || y == 1) {
            letterGroup.translateX(-0.05)
        } else if (y == 6) {
            letterGroup.translateZ(-5)
            letterGroup.translateX(-0.1)

        } else if (y == 0) {
            letterGroup.translateX(-0.08)
            letterGroup.translateZ(-5)

        } else if (y == 3) {
            letterGroup.translateX(-0.06)

        }


    }
}