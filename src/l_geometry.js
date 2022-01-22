import * as THREE from 'three'
import linesHoverVertexShader from './shaders/linesHover/vertex.glsl' 
import linesHoverFragmentShader from './shaders/linesHover/fragment.glsl' 
import { config } from './a_config'


export const lineMaterialShader = new THREE.RawShaderMaterial({
    vertexShader: linesHoverVertexShader,
    fragmentShader: linesHoverFragmentShader,
    transparent:true,
    depthTest: true,
    depthWrite: true,
    side: THREE.DoubleSide,
    premultipliedAlpha: true,
    uniforms:{
        uOpacity: { value: 1.0},
        uSizeRail: {value: 6.0},
        uRotation: {value: 0.5},
        uColor: {value: new THREE.Color('blue')},
        uTime: {value: 0.0}
    }
})
/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){

    /**
     * gui.gui
     */
    const camgui = require('./a_gui').gui
    
    const shaderGui = camgui.addFolder('Rail')
    shaderGui.add(lineMaterialShader.uniforms.uOpacity, 'value').name('opacity').min(0).max(1).step(0.001)
    shaderGui.add(lineMaterialShader.uniforms.uSizeRail, 'value').name('Size Rails').min(-6).max(6).step(0.001)
    shaderGui.add(lineMaterialShader.uniforms.uRotation, 'value').name('rotation').min(-3).max(3).step(0.001)
    lineMaterialShader.uniforms.color255 = {value: new THREE.Color('blue')}
    shaderGui.addColor(lineMaterialShader.uniforms.color255, 'value')
    .name('color')
    .onChange(()=>{
        lineMaterialShader.uniforms.uColor.value.r = lineMaterialShader.uniforms.color255.value.r /255
        lineMaterialShader.uniforms.uColor.value.g = lineMaterialShader.uniforms.color255.value.g /255
        lineMaterialShader.uniforms.uColor.value.b = lineMaterialShader.uniforms.color255.value.b /255
     })


}


export const getVertexPosition = (obj, index) => {
    const geometry = obj.geometry;

    const vertex = new THREE.Vector3();
    const positionAttribute = geometry.getAttribute( 'position' );
    vertex.fromBufferAttribute( positionAttribute, index );

    return obj.localToWorld( vertex );
}


export const makeDot = () => {
    const sphereGeo = new THREE.SphereBufferGeometry( 0.05, 4, 4 );

    const mat = new THREE.MeshPhysicalMaterial({
        side: THREE.FrontSide,
        color: new THREE.Color('blue'),
        emissive: new THREE.Color('blue'),
        emissiveIntensity: 100,
        depthWrite: false,
        flatShading: true
    });
    const dot = new THREE.Mesh(sphereGeo, mat)
    
    return dot
}

export const makeTriangle = (args) => {
    
    const vertices = new Float32Array([
        -1, 0, 0,
        0, 1, 0,
        1, 0, 0,
    ]);

    const uvCoord = new Float32Array([
        0, 0, //-1
         0, 1, 
         1, 0, 
    ]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    geometry.setAttribute('uv', new THREE.BufferAttribute(uvCoord, 2));
    
    geometry.attributes.uv.needsUpdate = true

    console.log(geometry.attributes.uv)
    // const mat = new THREE.MeshPhongMaterial({
    //     side: THREE.DoubleSide,
    //     color: new THREE.Color('white'),
    //     wireframe: false,
    //     transparent: true,
    //     opacity: 0,
    //     depthWrite: false,
    //     flatShading: true
    // });


    const triangle = new THREE.Mesh(geometry, lineMaterialShader);
    

    return triangle;
}

export const customClone = (mesh) => {
    const newMaterial = mesh.material.clone()
    const newGeometry = mesh.geometry.clone()
    const newMesh = new THREE.Mesh(newGeometry, newMaterial)
    return newMesh
}