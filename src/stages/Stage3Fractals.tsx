import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Stage3Fractals({ t: _t }: { t: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i * 1.26) * 2, Math.sin(i * 1.26) * 2, 0]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="lime" />
        </mesh>
      ))}
    </group>
  );
}
