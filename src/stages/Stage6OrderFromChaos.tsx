import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Stage6OrderFromChaos({ t: _t }: { t: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(12)].map((_, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        return (
          <mesh key={i} position={[col - 1.5, row - 1.5, 0]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="purple" />
          </mesh>
        );
      })}
    </group>
  );
}
