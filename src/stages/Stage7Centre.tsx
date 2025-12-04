import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Stage7Centre({ t: _t }: { t: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.2 + 1;
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
