// Auto-generated by https://github.com/react-spring/gltfjsx

import * as THREE from "three"
import React, { useRef, useMemo, useState, useEffect } from 'react'
import { useThree, useLoader, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { getMouseDegrees } from "./utils"

const tempObject = new THREE.Object3D()

export default function Boxes() {
  const [hovered, set] = useState()
  const ref = useRef()
  const previous = useRef()
  useEffect(() => void (previous.current = hovered), [hovered])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(time / 4)
    ref.current.rotation.y = Math.sin(time / 2)
    let i = 0
    for (let x = 0; x < 10; x++)
      for (let y = 0; y < 10; y++)
        for (let z = 0; z < 10; z++) {
          const id = i++
          tempObject.position.set(5 - x, 5 - y, 5 - z)
          tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
          tempObject.rotation.z = tempObject.rotation.y * 2
          const scale = id === hovered ? 2 : 1
          tempObject.scale.set(scale, scale, scale)
          tempObject.updateMatrix()
          ref.current.setMatrixAt(id, tempObject.matrix)
        }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[null, null, 1000]} onPointerMove={(e) => set(e.instanceId)} onPointerOut={(e) => set(undefined)}>
      <boxGeometry args={[0.7, 0.7, 0.7]}>
      </boxGeometry>
      <meshPhongMaterial vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}
