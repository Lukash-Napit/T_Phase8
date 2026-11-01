import { useState } from 'react';

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!values.email.includes('@')) {
    errors.email = 'Email must contain @';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Email must look like name@domain.com';
  }

  if (values.age === '') {
    errors.age = 'Age is required';
  } else if (!/^\d+$/.test(values.age) || Number(values.age) <= 0) {
    errors.age = 'Age must be a positive whole number';
  }

  return errors;
}

function SignupForm() {
  const [values, setValues] = useState({ name: '', email: '', age: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values);
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, age: true });
    if (hasErrors) return;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 320 }}>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ display: 'block', width: '100%' }}
        />
        {touched.name && errors.name && (
          <p role="alert" style={{ color: 'crimson', margin: '4px 0' }}>
            {errors.name}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ display: 'block', width: '100%' }}
        />
        {touched.email && errors.email && (
          <p role="alert" style={{ color: 'crimson', margin: '4px 0' }}>
            {errors.email}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          inputMode="numeric"
          value={values.age}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ display: 'block', width: '100%' }}
        />
        {touched.age && errors.age && (
          <p role="alert" style={{ color: 'crimson', margin: '4px 0' }}>
            {errors.age}
          </p>
        )}
      </div>

      <button type="submit" disabled={submitted}>
        Sign up
      </button>

      {submitted && <p style={{ color: 'green' }}>Submitted ✓</p>}
    </form>
  );
}

export default SignupForm;