import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface CodeStreamProps {
  lines?: string[];
  t: number;
  speed?: number;
}

const DEFAULT_LINES = [
  "function think() {",
  "  const ideas = [];",
  "  for (let i = 0; i < N; i++) {",
  "    ideas.push(compute(i));",
  "  }",
  "  return synthesize(ideas);",
  "}",
  "// processing...",
  "if (consciousness) {",
  "  emerge();",
  "}",
];

export default function CodeStream({ 
  lines = DEFAULT_LINES, 
  t: _t,
  speed = 1 
}: CodeStreamProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Create multiple layers of code strips at different Z positions
  const codeStrips = useMemo(() => {
    const strips = [];
    const numLayers = 8;
    for (let layer = 0; layer < numLayers; layer++) {
      const z = -layer * 2;
      strips.push({
        z,
        lines: lines.slice(),
        offset: layer * 0.3,
      });
    }
    return strips;
  }, [lines]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Move camera forward through the tunnel
      groupRef.current.position.z = -clock.getElapsedTime() * speed + 5;
    }
  });

  return (
    <group ref={groupRef}>
      {codeStrips.map((strip, stripIdx) => (
        <group key={stripIdx} position={[0, 0, strip.z]}>
          {strip.lines.map((line, lineIdx) => (
            <Text
              key={lineIdx}
              position={[
                -2 + (lineIdx % 2) * 4,
                2 - lineIdx * 0.4,
                0
              ]}
              fontSize={0.15}
              color="lime"
              anchorX="left"
              anchorY="middle"
            >
              {line}
            </Text>
          ))}
        </group>
      ))}
    </group>
  );
}
