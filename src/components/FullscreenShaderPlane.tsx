import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface FullscreenShaderPlaneProps {
  fragmentShader: string;
  t: number;
  extraUniforms?: Record<string, any>;
}

const defaultVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export default function FullscreenShaderPlane({
  fragmentShader,
  t,
  extraUniforms = {},
}: FullscreenShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const shaderUniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_t: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      ...Object.entries(extraUniforms).reduce((acc, [key, val]) => {
        acc[key] = { value: val };
        return acc;
      }, {} as Record<string, { value: any }>),
    }),
    [size.width, size.height, extraUniforms]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = clock.getElapsedTime();
      material.uniforms.u_t.value = t;
      material.uniforms.u_resolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh ref={meshRef} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={defaultVertexShader}
        fragmentShader={fragmentShader}
        uniforms={shaderUniforms}
      />
    </mesh>
  );
}
