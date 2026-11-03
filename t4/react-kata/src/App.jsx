import { useState } from 'react';
import Button from './components/Button';
import Modal from './components/Modal';
import TextInput from './components/TextInput';
import Select from './components/Select';
import Checkbox from './components/Checkbox';
import './components/library.css';
import './demo.css';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [role, setRole] = useState('');

  function handleEmailChange(e) {
    const v = e.target.value;
    setEmail(v);
    setEmailError(v && !v.includes('@') ? 'Email must contain @' : '');
  }

  return (
    <main
      style={{
        padding: '1.5rem',
        maxWidth: 1100,
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1>Component Library</h1>
      <p style={{ color: '#555' }}>
        A small, accessible, responsive React component library. Each section
        documents a component, its variants, and its states.
      </p>

      {/* ---------- Button ---------- */}
      <section style={{ margin: '2rem 0' }}>
        <h2>Button</h2>
        <p>
          <em>Use for any action. Renders a real native &lt;button&gt;.</em>
        </p>
        <div className="demo-grid">
          <div>
            <h3>Primary</h3>
            <Button variant="primary" onClick={() => alert('primary')}>
              Primary
            </Button>
          </div>
          <div>
            <h3>Secondary</h3>
            <Button variant="secondary" onClick={() => alert('secondary')}>
              Secondary
            </Button>
          </div>
          <div>
            <h3>Disabled</h3>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- Modal ---------- */}
      <section style={{ margin: '2rem 0' }}>
        <h2>Modal</h2>
        <p>
          <em>
            Use for focused tasks that need the user's full attention. Traps
            focus, closes on Escape, returns focus to the trigger.
          </em>
        </p>
        <Button onClick={() => setModalOpen(true)}>Open modal</Button>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example dialog"
        >
          <p>
            Press <kbd>Tab</kbd> to cycle focus inside the modal. Try{' '}
            <kbd>Shift+Tab</kbd> from the first element. Press <kbd>Esc</kbd> to
            close — focus returns to the "Open modal" button.
          </p>
          <TextInput label="Your name" placeholder="Jane Doe" />
          <Button variant="secondary" onClick={() => alert('Saved!')}>
            Save
          </Button>
        </Modal>
      </section>

      {/* ---------- TextInput ---------- */}
      <section style={{ margin: '2rem 0' }}>
        <h2>Text Input</h2>
        <p>
          <em>
            Use for short free-text input. Error state is announced via
            aria-describedby + aria-invalid.
          </em>
        </p>
        <div className="demo-grid">
          <div>
            <h3>Default</h3>
            <TextInput label="Name" placeholder="Jane Doe" />
          </div>
          <div>
            <h3>With error</h3>
            <TextInput
              label="Email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              placeholder="you@example.com"
            />
          </div>
        </div>
      </section>

      {/* ---------- Select ---------- */}
      <section style={{ margin: '2rem 0' }}>
        <h2>Select</h2>
        <p>
          <em>
            Use for choosing one option from a known list. Native &lt;select&gt;
            — keyboard-operable out of the box.
          </em>
        </p>
        <div className="demo-grid">
          <div>
            <h3>Default</h3>
            <Select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Choose…</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </Select>
          </div>
          <div>
            <h3>With error</h3>
            <Select label="Role" error="Please choose a role">
              <option value="">Choose…</option>
              <option value="admin">Admin</option>
            </Select>
          </div>
        </div>
      </section>

      {/* ---------- Checkbox ---------- */}
      <section style={{ margin: '2rem 0' }}>
        <h2>Checkbox</h2>
        <p>
          <em>
            Use for a single on/off choice. Toggle with Space when focused.
          </em>
        </p>
        <div className="demo-grid">
          <div>
            <h3>Unchecked</h3>
            <Checkbox label="Subscribe to newsletter" />
          </div>
          <div>
            <h3>Checked</h3>
            <Checkbox label="I agree" defaultChecked />
          </div>
          <div>
            <h3>Disabled</h3>
            <Checkbox label="Not available" disabled />
          </div>
        </div>
      </section>
    </main>
  );
}