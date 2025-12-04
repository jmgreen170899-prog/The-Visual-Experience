import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import ParticleField from "../components/ParticleField";
import FullscreenShaderPlane from "../components/FullscreenShaderPlane";
import flowFieldShader from "../shaders/flowField.glsl";

// Small clean network
function CleanNetwork({ t }: { t: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return [
      [0, 0, 0],
      [1, 0.5, 0],
      [-1, 0.5, 0],
      [1, -0.5, 0],
      [-1, -0.5, 0],
    ] as Array<[number, number, number]>;
  }, []);

  const connections = useMemo(() => {
    return [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 2], [3, 4],
    ];
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Breathing effect based on t
      const breath = Math.sin(t * Math.PI * 2) * 0.1 + 1;
      groupRef.current.scale.setScalar(breath);
      groupRef.current.rotation.y = t * Math.PI * 0.5;
    }
  });

  return (
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
          <lineBasicMaterial color="gold" transparent opacity={0.7} />
        </line>
      ))}

      {/* Render nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="gold" 
            emissive="gold" 
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Stage8Emergence({ t }: { t: number }) {
  return (
    <>
      {/* Subtle shader background with low intensity */}
      <FullscreenShaderPlane 
        fragmentShader={flowFieldShader} 
        t={t} 
        extraUniforms={{ u_intensity: 0.2 }}
      />

      {/* Small clean network */}
      <CleanNetwork t={t} />

      {/* Orbiting particles */}
      <ParticleField mode="orbit" count={300} t={t} />

      {/* Soft lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={0.6} color="gold" />
    </>
  );
}
