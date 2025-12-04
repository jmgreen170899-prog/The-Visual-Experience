import { Canvas } from "@react-three/fiber";
import StageManager from "./core/StageManager";
import { useTimeline } from "./core/useTimeline";

export default function App() {
  const { play, pause, reset, isPlaying, globalTime } = useTimeline();

  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <StageManager />
      </Canvas>

      {/* Basic Controls */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 100 }}>
        <button onClick={() => (isPlaying ? pause() : play())}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={reset} style={{ marginLeft: 10 }}>Reset</button>
        <div style={{ marginTop: 10 }}>Time: {globalTime.toFixed(1)}s</div>
      </div>
    </>
  );
}
