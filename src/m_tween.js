import * as TWEEN from '@tweenjs/tween.js'
import { scene } from './c_scene';
import { t1, t2, t3, t5, t6, t7, t8, t9, t10, t11, t12, t13, showOutlines } from './l_objects';
import { scatteredTriangles, scatterTriangles } from './j_animation'
import { mouse } from './k_events';
import { config } from './a_config';

    export let tween

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

        export const updateTween = (e) => {

            e.preventDefault()
            if (Math.sign(e.deltaY) > 0) {
                mouse.delta += e.deltaY /4
            }

            TWEEN.update(mouse.delta, true)
        }

        export const updateTweenMobile = (e) => {
            e.preventDefault()
            const touches = e.touches ? e.touches[0].clientY : e.originalEvent.touches[0].clientY
            if (Math.sign(touches) > 0) {
                mouse.delta += touches / 20 
            }

            TWEEN.update(mouse.delta, true)
        }

        export const tweenTriangle = (elem, destination) => {
            const position = elem.rotation;
            const obj = destination
            tween = new TWEEN.Tween(position).to(obj, 333).easing(TWEEN.Easing.Linear.None).onComplete( () => {
                if (elements.length == 0) {
                    // callPreviousFunction()
                    scene.traverse((child) => {
                        if (child.userData.name == 'scatter') {
                            console.log('scattering triangle');
                            scatteredTriangles.push(child)


                            /**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){

    /**
     * gui.gui
     */
    const camgui = require('./a_gui').scateredObjects
    const triangleGui = camgui.addFolder('Triangle '+ child.name)

    const posTriangleGui = triangleGui.addFolder('Position')
    posTriangleGui.add(child.position, 'x').min(-150).max(150).step(0.001)
    posTriangleGui.add(child.position, 'y').min(-150).max(150).step(0.001)
    posTriangleGui.add(child.position, 'z').min(-150).max(150).step(0.001)

    const rotTriangleGui = triangleGui.addFolder('Rotation')
    rotTriangleGui.add(child.rotation, 'x').min(-Math.PI).max(Math.PI).step(0.001)
    rotTriangleGui.add(child.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001)
    rotTriangleGui.add(child.rotation, 'z').min(-Math.PI).max(Math.PI).step(0.001)

    const scTriangleGui = triangleGui.addFolder('Scale')
    scTriangleGui.add(child.scale, 'x').min(-5).max(5).step(0.001)
    scTriangleGui.add(child.scale, 'y').min(-5).max(5).step(0.001)
    scTriangleGui.add(child.scale, 'z').min(-5).max(5).step(0.001)

    
    }



                        }
                    })
                    mouse.logDelta = mouse.delta;
                    showOutlines()
                    scatterTriangles(scatteredTriangles)
                } else {
                    callNextFunction();

                }

            }).start(mouse.delta)
            const opacity = elem.material;
            const obj2 = {
                opacity: elements.length == 0 && (originalElements.length > 4
                    // || originalElements.length == 2 || originalElements.length == 1
                ) ? 0 : 1
            }
            if (elements.length != 0 && originalElements.length < 4) {
                elem.material.transparent = false;
            }
            new TWEEN.Tween(opacity).to(obj2, 300).easing(TWEEN.Easing.Linear.None).start(mouse.delta)
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
        