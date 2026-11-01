import { useTheme } from './ThemeContext';

export default function ThemedCard() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <div
      style={{
        background: dark ? '#222' : '#fff',
        color: dark ? '#eee' : '#111',
        padding: 12,
        borderRadius: 6,
        border: `1px solid ${dark ? '#555' : '#ccc'}`,
      }}
    >
      This card is styled by theme context. Current theme: <strong>{theme}</strong>
    </div>
  );
}