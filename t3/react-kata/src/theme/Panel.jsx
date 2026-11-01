export default function Panel({ title, children }) {
  return (
    <section style={{ border: '1px solid #999', padding: 12, margin: 8 }}>
      <h4 style={{ margin: '0 0 8px' }}>{title}</h4>
      {children}
    </section>
  );
}