import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FullscreenShaderPlaneProps {
  fragmentShader: string;
  uniforms?: Record<string, any>;
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
  uniforms = {},
}: FullscreenShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const shaderUniforms = useRef({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_t: { value: 0 },
    ...uniforms,
  });

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={defaultVertexShader}
        fragmentShader={fragmentShader}
        uniforms={shaderUniforms.current}
      />
    </mesh>
  );
}
