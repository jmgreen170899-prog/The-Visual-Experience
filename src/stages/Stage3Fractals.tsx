import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Stage3Fractals({ t }: { t: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Rotate based on t
      groupRef.current.rotation.x = t * Math.PI * 2.4;
      groupRef.current.rotation.y = t * Math.PI * 1.6;
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
