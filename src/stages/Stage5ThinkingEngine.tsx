import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Stage5ThinkingEngine({ t }: { t: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      // Rotate based on t
      ref.current.rotation.x = t * Math.PI * 4.8;
      ref.current.rotation.y = t * Math.PI * 3.2;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial color="yellow" wireframe />
    </mesh>
  );
}
