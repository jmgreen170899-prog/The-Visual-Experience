import FullscreenShaderPlane from "../components/FullscreenShaderPlane";
import ParticleField from "../components/ParticleField";
import flowFieldShader from "../shaders/flowField.glsl";

export default function Stage2Patterns({ t }: { t: number }) {
  return (
    <>
      <FullscreenShaderPlane fragmentShader={flowFieldShader} t={t} />
      <ParticleField mode="flow" count={500} t={t} />
    </>
  );
}
