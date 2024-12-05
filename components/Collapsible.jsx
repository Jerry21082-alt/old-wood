"use client";

export default function Collapsible({ children, id = "" }) {
  return (
    <details id={id} className="collapsible">
      <summary className="list-none">{children}</summary>
    </details>
  );
}
