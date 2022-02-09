import * as TWEEN from '@tweenjs/tween.js'
import { scene, triangleGroup } from './c_scene';
import { t1, t2, t3, t5, t6, t7, t8, t9, t10, t11, t12, t13, showOutlines } from './l_objects';
import { scatteredTriangles, scatterTriangles } from './j_animation'
import { mouse } from './k_events';
import { config } from './a_config';
import { tween_time_value } from './i_draw';

export let tween
export const loaded_objects = [] //Used for raycast
    const originalElements = []

    export const elements = [
        {
            elem: t2,
            x: {
                angle: t2.rotation.x
            },
            y: {
                angle: t2.rotation.y
            },
            z: {
                angle: t2.rotation.z
            }
        },
        {
            elem: t1,
            x: {
                angle: 0
            },
            y: {
                angle: t1.rotation.y
            },
            z: {
                angle: t1.rotation.z
            }
        },
        {
            elem: t5,
            x: {
                angle: Math.PI / 2
            },
            y: {
                angle: 3 * Math.PI / 4
            },
            z: {
                angle: - Math.PI / 4
            }
        },
        {
            elem: t3,
            x: {
                angle: - Math.PI / 2
            },
            y: {
                angle: Math.PI / 4
            },
            z: {
                angle: - Math.PI / 4
            }
        },
        {
            elem: t7,
            x: {
                angle: Math.PI / 2
            },
            y: {
                angle: 3 * Math.PI / 4
            },
            z: {
                angle: - Math.PI / 4
            }
        },
        {
            elem: t6,
            x: {
                angle: - Math.PI / 2
            },
            y: {
                angle: Math.PI / 4
            },
            z: {
                angle: - Math.PI / 4
            }
        },

        {
            elem: t9,
            x: {
                angle: Math.PI
            },
            y: {
                angle: t9.rotation.y
            },
            z: {
                angle: t9.rotation.z
            }
        },
        {
            elem: t8,
            x: {
                angle: 0
            },
            y: {
                angle: t8.rotation.y
            },
            z: {
                angle: t8.rotation.z
            }
        },
        {
            elem: t13,
            x: {
                angle: -Math.PI / 2
            },
            y: {
                angle: 1.5 * Math.PI / 2
            },
            z: {
                angle: Math.PI / 4
            }
        },
        {
            elem: t11,
            x: {
                angle: -Math.PI / 2
            },
            y: {
                angle: 1.5 * Math.PI / 2
            },
            z: {
                angle: - 1.5 * Math.PI / 2
            }
        },
        {
            elem: t12,
            x: {
                angle: -Math.PI / 2
            },
            y: {
                angle: 1.5 * Math.PI / 2
            },
            z: {
                angle: Math.PI / 4
            }
        },
        {
            elem: t10,
            x: {
                angle: -Math.PI / 2
            },
            y: {
                angle: 1.5 * Math.PI / 2
            },
            z: {
                angle: - 1.5 * Math.PI / 2
            }
        },

    ];
        export const autoTween = (val) => {
            TWEEN.update(val, true)
        }
        export const updateTween = (e) => {
            e.preventDefault()
            if (Math.sign(e.deltaY) > 0) {
                mouse.delta += e.deltaY /4
            }

            TWEEN.update(tween_time_value, true)
        }

        export const updateTweenMobile = (e) => {
            e.preventDefault()
            const touches = e.touches ? e.touches[0].clientY : e.originalEvent.touches[0].clientY
            if (Math.sign(touches) > 0) {
                mouse.delta += touches / 20 
            }

            TWEEN.update(tween_time_value, true)
        }

        export const tweenTriangle = (elem, destination) => {
            const position = elem.rotation;
            const obj = destination
            tween = new TWEEN.Tween(position).to(obj, 333).easing(TWEEN.Easing.Linear.None).onComplete( () => {
                if (elements.length == 0) {
                    // callPreviousFunction()
                    
                    scene.traverse((child) => {
                        if (child.userData.name == 'scatter') {
                            scatteredTriangles.push(child)
                            loaded_objects.push(child)
                            child.material.depthTest = true

                            /**FOR DEBUG */
                                        if(window.location.href.includes(config.debug.commandLine)){
                                        console.log('scattering triangle');

                                            /**
                                            * gui.gui
                                            */
                                            const gui = require('./a_gui')
                                            const triangleGui = gui.scateredObjects.addFolder('Triangle '+ child.name)
                                            gui.createPositionGuiDebug(triangleGui, child, -150, 150)
                                            gui.createRotationGuiDebug(triangleGui, child)
                                            gui.createScaleGuiDebug(triangleGui, child, -5, 5)
                                            }



                        }
                    })
                    mouse.logDelta = tween_time_value;
                    showOutlines()

                    triangleGroup.position.copy(scatteredTriangles[0].parent.parent.position)
                    triangleGroup.rotation.copy(scatteredTriangles[0].parent.rotation)
                    triangleGroup.scale.copy(scatteredTriangles[0].parent.scale)
                    
                    scatteredTriangles.forEach((child)=> triangleGroup.add(child) )
                    scatterTriangles(scatteredTriangles)
                } else {
                    callNextFunction();
                }

            }).start(tween_time_value)
            const opacity = elem.material;
            const obj2 = {
                opacity: elements.length == 0 && (originalElements.length > 4
                ) ? 0 : 1
            }
            elem.material.transparent = false;
            new TWEEN.Tween(opacity).to(obj2, 300).easing(TWEEN.Easing.Linear.None).start(tween_time_value)
            
        }
        

        export const callNextFunction = () => {
            if (elements.length > 0) {
                const object = elements[0]
                tweenTriangle(object.elem, { x: object.x.angle, y: object.y.angle, z: object.z.angle })
                originalElements.push({
                    elem: object.elem,
                    x: {
                        angle: object.elem.rotation.x
                    },
                    y: {
                        angle: object.elem.rotation.y
                    },
                    z: {
                        angle: object.elem.rotation.z
                    },
                });
            } else {
            }
            elements.shift()

        }
        