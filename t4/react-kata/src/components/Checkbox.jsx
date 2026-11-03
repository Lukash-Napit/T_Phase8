import { useId } from 'react';

export default function Checkbox({ label, error, id, ...props }) {
  const generatedId = useId();
  const checkboxId = id || generatedId;
  const errorId = `${checkboxId}-error`;

  return (
    <div>
      <div className="checkbox-field">
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
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}