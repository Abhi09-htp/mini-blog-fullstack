import { useEffect, useState } from "react";
import useApi from "../api/useApi";

export default function Blogs({ refresh }) {
  const { request, loading, error } = useApi();

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const loadBlogs = async () => {
      const res = await request({
        url: `/blogs?page=${page}&limit=${limit}`,
      });

      if (res?.data) {
        setBlogs(res.data);
      }
    };

    loadBlogs();
  }, [page, refresh]); // 🔥 reacts to new blog creation + pagination

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error loading blogs</p>;

  return (
    <div>
      <h2>Blogs</h2>

      {blogs.length === 0 && <p>No blogs yet</p>}

      {blogs.map((b) => (
        <div
          key={b.id}
          style={{ borderBottom: "1px solid #ccc", marginBottom: 10 }}
        >
          <h3>{b.title}</h3>
          <p>{b.content}</p>
          <small>Author: {b.author}</small>
        </div>
      ))}

      {/* Pagination controls */}
      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
