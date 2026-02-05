import { useEffect, useState } from "react";
import useApi from "../api/useApi";
import useAuthStore, { getUserFromToken } from "../store/authStore";

export default function Blogs({ refresh }) {
  const { request, loading, error } = useApi();
  const token = useAuthStore((s) => s.token);
  const user = getUserFromToken(token);

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const loadBlogs = async () => {
    const res = await request({
      url: `/blogs?page=${page}`,
    });

    if (res?.data) {
      setBlogs(res.data);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, [page, refresh]);

  const startEdit = (blog) => {
    setEditingId(blog.id);
    setEditTitle(blog.title);
    setEditContent(blog.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const saveEdit = async (id) => {
    await request({
      url: `/blogs/${id}`,
      method: "PUT",
      body: { title: editTitle, content: editContent },
    });

    cancelEdit();
    loadBlogs();
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    await request({
      url: `/blogs/${id}`,
      method: "DELETE",
    });

    loadBlogs();
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error loading blogs</p>;

  return (
    <div>
      <h2>Blogs</h2>

      {blogs.map((b) => {
        const isAuthor = user?.id === b.author_id;

        return (
          <div
            key={b.id}
            style={{ borderBottom: "1px solid #ccc", marginBottom: 20 }}
          >
            {editingId === b.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <br />
                <button onClick={() => saveEdit(b.id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{b.title}</h3>
                <p>{b.content}</p>
                <small>Author: {b.author}</small>

                {isAuthor && (
                  <div style={{ marginTop: 10 }}>
                    <button onClick={() => startEdit(b)}>Edit</button>
                    <button
                      onClick={() => deleteBlog(b.id)}
                      style={{ marginLeft: 10 }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}

      <div style={{ marginTop: 20 }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
