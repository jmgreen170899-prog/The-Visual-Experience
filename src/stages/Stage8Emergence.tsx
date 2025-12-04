import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Stage8Emergence({ t: _t }: { t: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.1;
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
