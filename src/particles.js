/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useLoader, useFrame, useThree } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export const Particles = () => {

    function Swarm({ count }) {

        const speedRef = useRef();
        const speedObject = new THREE.Object3D();
        const [speedOn, setSpeedOn] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => {
                setSpeedOn(false);
            }, 6000);
            return () => clearTimeout(timer);
        }, []);

        const treeRef = useRef();
        const treeDummy = useMemo(() => new THREE.Object3D(), [])
        const [treeOn, setTreeOn] = useState(false);
        // Generate some random positions, speed factors and timings
        const treeParticles = useMemo(() => {
            const temp = [];
            for (let i = 0; i < count; i++) {
                const t = Math.random() * 100;
                const factor = 2 + Math.random() * 2;
                const speed = 0.1 + Math.random() / 3;
                const xFactor = 1 - Math.random() * 9;
                const yFactor = 1 + Math.random() * 5;
                const zFactor = -15 + Math.random() * 1.5;
                temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
            }
            return temp
        }, [count]);

        useEffect(() => {
            const timer = setTimeout(() => {
                setTreeOn(true);
            }, 7000);
            return () => clearTimeout(timer);
        }, []);

        const shockwaveRef = useRef();
        const shockwaveObject = new THREE.Object3D({
            position: [0, 2, 0],
            scale: [0.2, 0.2, 0.2]
        });
        const [shockwaveOn, setShockwaveOn] = useState(false);
        /*
        useEffect(() => {
          const timer = setTimeout(() => {
            setShockwaveOn(true);
          }, 16000);
          return () => clearTimeout(timer);
        }, []); */

        useFrame(state => {

            const time = state.clock.getElapsedTime();

            if (speedOn) {
                for (let x = 0; x < 100; x++) {
                    const id = x;
                    speedObject.position.set(
                        speedObject.position.x + 2,
                        speedObject.position.y + 0.15,
                        speedObject.position.z + 2);
                    if (speedObject.position.z > 50 && time < 5.5) {
                        speedObject.position.set(
                            -220 + Math.random() * 40,
                            2 - Math.random() * 20,
                            -220 + Math.random() * 40);
                        let ranDirection = 50 - Math.random() * 100;
                        speedObject.lookAt(
                            new THREE.Vector3(
                                state.camera.position.x + ranDirection,
                                state.camera.position.y,
                                state.camera.position.z + ranDirection));
                    }
                    speedObject.updateMatrix();
                    speedRef.current.setMatrixAt(id, speedObject.matrix);
                }
                if (time > 6000) {
                    speedRef.current.instanceMatrix.needsUpdate = false;
                    setSpeedOn(false);
                } else {
                    speedRef.current.instanceMatrix.needsUpdate = true;
                }
            }

            if (treeOn) {
                // Run through the randomized data to calculate some movement
                treeParticles.forEach((particle, i) => {
                    let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
                    t = particle.t += speed / 2;
                    treeDummy.position.set(
                        xFactor + (speed / 3) * t + Math.cos(t / factor),
                        yFactor - (speed / 3) * t,
                        zFactor + (t * factor) / 3
                    );
                    if (treeDummy.position.y < 0) {
                        particle.t = 0;
                    }
                    treeDummy.updateMatrix();
                    treeRef.current.setMatrixAt(i, treeDummy.matrix);
                })
                treeRef.current.instanceMatrix.needsUpdate = true;
            }

            if (shockwaveOn) {
                let newScale = shockwaveObject.scale.x * 1.1;
                shockwaveObject.scale.set(newScale, newScale, newScale);
                if (shockwaveObject.scale.x > 2) {
                    shockwaveRef.current.instanceMatrix.needsUpdate = false;
                    setShockwaveOn(false);
                } else {
                    shockwaveObject.updateMatrix();
                    shockwaveRef.current.setMatrixAt(1, shockwaveObject.matrix);
                    shockwaveRef.current.instanceMatrix.needsUpdate = true;
                }
            }

        })

        return (
            <>
                {speedOn &&
                    <instancedMesh ref={speedRef} args={[null, null, 100]}>
                        <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 50]} />
                        <meshBasicMaterial attach="material" color="white" />
                    </instancedMesh>
                }

                {treeOn &&
                    <instancedMesh ref={treeRef} args={[null, null, count]}>
                        <dodecahedronBufferGeometry attach="geometry" args={[0.05, 0]} />
                        <meshBasicMaterial attach="material" color="#ffaaaa" />
                    </instancedMesh>
                }
            </>
        )
    }

    function Example() {

        const exampleRef = useRef();
        const exampleObject = new THREE.Object3D({
            position: [0, 0, 0],
            scale: [10, 10, 10]
        });

        useFrame(() => {
            for (let x = 0; x < 2; x++) {
                exampleObject.updateMatrix();
                exampleRef.current.setMatrixAt(x, exampleObject.matrix);
            }
            exampleRef.current.instanceMatrix.needsUpdate = true;
        })

        return (
            <instancedMesh castShadow ref={exampleRef} args={[null, null, 2]}>
                <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
                <meshStandardMaterial attach="material" color="white" />
            </instancedMesh>
        )
    }


    return (
        <group dispose={null}>
            {/*<Swarm count={10} />*/}
            <Example />
        </group>
    )
}

/*return (
    <group ref={ref} dispose={null}>
      <Boxes amount={2} material="meshBasicMaterial" color="lightpink" />
      <Swarm count={10} />
      <Boxes amount={6} color="#575760" />
      <primitive object={nodes.Armature_Bone} />
        <skinnedMesh material={materials['Material.001']} geometry={nodes.Cube.geometry} skeleton={nodes.Cube.skeleton} />
    </group>
  )


  Kjell spoition : <group position={[1.08, -0.25, -0]} scale={[0.6, 0.6, 0.6]}>

  */
