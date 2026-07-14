export function QuantumGlyph() {
  return (
    <svg
      className="quantum-glyph"
      viewBox="0 0 120 120"
      role="img"
      aria-label="Animated phase-space emblem"
    >
      <circle className="quantum-halo" cx="60" cy="60" r="51" />
      <ellipse className="quantum-orbit orbit-a" cx="60" cy="60" rx="43" ry="15" />
      <ellipse className="quantum-orbit orbit-b" cx="60" cy="60" rx="43" ry="15" />
      <path
        className="quantum-wave"
        d="M12 60c10-28 20 28 30 0s20-28 30 0 20 28 36 0"
      />
      <circle className="quantum-state-ring" cx="60" cy="60" r="11" />
      <circle className="quantum-state" cx="60" cy="60" r="3.75" />
    </svg>
  );
}
