import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CodeStreamProps {
  lines?: string[];
  t: number;
  speed?: number;
}

export default function CodeStream({ 
  lines: _lines = [], 
  t: _t,
  speed = 1 
}: CodeStreamProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Create multiple layers of code-like strips at different Z positions
  const codeStrips = useMemo(() => {
    const strips = [];
    const numLayers = 12;
    const numLines = 10;
    
    for (let layer = 0; layer < numLayers; layer++) {
      const z = -layer * 2;
      const layerStrips = [];
      
      for (let line = 0; line < numLines; line++) {
        layerStrips.push({
          x: -2 + (line % 2) * 4,
          y: 2 - line * 0.4,
          z: 0,
          width: 0.5 + Math.random() * 1.5,
          height: 0.08,
        });
      }
      
      strips.push({
        z,
        layerStrips,
      });
    }
    return strips;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Move forward through the tunnel
      groupRef.current.position.z = -clock.getElapsedTime() * speed + 5;
    }
  });

  return (
    <group ref={groupRef}>
      {codeStrips.map((strip, stripIdx) => (
        <group key={stripIdx} position={[0, 0, strip.z]}>
          {strip.layerStrips.map((lineStrip, lineIdx) => (
            <mesh
              key={lineIdx}
              position={[lineStrip.x, lineStrip.y, lineStrip.z]}
            >
              <planeGeometry args={[lineStrip.width, lineStrip.height]} />
              <meshStandardMaterial 
                color="lime" 
                emissive="lime" 
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
