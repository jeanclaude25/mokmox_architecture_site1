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
            rotate:[0, 2 * Math.PI / 3.05, - Math.PI / 2.85,isMobile()?2 * Math.PI / 3.05:Math.PI/50, 0, Math.PI, 0, - Math.PI / 2.8]
        }

export const savedText = []


export const updateTextsPosition = () => {
    if(savedText.length>0){
        for(let i=0;i<savedText.length;i++){
            const pos = posText(savedText[i],i)
            
            gsap.to(
                savedText[i].position,{
                    duration: config.responsive.resizeTime,
                    x: pos.x,
                    y: pos.y,
                    z: pos.z
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
            posCamGui.add(letterGroup.position, 'x').min(-150).max(150).step(0.001)
            posCamGui.add(letterGroup.position, 'y').min(-150).max(150).step(0.001)
            posCamGui.add(letterGroup.position, 'z').min(-150).max(150).step(0.001)
        
            }


        scatteredTriangles[y].add(letterGroup)
        savedText.push(letterGroup)
        letterGroup.lookAt(camera.position)
        scatteredTriangles[y].geometry.computeBoundingBox()
    
        const positionText = posText(letterGroup, y)
        console.log(positionText)
        letterGroup.position.x = positionText.x
        letterGroup.position.y = positionText.y
        letterGroup.position.z = positionText.z
    }
}

const posText = (object, y) => {
    object.rotation.z = textsConfig.rotate[y]

    const posObject = isMobile()?textsConfig.position.mobile:textsConfig.position.desktop
    const pos = {x:posObject.x[y],y:posObject.y[y],z:posObject.z[y]}
    return pos

}