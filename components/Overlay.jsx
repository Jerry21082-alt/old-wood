import { useSelector } from "react-redux";

export default function Overlay() {
  const showOverlay = useSelector((state) => state.navigation.revealOverlay);

  return (
    <div
      className="min-h-screen h-auto fixed top-0 left-0 w-screen z-40 flex items-center justify-center overlay"
      style={{
        pointerEvents: showOverlay ? "all" : "none",
        opacity: showOverlay ? "1" : "0",
        visibility: showOverlay ? "visible" : "hidden",
      }}
    ></div>
  );
}
