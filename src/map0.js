import React, { useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export const Map0 = ({ shockwaveOn }) => {

    const { nodes, materials } = useLoader(GLTFLoader, '/map.gltf')

    const mapRef = useRef();
    const mapDummyPosition = new THREE.Vector3(0, -0.8, 0);
    const mapDummyRotation = new THREE.Quaternion(0, -Math.PI, 0, 0);
    const mapDummyScale = new THREE.Vector3(1, 1, 1);

    const shockwaveRef = useRef();

    useFrame(() => {
        // Target cametra during the arrival: follows Kjell + slow move towards map
        mapRef.current.position.lerp(mapDummyPosition, 0.0175);
        mapRef.current.scale.lerp(mapDummyScale, 0.015);
        if (mapRef.current.position.x >= -2500) {
            mapRef.current.quaternion.slerp(mapDummyRotation, 0.0002);
        }

        if (shockwaveOn) {
            let shockwaveScale = shockwaveRef.current.scale.x * 2;
            shockwaveRef.current.position.set(
                shockwaveRef.current.position.x,
                shockwaveRef.current.position.y + 0.025,
                shockwaveRef.current.position.z);
            shockwaveRef.current.scale.set(shockwaveScale, shockwaveScale * 0.5, shockwaveScale);
        }
    });

    return (
        <group ref={mapRef} position={[-5000, -500, -5000]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} dispose={null} >
            <group position={[-8.02, 1.19, -10.83]} rotation={[-Math.PI, -1.57, 0]} scale={[-0.88, -0.88, -0.88]}>
        <mesh geometry={nodes.Building1_1.geometry} material={glass} />
        <mesh geometry={nodes.Building1_2.geometry} material={white} />
        <mesh geometry={nodes.Building1_3.geometry} material={beige} />
        <mesh geometry={nodes.Building1_4.geometry} material={concrete_1} />
        <mesh geometry={nodes.Building1_5.geometry} material={concrete_0} />
        <mesh geometry={nodes.Building1_6.geometry} material={wall_0} />
      </group>
      <group position={[-12.73, 0.67, 0.61]} rotation={[0, Math.PI / 2, 0]} scale={[3.09, 1.18, 2.8]}>
        <mesh geometry={nodes.Building2_1.geometry} material={wall_1} />
        <mesh geometry={nodes.Building2_2.geometry} material={glass} />
        <mesh geometry={nodes.Building2_3.geometry} material={white} />
        <mesh geometry={nodes.Building2_4.geometry} material={wall_1A} />
      </group>
      <mesh geometry={nodes.Fence.geometry} material={wood} position={[0, 0.47, 0]} />
      <mesh geometry={nodes.Mesh001.geometry} material={concrete_0} />
      <mesh geometry={nodes.Mesh001_1.geometry} material={sand_0} />
      <mesh geometry={nodes.Mesh001_2.geometry} material={sand_1} />
      <mesh geometry={nodes.Mesh001_3.geometry} material={alley} />
      <mesh geometry={nodes.Mesh001_4.geometry} material={grass_0} />
      <mesh geometry={nodes.Mesh001_5.geometry} material={grass_1} />
      <mesh geometry={nodes.Mesh001_6.geometry} material={grass_2} />
      <mesh
        geometry={nodes.Icosphere000.geometry}
        material={leaves_0}
        position={[11.42, 0.57, 15.9]}
        rotation={[-2.25, 0.2, -2.78]}
        scale={[0.36, 0.36, 0.36]}
      />
      <mesh
        geometry={nodes.Icosphere001.geometry}
        material={leaves_0}
        position={[15.68, 0.24, 14.39]}
        rotation={[-1.7, -1.27, -2.26]}
        scale={[0.65, 0.65, 0.65]}
      />
      <mesh
        geometry={nodes.Icosphere002.geometry}
        material={leaves_1}
        position={[0.05, 0.5, 12.61]}
        rotation={[-1.92, 0.63, 2.73]}
        scale={[0.36, 0.36, 0.36]}
      />
      <mesh
        geometry={nodes.Icosphere003.geometry}
        material={leaves_1}
        position={[14.43, 0.35, 15.52]}
        rotation={[-1.7, -1.27, -2.26]}
        scale={[0.87, 0.87, 0.87]}
      />
      <mesh
        geometry={nodes.Icosphere004.geometry}
        material={leaves_0}
        position={[14.58, 0.43, 2.36]}
        rotation={[-1.97, -0.95, -1.4]}
        scale={[0.36, 0.36, 0.36]}
      />
      <mesh geometry={nodes.Icosphere005.geometry} material={leaves_1} />
      <mesh
        geometry={nodes.Icosphere006.geometry}
        material={leaves_0}
        position={[-1.81, 0.57, 8.55]}
        rotation={[-1.92, 0.63, 2.73]}
        scale={[0.36, 0.36, 0.36]}
      />
      <mesh
        geometry={nodes.Icosphere007.geometry}
        material={leaves_1}
        position={[-5.45, 0.76, -12.32]}
        rotation={[-0.61, 0.39, 0.91]}
        scale={[0.36, 0.36, 0.36]}
      />
      <mesh
        geometry={nodes.Icosphere008.geometry}
        material={leaves_0}
        position={[-5.45, 0.59, -12.32]}
        rotation={[-0.61, 0.39, 0.91]}
        scale={[0.36, 0.36, 0.36]}
      />
      <mesh
        geometry={nodes.Icosphere.geometry}
        material={leaves_0}
        position={[12.2, 0.35, 15.93]}
        rotation={[-0.51, -0.32, 0.62]}
        scale={[0.65, 0.65, 0.65]}
      />
      <group position={[-5.86, 0.84, -5.27]} rotation={[-2.46, 0.41, -2.48]} scale={[0.53, 0.53, 0.53]}>
        <mesh geometry={nodes.Icosphere008_1.geometry} material={wood} />
        <mesh geometry={nodes.Icosphere008_2.geometry} material={leaves_2} />
        <mesh geometry={nodes.Icosphere008_3.geometry} material={leaves_3} />
      </group>
      <mesh ref={shockwaveRef}
        geometry={nodes.Shockwave.geometry}
        material={materials.basicWhite}
        position={[4.15, 0.06, 0.85]}
        scale={[0.01, 0.01, 0.01]}
      />
      <group position={[-10.53, 1.3, 12.72]} rotation={[-Math.PI, 0, -Math.PI]} scale={[3.56, 1.37, 2.01]}>
        <mesh geometry={nodes.Shop_1.geometry} material={white} />
        <mesh geometry={nodes.Shop_2.geometry} material={wall_3} />
        <mesh geometry={nodes.Shop_3.geometry} material={wall_0} />
        <mesh geometry={nodes.Shop_4.geometry} material={wall_4} />
        <mesh geometry={nodes.Shop_5.geometry} material={glass} />
        <mesh geometry={nodes.Shop_6.geometry} material={wall_concrete} />
      </group>
      <group position={[-2.07, 5.61, -13.71]} rotation={[-2.99, 0.2, -2.34]} scale={[0.35, 0.35, 0.35]}>
        <mesh geometry={nodes.Tree0_1.geometry} material={leaves_Dark_0} />
        <mesh geometry={nodes.Tree0_2.geometry} material={leaves_0} />
        <mesh geometry={nodes.Tree0_3.geometry} material={wood} />
      </group>
      <group position={[-9.92, 5.91, -4.69]} rotation={[-0.16, 0.4, 0.9]} scale={[0.37, 0.37, 0.37]}>
        <mesh geometry={nodes.Tree1_1.geometry} material={leaves_0} />
        <mesh geometry={nodes.Tree1_2.geometry} material={leaves_Dark_0} />
        <mesh geometry={nodes.Tree1_3.geometry} material={wood} />
      </group>
      <group position={[-7.36, 6.53, -14.9]} rotation={[-0.88, -1.37, -0.03]} scale={[0.38, 0.38, 0.38]}>
        <mesh geometry={nodes.TreeDark_1.geometry} material={leaves_1} />
        <mesh geometry={nodes.TreeDark_2.geometry} material={wood} />
        <mesh geometry={nodes.TreeDark_3.geometry} material={leaves_Dark_1} />
      </group>
        </group>
    )
}

const glass = new THREE.MeshStandardMaterial({
    color: "#408A8D",
    roughness: 0,
})

const wall_1 = new THREE.MeshStandardMaterial({
    color: "#914635",
    roughness: 1,
})

const wall_1A = new THREE.MeshStandardMaterial({
    color: "#A35449",
    roughness: 1
})

const white = new THREE.MeshStandardMaterial({
    color: "white",
    roughness: 1
})

const basicWhite = new THREE.MeshBasicMaterial({
    color: "white",
    roughness: 1
})

const wall_3 = new THREE.MeshStandardMaterial({
    color: "#F85D5B",
    roughness: 1
})

const beige = new THREE.MeshStandardMaterial({
    color: "#E7CB76",
    roughness: 1
})

const wall_0 = new THREE.MeshStandardMaterial({
    color: "#B45130",
    roughness: 1
})

const wall_4 = new THREE.MeshStandardMaterial({
    color: "#EACA93",
    roughness: 1
})

const wood = new THREE.MeshStandardMaterial({
    color: "#5A3F1C",
    roughness: 1
})

const leaves_0 = new THREE.MeshStandardMaterial({
    color: "#20C02E",
    roughness: 1
})

const leaves_Dark_0 = new THREE.MeshStandardMaterial({
    color: "#188129",
    roughness: 1
})

const leaves_1 = new THREE.MeshStandardMaterial({
    color: "#019F85",
    roughness: 1
})

const leaves_Dark_1 = new THREE.MeshStandardMaterial({
    color: "#017561",
    roughness: 1
})

const leaves_2 = new THREE.MeshStandardMaterial({
    color: "#094D0A",
    roughness: 1
})

const leaves_3 = new THREE.MeshStandardMaterial({
    color: "#0A410B",
    roughness: 1
})

const wall_concrete = new THREE.MeshStandardMaterial({
    color: "#656565",
    roughness: 1
})

const grass_0 = new THREE.MeshStandardMaterial({
    color: "#358432",
    roughness: 1
})

const grass_1 = new THREE.MeshStandardMaterial({
    color: "#278432",
    roughness: 1
})

const grass_2 = new THREE.MeshStandardMaterial({
    color: "#278427",
    roughness: 1
})

const sand_0 = new THREE.MeshStandardMaterial({
    color: "#F8C944",
    roughness: 1
})

const sand_1 = new THREE.MeshStandardMaterial({
    color: "#FCDB49",
    roughness: 1
})

const concrete_0 = new THREE.MeshStandardMaterial({
    color: "#ACA7A4",
    roughness: 1
})

const concrete_1 = new THREE.MeshStandardMaterial({
    color: "#6C6967",
    roughness: 1
})

const alley = new THREE.MeshStandardMaterial({
    color: "#BBBAB8",
    roughness: 1
})