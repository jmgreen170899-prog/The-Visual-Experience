import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Stage2Patterns({ t }: { t: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      // Rotate based on t
      ref.current.rotation.z = t * Math.PI * 4;
      // Scale pulses using t
      ref.current.scale.setScalar(1 + Math.sin(t * Math.PI * 4) * 0.2);
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial color="cyan" wireframe />
    </mesh>
  );
}
