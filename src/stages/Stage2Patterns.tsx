import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Stage2Patterns({ t: _t }: { t: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.5;
      ref.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime()) * 0.2);
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial color="cyan" wireframe />
    </mesh>
  );
}
