/**
 * Minimal loading state while the Studio chunk hydrates. Avoids a flash of
 * unstyled content during the first navigation to `/studio`.
 */
export default function StudioLoading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
        fontSize: '0.875rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#666',
      }}
    >
      Loading Mayan League Studio…
    </div>
  )
}
