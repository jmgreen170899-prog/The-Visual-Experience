import { useTimeline } from "./useTimeline";
import { STAGES } from "../config/timeline";

import Stage1Chaos from "../stages/Stage1Chaos";

export default function StageManager() {
  const { globalTime } = useTimeline();

  const stage = STAGES.find(
    (s) => globalTime >= s.start && globalTime < s.start + s.duration
  ) || STAGES[STAGES.length - 1];

  const t = (globalTime - stage.start) / stage.duration;

  // TEMPORARY: Only Stage 1 exists initially.
  if (stage.id === "chaos") return <Stage1Chaos t={t} />;

  return <Stage1Chaos t={0} />;
}
