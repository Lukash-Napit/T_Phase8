export default function Button({
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...props
}) {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}