# Mind Visualiser - The Visual Experience

A 2-minute multi-stage visual experience that represents how the mind works, built with React, react-three-fiber (R3F), and custom GLSL shaders.

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React** - UI framework
- **TypeScript** - Type safety
- **three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for three.js
- **@react-three/drei** - Useful helpers for R3F
- **zustand** - Global state management

## Project Structure

```
src/
├── main.tsx              # Entry point
├── App.tsx               # Main app component with Canvas
├── styles.css            # Global styles
├── core/
│   ├── StageManager.tsx  # Manages stage switching based on timeline
│   ├── useTimeline.ts    # Zustand store for global timeline state
│   └── AudioEngine.tsx   # Placeholder for future audio implementation
├── stages/
│   ├── Stage1Chaos.tsx
│   ├── Stage2Patterns.tsx
│   ├── Stage3Fractals.tsx
│   ├── Stage4Systems3D.tsx
│   ├── Stage5ThinkingEngine.tsx
│   ├── Stage6OrderFromChaos.tsx
│   ├── Stage7Centre.tsx
│   └── Stage8Emergence.tsx
├── shaders/
│   ├── chaosNoise.glsl
│   ├── flowField.glsl
│   ├── fractal.glsl
│   └── centreSdf.glsl
├── components/
│   ├── FullscreenShaderPlane.tsx  # Reusable shader plane
│   ├── ParticleField.tsx          # Particle system
│   ├── NeuralNetworkGraph.tsx     # Neural network visualization
│   ├── CodeStream.tsx             # Code streaming effect
│   └── TextOverlay.tsx            # HTML text overlay
└── config/
    └── timeline.ts       # Stage timing configuration
```

## Timeline

The experience is divided into 8 stages over 120 seconds:

| Stage | ID | Duration | Start | End |
|-------|-----|----------|-------|-----|
| 1 | chaos | 12s | 0s | 12s |
| 2 | patterns | 12s | 12s | 24s |
| 3 | fractals | 16s | 24s | 40s |
| 4 | systems3D | 16s | 40s | 56s |
| 5 | thinkingEngine | 24s | 56s | 80s |
| 6 | orderFromChaos | 16s | 80s | 96s |
| 7 | centre | 14s | 96s | 110s |
| 8 | emergence | 10s | 110s | 120s |

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see the experience.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How It Works

### Timeline System

The timeline uses Zustand for global state management. It tracks:
- `globalTime` - Current time in seconds
- `isPlaying` - Whether the timeline is playing
- `duration` - Total duration (120s)

The timeline advances using `requestAnimationFrame` for smooth animation.

### Stage Manager

The `StageManager` component:
1. Reads the current `globalTime` from the timeline store
2. Determines which stage should be active based on the timeline config
3. Calculates the local progress `t` (0-1) for that stage
4. Renders the appropriate stage component with the `t` prop

### Stage Components

Each stage component receives a `t` prop representing the local progress (0 at start, 1 at end). This can be used for:
- Fade in/out effects
- Stage-specific animations
- Transitions between substages

### Reusable Components

- **FullscreenShaderPlane**: Renders a fullscreen plane with custom GLSL shaders
- **ParticleField**: Particle system with customizable count
- **NeuralNetworkGraph**: Neural network visualization with nodes and connections
- **CodeStream**: Streaming code effect
- **TextOverlay**: HTML text overlay positioned over the canvas

## Controls

- **Play/Pause** - Start or pause the timeline
- **Reset** - Reset timeline to 0 seconds

## Future Enhancements

- Custom shader implementations for each stage
- Audio reactivity with AudioEngine
- Crossfade transitions between stages
- Interactive elements
- Post-processing effects
- Performance optimizations with dynamic imports

## License

MIT
