import React, { useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export const Try = ({ shockwaveOn }) => {

    const gltf = useLoader(GLTFLoader, '/Cube.gltf');
    const ref = useRef();

     return (
        <>
        <spotLight intensity={0.6} position={[20, 10, 10]} angle={0.2} penumbra={1} shadow-mapSize-width={2048} shadow-mapSize-height={2048} castShadow />
            <mesh receiveShadow>
            <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
            <meshPhongMaterial attach="material" color="white" />
            </mesh>
            <mesh castShadow position={[0,2,0]}>
            <dodecahedronBufferGeometry attach="geometry" args={[1.4, 0]} />
            <meshNormalMaterial attach="material" />
            </mesh>
        </>
    )
}