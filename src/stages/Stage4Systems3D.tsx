import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Warped circle component
function WarpedCircle({ t }: { t: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.RingGeometry(2, 2.3, 64);
    const positions = geo.attributes.position.array as Float32Array;

    // Store original positions for animation
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

      // Noise decreases over time but never reaches 0
      const noiseAmount = 0.3 * (1 - t * 0.7);

      for (let i = 0; i < positions.length; i += 3) {
        const x = original[i];
        const y = original[i + 1];
        const angle = Math.atan2(y, x);
        const radius = Math.sqrt(x * x + y * y);

        // Apply warping with noise
        const warp = Math.sin(angle * 5 + clock.getElapsedTime() * 2) * noiseAmount;
        const warp2 = Math.cos(angle * 3 - clock.getElapsedTime() * 1.5) * noiseAmount * 0.5;

        const newRadius = radius + warp + warp2;
        positions[i] = Math.cos(angle) * newRadius;
        positions[i + 1] = Math.sin(angle) * newRadius;
      }

      geo.attributes.position.needsUpdate = true;
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={ringRef} geometry={geometry}>
      <meshStandardMaterial 
        color="orange" 
        emissive="orange" 
        emissiveIntensity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Stage4Systems3D({ t }: { t: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Define system nodes
  const nodes = useMemo(() => {
    return [
      [0, 0, 0],
      [2, 1, 0],
      [-2, 1, 0],
      [2, -1, 0],
      [-2, -1, 0],
      [0, 2, 0],
      [0, -2, 0],
    ] as Array<[number, number, number]>;
  }, []);

  // Define connections between nodes
  const connections = useMemo(() => {
    return [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
      [1, 5], [2, 5], [3, 6], [4, 6],
    ];
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Rotate based on t
      groupRef.current.rotation.y = Math.sin(t * Math.PI) * 0.5;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Render lines */}
        {connections.map(([from, to], i) => (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...nodes[from], ...nodes[to]])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="orange" transparent opacity={0.6} />
          </line>
        ))}

        {/* Render nodes */}
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color="orange" 
              emissive="orange" 
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Warped circle */}
      <WarpedCircle t={t} />
    </>
  );
}
