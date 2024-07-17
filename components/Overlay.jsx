import { useSelector } from "react-redux";

export default function Overlay() {
  const showMe = useSelector((state) => state.overlay.showMe);

  return (
    <div
      className="min-h-screen h-auto fixed top-0 left-0 w-screen z-40 flex items-center justify-center overlay"
      style={{
        pointerEvents: showMe ? "all" : "none",
        opacity: showMe ? "1" : "0",
        visibility: showMe ? "visible" : "hidden",
      }}
    ></div>
  );
}
