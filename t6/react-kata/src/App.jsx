import { useState, useMemo } from 'react';
import { MOCK_POSTS } from './mockData';
import { CommentsBarChart, PostsLineChart } from './components/Chart';
import DataTable from './components/DataTable';
import './Dashboard.css'; 

export default function App() {
  // Data
  const posts = MOCK_POSTS;

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Sorting & Pagination state
  const [sortConfig, setSortConfig] = useState({ key: 'published', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // 1. FILTER DATA
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAuthor = authorFilter ? post.author === authorFilter : true;
      const matchesCategory = categoryFilter ? post.category === categoryFilter : true;
      
      const postDate = new Date(post.published);
      const matchesFrom = fromDate ? postDate >= new Date(fromDate) : true;
      const matchesTo = toDate ? postDate <= new Date(toDate) : true;

      return matchesSearch && matchesAuthor && matchesCategory && matchesFrom && matchesTo;
    });
  }, [posts, searchTerm, authorFilter, categoryFilter, fromDate, toDate]);

  // 2. SORT DATA
  const sortedPosts = useMemo(() => {
    let sortableItems = [...filteredPosts];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredPosts, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to page 1 on sort
  };

  // 3. CALCULATE KPIs
  const kpis = useMemo(() => {
    if (filteredPosts.length === 0) return { totalPosts: 0, totalComments: 0, avgComments: 0, topAuthor: 'N/A' };
    
    const totalPosts = filteredPosts.length;
    const totalComments = filteredPosts.reduce((sum, p) => sum + p.comments, 0);
    const avgComments = (totalComments / totalPosts).toFixed(1);

    // Top author logic
    const authorCounts = filteredPosts.reduce((acc, p) => {
      acc[p.author] = (acc[p.author] || 0) + p.comments;
      return acc;
    }, {});
    const topAuthor = Object.keys(authorCounts).reduce((a, b) => authorCounts[a] > authorCounts[b] ? a : b);

    return { totalPosts, totalComments, avgComments, topAuthor };
  }, [filteredPosts]);

  // Extract unique authors and categories for dropdowns
  const authors = [...new Set(posts.map(p => p.author))];
  const categories = [...new Set(posts.map(p => p.category))];

  const handleClearFilters = () => {
    setSearchTerm(''); setAuthorFilter(''); setCategoryFilter(''); setFromDate(''); setToDate(''); setCurrentPage(1);
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Blog Dashboard</h1>
        <p>Posts, comments and authors at a glance</p>
      </header>

      <main className="main-content">
        {/* KPI Cards */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-title">Total posts</div>
            <div className="kpi-value">{kpis.totalPosts}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Total comments</div>
            <div className="kpi-value">{kpis.totalComments}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Avg comments per post</div>
            <div className="kpi-value">{kpis.avgComments}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Top author (by comments)</div>
            <div className="kpi-value">{kpis.topAuthor}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-card">
          <h2 style={{ marginTop: 0, fontSize: '1.1rem', marginBottom: '1rem' }}>Filters</h2>
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="search">Search titles</label>
              <input id="search" type="text" value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
            </div>
            <div className="filter-group">
              <label htmlFor="author">Author</label>
              <select id="author" value={authorFilter} onChange={e => { setAuthorFilter(e.target.value); setCurrentPage(1); }}>
                <option value="">All authors</option>
                {authors.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="category">Category</label>
              <select id="category" value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }}>
                <option value="">All categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="fromDate">From date</label>
              <input id="fromDate" type="date" value={fromDate} onChange={e => { setFromDate(e.target.value); setCurrentPage(1); }} />
            </div>
            <div className="filter-group">
              <label htmlFor="toDate">To date</label>
              <input id="toDate" type="date" value={toDate} onChange={e => { setToDate(e.target.value); setCurrentPage(1); }} />
            </div>
            <button className="clear-btn" onClick={handleClearFilters}>Clear filters</button>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
            {filteredPosts.length} of {posts.length} posts match your filters
          </p>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <CommentsBarChart data={filteredPosts} />
          <PostsLineChart data={filteredPosts} />
        </div>

        {/* Data Table */}
        <DataTable 
          posts={sortedPosts} 
          sortConfig={sortConfig} 
          requestSort={requestSort} 
          currentPage={currentPage} 
          postsPerPage={postsPerPage} 
          setCurrentPage={setCurrentPage} 
        />
      </main>
    </div>
  );
}