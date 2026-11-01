import { ThemeProvider } from './theme/ThemeContext';
import ThemeToggleButton from './theme/ThemeToggleButton';
import Panel from './theme/Panel';
import ThemedCard from './theme/ThemedCard';
import Button from './Button';

export default function App() {
  return (
    <ThemeProvider>
      <main style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Task 3 — Context + Accessibility + Button</h1>

        <section style={{ marginBottom: 32 }}>
          <h2>Context (consumer at depth 1 and depth 3)</h2>
          <ThemeToggleButton />
          <Panel title="Outer panel (no theme knowledge)">
            <Panel title="Inner panel (still no theme knowledge)">
              <ThemedCard />
            </Panel>
          </Panel>
        </section>

        <section>
          <h2>Button (variants + disabled)</h2>
          <Button variant="primary" onClick={() => alert('primary')}>
            Primary
          </Button>{' '}
          <Button variant="secondary" onClick={() => alert('secondary')}>
            Secondary
          </Button>{' '}
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </section>
      </main>
    </ThemeProvider>
  );
}