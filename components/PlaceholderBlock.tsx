const VARIANTS = {
  primary: "from-primary to-primary-dark",
  accent: "from-accent to-coral",
  soft: "from-primary-light to-accent-light",
} as const;

/** Decorative color-block stand-in used everywhere a photo would normally go — this site intentionally uses no photography. */
export default function PlaceholderBlock({
  variant = "primary",
  className = "",
  label,
}: {
  variant?: keyof typeof VARIANTS;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br ${VARIANTS[variant]} ${className}`}
      aria-hidden={!label}
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
      <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/10" />
      {label && (
        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-dark">
          {label}
        </span>
      )}
    </div>
  );
}
