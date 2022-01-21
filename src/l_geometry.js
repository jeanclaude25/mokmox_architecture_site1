import * as THREE from 'three'
import { camera } from './e_camera';




export const makeTriangle = (args) => {
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
        -1, 0, 0,
        0, 1, 0,
        1, 0, 0,
    ]);

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    let mat = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: new THREE.Color('white'),
        wireframe: false,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        flatShading: true
    });
    let triangle = new THREE.Mesh(geometry, mat);
    

    return triangle;
}

export const customClone = (mesh) => {
    const newMaterial = mesh.material.clone()
    const newGeometry = mesh.geometry.clone()
    const newMesh = new THREE.Mesh(newGeometry, newMaterial)
    return newMesh
}