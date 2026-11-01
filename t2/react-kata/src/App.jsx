import NameEditor from './NameEditor';
import ThemeToggle from './ThemeToggle';
import SignupForm from './SignupForm';
import Counter from './Counter';
import UserProfile from './UserProfile';

function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Task 2 — Advanced Hooks + Forms</h1>

      <section style={{ marginBottom: 32 }}>
        <h2>Custom Hook: useLocalStorage (used twice, independent state)</h2>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <NameEditor />
          <ThemeToggle />
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Controlled Form with Field-Level Validation</h2>
        <SignupForm />
      </section>

      <hr />
      <h2>Task 1 components </h2>
      <Counter />
      <UserProfile userId={1} />
    </div>
  );
}

export default App;