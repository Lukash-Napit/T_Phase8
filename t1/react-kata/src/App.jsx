import Counter from './Counter';
import UserProfile from './UserProfile';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Counter</h1>
      <Counter />
      <hr />
      <h1>Data Fetching</h1>
      <UserProfile userId={1} />
    </div>
  );
}

export default App;