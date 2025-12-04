import { Canvas } from "@react-three/fiber";
import StageManager from "./core/StageManager";
import { useTimeline } from "./core/useTimeline";

export default function App() {
  const { play, pause, reset, isPlaying, globalTime } = useTimeline();

  return (
    <>
      <Canvas>
        <StageManager />
      </Canvas>

      {/* Basic Controls */}
      <div style={{ position: "absolute", top: 20, left: 20 }}>
        <button onClick={() => (isPlaying ? pause() : play())}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={reset} style={{ marginLeft: 10 }}>Reset</button>
        <div style={{ marginTop: 10 }}>Time: {globalTime.toFixed(1)}s</div>
      </div>
    </>
  );
}
