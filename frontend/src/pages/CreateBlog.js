import { useState } from "react";
import useApi from "../api/useApi";

export default function CreateBlog({ onCreated }) {
  const { request, loading, error, clearError } = useApi();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    clearError();

    if (!title || !content) return;

    const res = await request({
      url: "/blogs",
      method: "POST",
      body: { title, content },
    });

    if (res) {
      setTitle("");
      setContent("");
      onCreated(); 
    }
  };

  return (
    <div>
      <h2>Create Blog</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />

      <button onClick={submit} disabled={loading}>
        Publish
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
