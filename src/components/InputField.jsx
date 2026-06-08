export default function InputField({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  icon,
  className = '',
  ...rest
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold"
          style={{ fontFamily: 'var(--font-body)', color: '#131b2e' }}
        >
          {label}
          {required && <span style={{ color: '#ba1a1a', marginLeft: '2px' }}>*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: '#707880' }}
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`input-field ${icon ? 'has-icon' : ''} ${error ? 'has-error' : ''}`}
          {...rest}
        />
      </div>
      {error && (
        <p className="text-xs font-medium" style={{ color: '#ba1a1a', marginTop: '2px' }}>
          {error}
        </p>
      )}
    </div>
  )
}
