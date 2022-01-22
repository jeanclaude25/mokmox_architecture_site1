import * as THREE from 'three'
import { config } from './a_config'
import { scene } from './c_scene';
import { lineMaterialShader } from './g_materials';





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
        // depthWrite: false,
        // flatShading: true
    });
    const dot = new THREE.Mesh(sphereGeo, mat)
    
    return dot
}

const createTrisVertices = (tEx,tEy,tEz) => {
    const ex = tEx || 0
    const ey = tEy || 0
    const ez = tEz || 0
    const vertices = new Float32Array([
        -1 + ex, 0 + ey, 0 + ez,
         0 + ex, 1 + ey, 0 + ez,
         1 + ex, 0 + ey, 0 + ez,
         1 + ex, 0 + ey, 0 + ez
    ]);
    return vertices
}
export const makeLineRail = () => {
    const vertices = createTrisVertices(0,-config.onHover.lineThickness/3,-0.0)
    const uvCoord = new Float32Array([
         0, 0,
         0, 1, 
         1, 0, 
    ]);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvCoord, 2));
    // geometry.attributes.uv.needsUpdate = true
    const railsTris = new THREE.Mesh(geometry, lineMaterialShader);
    railsTris.name = 'railsTris'
    railsTris.scale.x = 1 + config.onHover.lineThickness
    railsTris.scale.y = 1 + config.onHover.lineThickness
    railsTris.scale.z = 1 + config.onHover.lineThickness
    return railsTris
}

export const makeTriangle = (args) => {
    const vertices = createTrisVertices()

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const mat = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: new THREE.Color('white'),
        wireframe: false,
        transparent: true,
        opacity: 0,
        // depthWrite: false,
        flatShading: true
    });


    const triangle = new THREE.Mesh(geometry, mat)
    
    return triangle;
}


export const customClone = (mesh) => {
    const newMaterial = mesh.material.clone()
    const newGeometry = mesh.geometry.clone()
    console.log(mesh)
    const newMesh = new THREE.Mesh(newGeometry, newMaterial)
    return newMesh
}