import { useTheme } from './ThemeContext';

export default function ThemeToggleButton() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}