import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

export function CommentsBarChart({ data }) {
  // Group by author, sum comments
  const chartData = Object.entries(
    data.reduce((acc, post) => {
      acc[post.author] = (acc[post.author] || 0) + post.comments;
      return acc;
    }, {})
  ).map(([name, comments]) => ({ name, comments }))
   .sort((a, b) => b.comments - a.comments); // Sort highest to lowest

  return (
    <div className="chart-card">
      <h3>Comments by author</h3>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 20 }}>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
            <Tooltip />
            <Bar dataKey="comments" fill="#2563eb" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <details>
        <summary>View chart data as a table</summary>
        <table style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
          <thead><tr><th>Author</th><th>Comments</th></tr></thead>
          <tbody>
            {chartData.map(d => <tr key={d.name}><td>{d.name}</td><td>{d.comments}</td></tr>)}
          </tbody>
        </table>
      </details>
    </div>
  );
}

export function PostsLineChart({ data }) {
  // Group by month
  const chartData = Object.entries(
    data.reduce((acc, post) => {
      const date = new Date(post.published);
      const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    }, {})
  ).map(([date, posts]) => ({ date, posts }))
   .reverse(); // Chronological order

  return (
    <div className="chart-card">
      <h3>Posts over time</h3>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tick={{fontSize: 12}} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="posts" stroke="#2563eb" strokeWidth={2} dot={{r: 4}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <details>
        <summary>View chart data as a table</summary>
        <table style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
          <thead><tr><th>Month</th><th>Posts</th></tr></thead>
          <tbody>
            {chartData.map(d => <tr key={d.date}><td>{d.date}</td><td>{d.posts}</td></tr>)}
          </tbody>
        </table>
      </details>
    </div>
  );
}