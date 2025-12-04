import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralNetworkGraphProps {
  t?: number;
}

export default function NeuralNetworkGraph({ t: _t = 0 }: NeuralNetworkGraphProps) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = [
    [0, 2, 0],
    [-1, 0, 0],
    [1, 0, 0],
    [0, -2, 0],
  ];

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.5} />
        </mesh>
      ))}
      
      {/* Connections - simplified for now */}
      {nodes.slice(0, -1).map((_, i) => {
        if (i < nodes.length - 1) {
          return (
            <line key={`line-${i}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([...nodes[i], ...nodes[i + 1]])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="cyan" />
            </line>
          );
        }
        return null;
      })}
    </group>
  );
}
