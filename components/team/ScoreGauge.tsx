// 0-100 voortgangsscore, shown as a ring — used read-only on the ouder
// dashboard and as a live preview while a trajectleider edits the score.
export default function ScoreGauge({
  score,
  size = 140,
}: {
  score: number | null;
  size?: number;
}) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = score == null ? 0 : Math.max(0, Math.min(100, score));
  const offset = circumference * (1 - clamped / 100);
  const center = size / 2;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={center} cy={center} r={radius} stroke="var(--border)" strokeWidth={strokeWidth} fill="none" />
        {score != null && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="var(--primary)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-3xl font-extrabold text-foreground">{score ?? "–"}</span>
        <span className="text-xs text-muted">/ 100</span>
      </div>
    </div>
  );
}
