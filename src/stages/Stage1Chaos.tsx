import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Stage1Chaos({ t }: { t: number }) {
  const ref = useRef<any>();

  useFrame(() => {
    if (ref.current) {
      // Rotate based on t (0→1), creating chaotic spinning
      ref.current.rotation.x = t * Math.PI * 4;
      ref.current.rotation.y = t * Math.PI * 2.4;
      // Scale from 0.5 to 1.5 over the stage duration
      const scale = 0.5 + t * 1.0;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
