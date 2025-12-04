import FullscreenShaderPlane from "../components/FullscreenShaderPlane";
import fractalShader from "../shaders/fractal.glsl";

export default function Stage3Fractals({ t }: { t: number }) {
  return <FullscreenShaderPlane fragmentShader={fractalShader} t={t} />;
}
