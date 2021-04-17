// Auto-generated by https://github.com/react-spring/gltfjsx

import * as THREE from "three"
import React, { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from "valtio"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Map0 } from "./map0";
import { useStore } from "./audioStore";

import "./styles.css"

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
  current: null,
  items: {
    Material_Mouth: "#ffffff",
    Material_Eye: "#ffffff",
    Material_Lips: "#ffffff",
    Material_Shoe: "#ffffff",
    Material_Hair: "#ffffff",
    Material_Short: "#ffffff",
    Material_Skin: "#ffffff",
    Material_Body: "#ffffff",

  },
})

export default function App({ mouse, ...props }) {

  const [intro, setIntro] = useState(true);
  const cameraDummyPosition = new THREE.Vector3(25, 5, 0);
  const lookAtPos = new THREE.Vector3(0, 1, 0)

  const Content = () => {

    const kjellRef = useRef();
    const { nodes, materials, animations } = useLoader(GLTFLoader, "/kjell.gltf");

    // Set behavior
    const [kjellDummyPositionX, setKjellDummyPositionX] = useState(0.75);
    const [kjellDummyPositionY, setKjellDummyPositionY] = useState(-6);
    const [kjellStep, setKjellStep] = useState(0.01);

    const watchupKjell = () => {
      // Kjelles position to reach in the air
      setKjellDummyPositionX(0);
      setKjellDummyPositionY(70);
      // Lerp speed: not to big because this is camera speed at the end
      setKjellStep(0.15);
      // Kjells settings
      kjellRef.current.rotation.y = -Math.PI / 4;
      kjellRef.current.scale.set(1, 1, 1);
    }

    // Set animation
    const [mixer] = useState(() => new THREE.AnimationMixer());
    useEffect(() => {
      void mixer.clipAction(animations[0], kjellRef.current).play(), []
    })

    // Event manager
    const [chapter, setChapter] = useState(-1);

    // Audio
    const { zik, cape, fly, arrival } = useStore(state => state.api)

    useFrame((state) => {

      mixer.update(0.01);

      if (mixer.time < 5) {
        if (mixer.time > 4.2) {
          if (mixer.time > 4.6) {
            if (kjellDummyPositionY !== -0.8) { setKjellDummyPositionY(-0.8); } // Set Dummy for Kjell = landing position
            if (kjellRef.current.position.y < 5) {
              if (kjellRef.current.position.y !== -0.8) {
                kjellRef.current.position.y = -0.8;         // Rounds kjells vertical pos to -1;
                setChapter(2);                            // Shockwave on  in map.js
                setTimeout(() => { setChapter(3) }, 500); // Camera shakes 500ms
              }
              lookAtPos.y = Math.cos(state.clock.getElapsedTime() * 50) * 0.1;   // Camera shakes
            }
            lookAtPos.lerp(kjellRef.current.position, 0.25);  // Camera tries to follow landing Kjell
          }
          else {
            if (kjellDummyPositionY !== 70) { watchupKjell(); } // Set Kjell up
            lookAtPos.lerp(kjellRef.current.position, 0.025);   // End of arrival, camera without Kjell in the area, move camera towards up for dynamic
          }
          if (chapter === 0) {   // Audio
            setChapter(1);
            arrival();
          }
        }
        else {
          // Kjell shaking during flight
          if (kjellStep < 1) { setKjellStep(prevKjellStep => { return prevKjellStep * 1.01 }); }
          setKjellDummyPositionX(2.5 + Math.cos(mixer.time * Math.random()) * 0.5);
          setKjellDummyPositionY(prevKjellDummyPositionY => { return prevKjellDummyPositionY + kjellStep });
          // Camera
          state.camera.position.lerp(cameraDummyPosition, 0.0002);
          if (chapter === -1) {   // Audio
            setChapter(0);
            fly();
          }
        }
        kjellRef.current.position.lerp(new THREE.Vector3(kjellDummyPositionX, kjellDummyPositionY, 0), kjellStep);
      }  //Intro

      lookAtPos.x = Math.sin(state.clock.getElapsedTime()) * 0.25;
      state.camera.lookAt(lookAtPos)
      state.camera.updateProjectionMatrix();
    })

    // Cursor showing current color
    const snap = useProxy(state);

    const [hovered, set] = useState(null)
    useEffect(() => {
      const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
      const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
    }, [hovered])

    return (
      <>
        <Map0 shockwaveOn={chapter === 2} />
        <group ref={kjellRef} scale={[3, 3, 3]} name="Armature" dispose={null}
          onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
          onPointerOut={(e) => e.intersections.length === 0 && set(null)}
          onPointerMissed={() => (state.current = null)}
          onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
          <primitive object={nodes.Armature_Bone} />
          <primitive object={nodes.Armature_Bone_L} />
          <primitive object={nodes.Armature_Bone_R} />
          <group scale={[0.12, 0.12, 0.12]}>
            <skinnedMesh
              geometry={nodes.Cube_1.geometry}
              material={materials.Material_Mouth}
              material-color={snap.items.Material_Mouth}
              skeleton={nodes.Cube_1.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Cube_2.geometry}
              material={materials.Material_Eye}
              material-color={snap.items.Material_Eye}
              skeleton={nodes.Cube_2.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Cube_3.geometry}
              material={materials.Material_Lips}
              material-color={snap.items.Material_Lips}
              skeleton={nodes.Cube_3.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Cube_4.geometry}
              material={materials.Material_Shoe}
              material-color={snap.items.Material_Shoe}
              skeleton={nodes.Cube_4.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Cube_5.geometry}
              material={materials.Material_Hair}
              material-color={snap.items.Material_Hair}
              skeleton={nodes.Cube_5.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Cube_6.geometry}
              material={materials.Material_Short}
              material-color={snap.items.Material_Short}
              skeleton={nodes.Cube_6.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Cube_7.geometry}
              material={materials.Material_Skin}
              material-color={snap.items.Material_Skin}
              skeleton={nodes.Cube_7.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Cube_8.geometry}
              material={materials.Material_Pupil}
              material-color={snap.items.Material_Pupil}
              skeleton={nodes.Cube_8.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Cube_9.geometry}
              material={materials.Material_Body}
              material-color={snap.items.Material_Body}
              skeleton={nodes.Cube_9.skeleton}
            />
          </group>
        </group>
      </>
    )
  }

  const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };

  const [color, setColor] = useState("#b32aa9");
  function Picker() {
    const snap = useProxy(state);
    return (
      <div style={{ display: snap.current ? "block" : "none" }}>
        <HexColorPicker className="picker" color={color} onChange={(color) => (state.items[snap.current] = color)} />
        <h1>{snap.current}</h1>
      </div>
    )
  }

  const Lights = () => {
    return (
      <>
        <hemisphereLight skyColor="#b1e1ff" groundColor="#aaaaaa" intensity={0.4} />
        <pointLight position={[30, 50, 30]} color="#aaaaaa" intensity={0.15} />
        <pointLight
          position={[100, 100, -100]}
          color="#aaaba9"
          intensity={0.25}
          castShadow
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024} />
      </>
    )
  }

  return (
    <>
      {intro &&
        <div className="title">
          <label>
            Launch Kjell</label>
          <button onClick={() => setIntro(false)}>></button>
        </div>
      }
      {!intro &&
        (<Canvas shadowMap camera={{ far: 5000, near: 1, position: [100, 5, 100], fov: 5 }}>
          <CameraController />
          <Lights />
          <Suspense fallback={null}>
            <group scale={[3, 3, 3]}>
              <Content />
            </group>
          </Suspense>
        </Canvas>)
      }
      <Picker />
    </>
  )




}
