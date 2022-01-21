import * as THREE from 'three'
import { FontLoader } from 'three'
import { config } from './a_config';
import { isMobile } from './a_detect_mobile';
import { camera } from './e_camera';
import { scatteredTriangles } from './j_animation'
import gsap from 'gsap/all'

        const loader = new FontLoader()
        let defaultFont;
        loader.load('./droid-sans.typeface.json', (font) => defaultFont = font )
        

        const textsConfig = {
            texts :config.assets.texts ,
            position:{
                mobile:{
                    x:[3.55 , 0.204, -0.026, 1.881, 3.969, 4.062, -4.485, 3.85],
                    y:[0.436, 0.128, 0.754, 0.012, 0.267, 0.261, -0.061, 0.307],
                    z:[2.929, -0.321, -0.043, 0.811, 3.069, 2.908, 3.007, -3.212]
                },
                desktop:{
                    x:[3.373, 0.213, 0.024, 1.891, 4.051, 3.956, -4.429, 3.739],
                    y:[0.486, 0.145, 0.803, -0.025, 0.176, 0.533, -0.146, 0.588],
                    z:[3.141, -0.309, -0.057, 0.783, 2.953, 3.024, 3.082, -3.294]
                }
            },
            rotation:{
                mobile:{
                    x:[-0.094, -0.025, -0.0261, 0.034, -0.047, -0.045, 0.0658, -3.069],
                    y:[0.943, 0.987, -0.947, 0.948, 0.974, 0.911, -0.914, 0.94],
                    z:[0, 2.06, -1.1, 2.06, 0, -3.07, 0, -1.121]

                },
                desktop:{
                    x:[-0.115, 0.056, -0.112, 0.069, -0.028, -0.126, 0.087, -2.977],
                    y:[0.901, 0.969, -0.940, 0.961, 1.018, 0.862, -0.884, 0.926],
                    z:[0, 2.098, -1.06, 2.04, 0, Math.PI, 0, -1.136]

                }
            }
             }

export const savedText = []


export const updateTextsPosition = () => {
    if(savedText.length>0){
        for(let i=0;i<savedText.length;i++){
            const pos = posText(i)
            
            gsap.to(
                savedText[i].position,{
                    duration: config.responsive.resizeTime,
                    x: pos.pos.x,
                    y: pos.pos.y,
                    z: pos.pos.z
                }
            )
            gsap.to(
                savedText[i].rotation,{
                    duration: config.responsive.resizeTime,
                    x: pos.rot.x,
                    y: pos.rot.y,
                    z: pos.rot.z
                }
            )

        }
    }
}

export const loadTexts = () => {

    // console.log(scatteredTriangles.length);
    for (let y = 0; y < scatteredTriangles.length; y++) {

        const letterGroup = new THREE.Group()
        const words = textsConfig.texts[y]
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
            
            

        }

        letterGroup.name = words

        if(window.location.href.includes(config.debug.commandLine)){

            /**
             * gui.gui
             */
            const camgui = require('./a_gui').textGui
            const posCamGui = camgui.addFolder(words)

            const pospCamGui = posCamGui.addFolder("position")
            pospCamGui.add(letterGroup.position, 'x').min(-150).max(150).step(0.001)
            pospCamGui.add(letterGroup.position, 'y').min(-150).max(150).step(0.001)
            pospCamGui.add(letterGroup.position, 'z').min(-150).max(150).step(0.001)
        
            const posrCamGui = posCamGui.addFolder("rotation")
            posrCamGui.add(letterGroup.rotation, 'x').min(-Math.PI).max(Math.PI).step(0.001)
            posrCamGui.add(letterGroup.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001)
            posrCamGui.add(letterGroup.rotation, 'z').min(-Math.PI).max(Math.PI).step(0.001)
        
            }


        scatteredTriangles[y].add(letterGroup)
        savedText.push(letterGroup)
        letterGroup.lookAt(camera.position)
        scatteredTriangles[y].geometry.computeBoundingBox()
    
        const positionText = posText(y)
        letterGroup.position.x = positionText.pos.x
        letterGroup.position.y = positionText.pos.y
        letterGroup.position.z = positionText.pos.z
        letterGroup.rotation.x = positionText.rot.x
        letterGroup.rotation.y = positionText.rot.y
        letterGroup.rotation.z = positionText.rot.z
    }
}

const posText = (y) => {
    const rotation = isMobile()?textsConfig.rotation.mobile:textsConfig.rotation.desktop

    const posObject = isMobile()?textsConfig.position.mobile:textsConfig.position.desktop
    const mat = {
        rot : {x:rotation.x[y],y:rotation.y[y],z:rotation.z[y]},
        pos : {x:posObject.x[y],y:posObject.y[y],z:posObject.z[y]}
    }
    return mat

}