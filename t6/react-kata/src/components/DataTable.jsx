export default function DataTable({ posts, sortConfig, requestSort, currentPage, postsPerPage, setCurrentPage }) {
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="table-card">
      <h2 style={{ marginTop: 0, fontSize: '1.2rem', marginBottom: '1rem' }}>Posts</h2>
      <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
        Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, posts.length)} of {posts.length} posts. Select a column heading to sort.
      </p>
      
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort('title')} scope="col">Title</th>
              <th onClick={() => requestSort('author')} scope="col">Author</th>
              <th onClick={() => requestSort('category')} scope="col">Category</th>
              <th onClick={() => requestSort('published')} scope="col">Published</th>
              <th onClick={() => requestSort('comments')} scope="col">Comments</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.category}</td>
                <td>{new Date(post.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td>{post.comments}</td>
              </tr>
            ))}
            {currentPosts.length === 0 && (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No posts match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button 
          className="page-btn" 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span style={{ fontSize: '0.875rem', color: '#475569' }}>Page {currentPage} of {totalPages || 1}</span>
        <button 
          className="page-btn" 
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}