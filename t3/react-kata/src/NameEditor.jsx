import { useLocalStorage } from './useLocalStorage';

function NameEditor() {
  const [name, setName] = useLocalStorage('name', '');

  return (
    <div>
      <h3>Name Editor — key: "name"</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <p>Hello, {name || 'stranger'}!</p>
    </div>
  );
}

export default NameEditor;