/**
 * The wordmark, in both of its lettering colours.
 *
 * `/logo.png` is lettered in white for a dark ground and `/logo-dark.png` in
 * charcoal for a light one. Both are laid out and the pair crossfades on the
 * tone of whatever they sit in (see `.logo-swap` in `globals.css`), so a mark
 * over a photograph stays light in the light theme and the swap reflows
 * nothing. Only the light-lettered mark is named; the other is decorative.
 */
export function Logo({
  alt,
  className = '',
  loading,
}: {
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}) {
  return (
    <span className="logo-swap">
      <img
        src="/logo.png"
        alt={alt}
        width={834}
        height={209}
        loading={loading}
        className={`logo-for-dark ${className}`}
      />
      <img
        src="/logo-dark.png"
        alt=""
        aria-hidden
        width={834}
        height={209}
        loading={loading}
        className="logo-for-light"
      />
    </span>
  );
}
