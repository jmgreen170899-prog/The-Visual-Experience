import { PerspectiveCamera } from "@react-three/drei";
import CodeStream from "../components/CodeStream";

const CODE_LINES = [
  "// Thinking Engine v1.0",
  "function process(input) {",
  "  let thoughts = [];",
  "  for (let i = 0; i < depth; i++) {",
  "    thoughts.push(analyze(input, i));",
  "  }",
  "  return integrate(thoughts);",
  "}",
  "",
  "const neurons = connect();",
  "const patterns = recognize();",
  "if (patterns.match(memory)) {",
  "  return synthesize();",
  "}",
];

export default function Stage5ThinkingEngine({ t }: { t: number }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      
      {/* Multiple code streams for tunnel effect */}
      <CodeStream lines={CODE_LINES} t={t} speed={0.5} />
      
      {/* Add ambient glow */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 8]} intensity={0.5} color="lime" />
    </>
  );
}
