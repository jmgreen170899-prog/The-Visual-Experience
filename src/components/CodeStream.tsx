import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CodeStreamProps {
  t?: number;
}

export default function CodeStream({ t: _t = 0 }: CodeStreamProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = -clock.getElapsedTime() % 5;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.5, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="lime" emissive="lime" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}
