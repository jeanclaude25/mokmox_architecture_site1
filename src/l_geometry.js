import * as THREE from 'three'

export const getVertexPosition = (obj, index) => {
    const geometry = obj.geometry;
    const positionAttribute = geometry.getAttribute( 'position' );

    const vertex = new THREE.Vector3();
    vertex.fromBufferAttribute( positionAttribute, index );

    return obj.localToWorld( vertex );
}

export const makeDot = () => {
    const sphereGeo = new THREE.SphereBufferGeometry( 0.2, 3, 3 );
    // new THREE.MeshPhysicalMaterial
    const mat = new THREE.MeshPhysicalMaterial({
        side: THREE.FrontSide,
        color: new THREE.Color('blue'),
        emissive: new THREE.Color('blue'),
        emissiveIntensity: 10,
        depthWrite: false,
        flatShading: true
    });
    const dot = new THREE.Mesh(sphereGeo, mat);
    return dot
}

export const makeTriangle = (args) => {
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
        -1, 0, 0,
        0, 1, 0,
        1, 0, 0,
    ]);

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const mat = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: new THREE.Color('white'),
        wireframe: false,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        flatShading: true
    });
    const triangle = new THREE.Mesh(geometry, mat);
    

    return triangle;
}

export const customClone = (mesh) => {
    const newMaterial = mesh.material.clone()
    const newGeometry = mesh.geometry.clone()
    const newMesh = new THREE.Mesh(newGeometry, newMaterial)
    return newMesh
}