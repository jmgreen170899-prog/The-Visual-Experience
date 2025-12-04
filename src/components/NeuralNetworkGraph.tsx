import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralNetworkGraphProps {
  t: number;
}

export default function NeuralNetworkGraph({ t }: NeuralNetworkGraphProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Define 3 layers: input, hidden, output
  const nodeStructure = useMemo(() => {
    const layers = [
      { count: 4, x: -3, label: "input" },
      { count: 6, x: 0, label: "hidden" },
      { count: 3, x: 3, label: "output" },
    ];

    const nodes: Array<{ pos: [number, number, number]; layer: number; index: number }> = [];
    const connections: Array<[number, number]> = [];

    let nodeIdx = 0;
    layers.forEach((layer, layerIdx) => {
      const startY = -(layer.count - 1) / 2;
      for (let i = 0; i < layer.count; i++) {
        nodes.push({
          pos: [layer.x, startY + i, 0],
          layer: layerIdx,
          index: nodeIdx,
        });
        nodeIdx++;
      }
    });

    // Create connections between layers
    let currentNodeIdx = 0;
    for (let layerIdx = 0; layerIdx < layers.length - 1; layerIdx++) {
      const currentLayerCount = layers[layerIdx].count;
      const nextLayerCount = layers[layerIdx + 1].count;
      const nextLayerStart = currentNodeIdx + currentLayerCount;

      for (let i = 0; i < currentLayerCount; i++) {
        for (let j = 0; j < nextLayerCount; j++) {
          connections.push([currentNodeIdx + i, nextLayerStart + j]);
        }
      }
      currentNodeIdx += currentLayerCount;
    }

    return { nodes, connections };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slowly rotate the entire graph
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Render connections first (so they appear behind nodes) */}
      {nodeStructure.connections.map(([fromIdx, toIdx], i) => {
        const from = nodeStructure.nodes[fromIdx];
        const to = nodeStructure.nodes[toIdx];
        
        return (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...from.pos, ...to.pos])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="cyan" transparent opacity={0.6} />
          </line>
        );
      })}

      {/* Render nodes */}
      {nodeStructure.nodes.map((node, i) => {
        // Jitter decreases over time
        const jitterAmount = Math.max(0, 1 - t) * 0.15;
        const timeOffset = i * 0.1;
        
        return (
          <mesh
            key={i}
            position={[
              node.pos[0] + Math.sin(timeOffset * 2 + t * 3) * jitterAmount,
              node.pos[1] + Math.cos(timeOffset * 3 + t * 4) * jitterAmount,
              node.pos[2] + Math.sin(timeOffset * 1.5 + t * 2.5) * jitterAmount * 0.5,
            ]}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
              color="cyan" 
              emissive="cyan" 
              emissiveIntensity={0.5 + Math.sin(t * 6 + i * 0.5) * 0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}
