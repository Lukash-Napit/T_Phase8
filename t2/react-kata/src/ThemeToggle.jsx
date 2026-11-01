import { useLocalStorage } from './useLocalStorage';

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        background: isDark ? '#222' : '#eee',
        color: isDark ? '#eee' : '#222',
        padding: 12,
        borderRadius: 6,
      }}
    >
      <h3>Theme Toggle — key: "theme"</h3>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
        Switch to {isDark ? 'light' : 'dark'}
      </button>
    </div>
  );
}

export default ThemeToggle;