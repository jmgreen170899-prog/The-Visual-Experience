import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  t?: number;
  mode?: "flow" | "orbit" | "static";
}

export default function ParticleField({ 
  count = 1000, 
  t: _t = 0,
  mode = "static"
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const initialPositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      if (mode === "flow") {
        // Spawn in a plane for flow field
        positions[i * 3] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      } else {
        // Spawn in a cube for other modes
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
    }
    return positions;
  }, [count, mode]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const geometry = pointsRef.current.geometry;
      const positions = geometry.attributes.position.array as Float32Array;
      
      if (mode === "flow") {
        // Coherent flow-like movement using sine waves
        for (let i = 0; i < count; i++) {
          const idx = i * 3;
          const baseX = initialPositions[idx];
          const baseY = initialPositions[idx + 1];
          const baseZ = initialPositions[idx + 2];
          
          // Create flow-like movement
          const flowX = Math.sin(baseY * 0.5 + clock.getElapsedTime() * 0.5) * 0.5;
          const flowY = Math.cos(baseX * 0.5 + clock.getElapsedTime() * 0.5) * 0.5;
          const flowZ = Math.sin((baseX + baseY) * 0.3 + clock.getElapsedTime() * 0.3) * 0.3;
          
          positions[idx] = baseX + flowX;
          positions[idx + 1] = baseY + flowY;
          positions[idx + 2] = baseZ + flowZ;
        }
        geometry.attributes.position.needsUpdate = true;
      } else if (mode === "orbit") {
        // Orbiting particles
        pointsRef.current.rotation.y = clock.getElapsedTime() * 0.3;
        pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
      } else {
        // Static rotation
        pointsRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={initialPositions.length / 3}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="white" transparent opacity={0.8} />
    </points>
  );
}
