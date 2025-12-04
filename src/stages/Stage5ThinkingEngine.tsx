import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Stage5ThinkingEngine({ t: _t }: { t: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.6;
      ref.current.rotation.y = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial color="yellow" wireframe />
    </mesh>
  );
}
