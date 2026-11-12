import { useId } from 'react';

export default function Select({ label, error, id, children, ...props }) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div className="form-field">
      <label htmlFor={selectId}>{label}</label>
      <select
        id={selectId}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      >
        {children}
      </select>
      {error && (
        <span id={errorId} className="error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}