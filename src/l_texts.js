import * as THREE from 'three'
import { FontLoader } from 'three'
import { config } from './a_config';
import { scatteredTriangles } from './j_animation'
import { TRIANGLES_LAYER } from './cc_layers';
import fontJson from './droid-sans.typeface.json'


        const loader = new FontLoader()
        let defaultFont;
        defaultFont = loader.parse(fontJson)
        // loader.load(fontJson, (font) => defaultFont = font )
        

export const savedText = []


export const loadTexts = () => {
    for (let y = 0; y < scatteredTriangles.length; y++) {

        const letterGroup = new THREE.Group()
        const words = config.assets.texts[y]
        let lastPosX = 0;

        for (let i = 0; i < words.length; i++) {
            const geometry = new THREE.TextGeometry(words.split("")[i], {
                font: defaultFont,
                size: config.assets.textSize,
                height: 0.1,
                curveSegments: 8,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            });
            const text = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xffffff}))
            //TEXT SIZING IS HERE
            text.scale.set(0.0166, 0.007, 0.01) 
            text.scale.x *= 0.9 
            text.scale.y *= 0.9
            text.scale.z *= 0.9



            if (words.split("")[i] == '+') {text.visible = false}

            text.position.x = lastPosX + 0.05


            const boundingBox = new THREE.Box3();
            const mesh = text;
            mesh.geometry.computeBoundingBox()
            boundingBox.copy(mesh.geometry.boundingBox);
            mesh.updateMatrixWorld(true); // ensure world matrix is up to date
            boundingBox.applyMatrix4(mesh.matrixWorld);

            lastPosX = boundingBox.max.x

            letterGroup.add(text)
            text.layers.set(TRIANGLES_LAYER)
        }

        letterGroup.name = words

        if(window.location.href.includes(config.debug.commandLine)){

            /**
             * gui.gui
             */
            const gui = require('./a_gui')
            const posCamGui = gui.textGui.addFolder(words)

            gui.createPositionGuiDebug(posCamGui, letterGroup,-5, 5)
            gui.createRotationGuiDebug(posCamGui, letterGroup)
            gui.createScaleGuiDebug(posCamGui, letterGroup)
            
            }


        scatteredTriangles[y].add(letterGroup)
        savedText.push(letterGroup)

        scatteredTriangles[y].geometry.computeBoundingBox()
            
        /**TEXT PLACEMENT ADJUST IS HERE */
        const adjustX = ((letterGroup.children.length * (config.assets.textSize + 2))/2) / 70
        
        if(scatteredTriangles[y].textRevert){
            letterGroup.rotation.z = -Math.PI
            letterGroup.position.x += adjustX
            letterGroup.position.y += 0.2
        }else{
            letterGroup.position.x -= adjustX
            letterGroup.position.y += 0.1
        }
        
        
    }
}