export default function GlassButton({ variant = "default", size = "", loading = false, className = "", children, disabled, ...props }) {
  return <button className={`glass-button ${variant === "primary" ? "glass-button--primary" : ""} ${size === "small" ? "glass-button--small" : ""} ${className}`} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
    {loading ? <><span aria-hidden="true">◌</span> Please wait…</> : children}
  </button>;
}
