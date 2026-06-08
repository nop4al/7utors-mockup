export default function Card({
  children,
  className = '',
  colorStrip,
  onClick,
  noPadding = false,
}) {
  return (
    <div
      onClick={onClick}
      className={`card-base ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {colorStrip && (
        <div style={{ height: '4px', backgroundColor: colorStrip }} />
      )}
      <div style={{ padding: noPadding ? '0' : '1.25rem' }}>{children}</div>
    </div>
  )
}
