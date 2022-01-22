import * as THREE from 'three'
import linesHoverVertexShader from './shaders/linesHover/vertex.glsl' 
import linesHoverFragmentShader from './shaders/linesHover/fragment.glsl' 

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
        -1, 0,
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

    const mat = new THREE.ShaderMaterial({
        vertexShader: linesHoverVertexShader,
        fragmentShader: linesHoverFragmentShader,
        transparent:true,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms:{
            
    
        }
    })

    const triangle = new THREE.Mesh(geometry, mat);
    

    return triangle;
}

export const customClone = (mesh) => {
    const newMaterial = mesh.material.clone()
    const newGeometry = mesh.geometry.clone()
    const newMesh = new THREE.Mesh(newGeometry, newMaterial)
    return newMesh
}