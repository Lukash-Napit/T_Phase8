export default function Button({
  variant = 'primary',
  disabled = false,
  type = 'button',   
  children,
  ...rest
}) {
  const base = {
    padding: '8px 16px',
    borderRadius: 6,
    fontSize: 14,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    border: '1px solid',
  };

  const variants = {
    primary: {
      background: '#2563eb',
      color: 'white',
      borderColor: '#1d4ed8',
    },
    secondary: {
      background: 'white',
      color: '#1d4ed8',
      borderColor: '#1d4ed8',
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      style={{ ...base, ...variants[variant] }}
      {...rest}
    >
      {children}
    </button>
  );
}