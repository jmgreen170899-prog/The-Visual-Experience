import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Warped ring around the centre sphere
function WarpedRing({ t }: { t: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.TorusGeometry(2.5, 0.15, 16, 64);
    const positions = geo.attributes.position.array as Float32Array;

    // Store original positions
    const originalPositions = new Float32Array(positions.length);
    originalPositions.set(positions);
    (geo as any).originalPositions = originalPositions;

    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const geo = ringRef.current.geometry as THREE.BufferGeometry;
      const positions = geo.attributes.position.array as Float32Array;
      const original = (geo as any).originalPositions as Float32Array;

      // Distortion decreases over time but never reaches 0
      const distortion = 0.2 * (1 - t * 0.8);

      for (let i = 0; i < positions.length; i += 3) {
        const x = original[i];
        const y = original[i + 1];
        const z = original[i + 2];
        
        const angle = Math.atan2(z, x);
        const warp = Math.sin(angle * 4 + clock.getElapsedTime() * 2) * distortion;
        const warp2 = Math.cos(angle * 6 - clock.getElapsedTime() * 1.5) * distortion * 0.5;

        positions[i] = x + warp;
        positions[i + 1] = y + warp2;
        positions[i + 2] = z + warp;
      }

      geo.attributes.position.needsUpdate = true;
      ringRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      ringRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={ringRef} geometry={geometry}>
      <meshStandardMaterial 
        color="white" 
        emissive="white" 
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

export default function Stage7Centre({ t }: { t: number }) {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sphereRef.current) {
      // Gentle pulse based on t
      const pulse = Math.sin(t * Math.PI * 4) * 0.1 + 1;
      sphereRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <>
      {/* Central glowing sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="white" 
          emissive="white" 
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Warped ring */}
      <WarpedRing t={t} />

      {/* Enhanced lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="white" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="white" />
    </>
  );
}
