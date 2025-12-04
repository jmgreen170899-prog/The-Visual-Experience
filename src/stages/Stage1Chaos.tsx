import FullscreenShaderPlane from "../components/FullscreenShaderPlane";
import chaosNoiseShader from "../shaders/chaosNoise.glsl";

export default function Stage1Chaos({ t }: { t: number }) {
  return <FullscreenShaderPlane fragmentShader={chaosNoiseShader} t={t} />;
}
