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
                    x:[3.55 , 0.932, -0.023, 1.881, 3.969, 4.062, -4.485, 1.54],
                    y:[0.436, 0.108, 0.798, 0.012, 0.267, 0.261, -0.061, 0.226],
                    z:[2.929, 0.145, -0.024, 0.811, 3.069, 2.908, 3.007, -1.6]
                },
                desktop:{
                    x:[3.373, 0.719, -0.261, 1.891, 4.051, 3.956, -4.429, 4.057],
                    y:[0.486, 0.121, 0.863, -0.025, 0.176, 0.533, -0.146, 0.633],
                    z:[3.141, 0.014, 0.145, 0.783, 2.953, 3.024, 3.082, -3.549]
                }
            },
            rotation:{
                mobile:{
                    x:[-0.094, -0.025, -0.051, 0.034, -0.047, -0.045, 0.0658, 2.45],
                    y:[0.943, 0.987, -0.947, 0.948, 0.974, 0.911, -0.914, 1.164],
                    z:[0, 2.06, -1.1, 2.06, 0, -3.07, 0, -0.43]

                },
                desktop:{
                    x:[-0.115, 0.056, -0.067, 0.069, -0.028, -0.126, 0.087, 2.47],
                    y:[0.901, 0.969, -0.96, 0.961, 1.018, 0.862, -0.884, 1.164],
                    z:[0, 2.098, -1.08, 2.04, 0, Math.PI, 0, -0.43]

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
                // depthTest:false
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
            pospCamGui.add(letterGroup.position, 'x').min(-5).max(5).step(0.001)
            pospCamGui.add(letterGroup.position, 'y').min(-5).max(5).step(0.001)
            pospCamGui.add(letterGroup.position, 'z').min(-5).max(5).step(0.001)
        
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