import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Stage8Emergence({ t }: { t: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Rotate based on t
      groupRef.current.rotation.x = t * Math.PI * 1.6;
      groupRef.current.rotation.y = t * Math.PI * 2.4;
      groupRef.current.rotation.z = t * Math.PI * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(20)].map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 20);
        const theta = Math.sqrt(20 * Math.PI) * phi;
        const x = Math.cos(theta) * Math.sin(phi) * 2;
        const y = Math.sin(theta) * Math.sin(phi) * 2;
        const z = Math.cos(phi) * 2;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="gold" emissive="gold" emissiveIntensity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}
