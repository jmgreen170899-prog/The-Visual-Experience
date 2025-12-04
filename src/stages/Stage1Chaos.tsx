import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Stage1Chaos({ t: _t }: { t: number }) {
  const ref = useRef<any>();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.5;
      ref.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
