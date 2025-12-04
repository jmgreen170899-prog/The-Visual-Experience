import { useTimeline } from "./useTimeline";
import { STAGES } from "../config/timeline";

import Stage1Chaos from "../stages/Stage1Chaos";
import Stage2Patterns from "../stages/Stage2Patterns";
import Stage3Fractals from "../stages/Stage3Fractals";
import Stage4Systems3D from "../stages/Stage4Systems3D";
import Stage5ThinkingEngine from "../stages/Stage5ThinkingEngine";
import Stage6OrderFromChaos from "../stages/Stage6OrderFromChaos";
import Stage7Centre from "../stages/Stage7Centre";
import Stage8Emergence from "../stages/Stage8Emergence";

export default function StageManager() {
  const { globalTime } = useTimeline();

  const stage = STAGES.find(
    (s) => globalTime >= s.start && globalTime < s.start + s.duration
  ) || STAGES[STAGES.length - 1];

  const t = (globalTime - stage.start) / stage.duration;

  // Render the active stage based on stage id
  switch (stage.id) {
    case "chaos":
      return <Stage1Chaos t={t} />;
    case "patterns":
      return <Stage2Patterns t={t} />;
    case "fractals":
      return <Stage3Fractals t={t} />;
    case "systems3D":
      return <Stage4Systems3D t={t} />;
    case "thinkingEngine":
      return <Stage5ThinkingEngine t={t} />;
    case "orderFromChaos":
      return <Stage6OrderFromChaos t={t} />;
    case "centre":
      return <Stage7Centre t={t} />;
    case "emergence":
      return <Stage8Emergence t={t} />;
    default:
      return <Stage1Chaos t={0} />;
  }
}
