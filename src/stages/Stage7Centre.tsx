import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Stage7Centre({ t }: { t: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      // Pulse based on t
      const pulse = Math.sin(t * Math.PI * 4) * 0.2 + 1;
      ref.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
    </mesh>
  );
}
