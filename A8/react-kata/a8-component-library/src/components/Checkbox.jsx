import { useId } from 'react';

export default function Checkbox({ label, error, id, ...props }) {
  const generatedId = useId();
  const checkboxId = id || generatedId;
  const errorId = `${checkboxId}-error`;

  return (
    <div className="form-field checkbox-field">
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          id={checkboxId}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        <label htmlFor={checkboxId}>{label}</label>
      </div>
      {error && (
        <span id={errorId} className="error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}