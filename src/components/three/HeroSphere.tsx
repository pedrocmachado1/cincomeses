import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import type { Mesh } from 'three'

export default function HeroSphere() {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.12
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.18
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[8, 8, 8]}   intensity={2}   color="#C8871A" />
      <pointLight position={[-6, -4, -4]} intensity={1}   color="#8B1A1A" />
      <pointLight position={[0, -8, 4]}  intensity={0.5} color="#F5E6C8" />

      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#2C1810"
          attach="material"
          distort={0.35}
          speed={1.8}
          roughness={0.2}
          metalness={0.95}
        />
      </Sphere>
    </>
  )
}