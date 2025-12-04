import { ReactNode } from "react";

interface TextOverlayProps {
  children?: ReactNode;
  text?: string;
  position?: "top-left" | "top-center" | "bottom-center" | "bottom-left";
}

export default function TextOverlay({
  children,
  text,
  position = "bottom-center",
}: TextOverlayProps) {
  const positionStyles: Record<string, React.CSSProperties> = {
    "top-left": { top: 20, left: 20 },
    "top-center": { top: 20, left: "50%", transform: "translateX(-50%)" },
    "bottom-center": { bottom: 20, left: "50%", transform: "translateX(-50%)" },
    "bottom-left": { bottom: 20, left: 20 },
  };

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyles[position],
        color: "white",
        fontSize: "24px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {text || children}
    </div>
  );
}
