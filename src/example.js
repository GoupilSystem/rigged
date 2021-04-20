import usePromise from "react-promise-suspense";
import "./styles.css";
import React, { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export const Example = () => {
    const gltf = useLoader(GLTFLoader, '/Cube.gltf');
    const ref = useRef();

     return (
        <>
            <mesh receiveShadow>
            <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
            <meshPhongMaterial attach="material" color="white" />
            </mesh>
            <mesh castShadow ref={ref}>
                <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
                <meshStandardMaterial attach="material" {...gltf.__$[3].material} />
            </mesh>
            <mesh castShadow position={[0,-2,0]}>
            <dodecahedronBufferGeometry attach="geometry" args={[1.4, 0]} />
            <meshNormalMaterial attach="material" />
            </mesh>
        </>
  );
}