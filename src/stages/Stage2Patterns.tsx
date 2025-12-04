import FullscreenShaderPlane from "../components/FullscreenShaderPlane";
import flowFieldShader from "../shaders/flowField.glsl";

export default function Stage2Patterns({ t }: { t: number }) {
  return <FullscreenShaderPlane fragmentShader={flowFieldShader} t={t} />;
}
