import pool from "../db.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const result = await pool.query(
      `INSERT INTO blogs (title, content, author_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, content, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const blogs = await pool.query(
      `SELECT b.id, b.title, b.content, b.created_at,
              u.email AS author
       FROM blogs b
       JOIN users u ON b.author_id = u.id
       ORDER BY b.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({ data: blogs.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;

    const blog = await pool.query(
      "SELECT * FROM blogs WHERE id = $1",
      [id]
    );

    if (blog.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.rows[0].author_id !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await pool.query(
      `UPDATE blogs
       SET title = $1, content = $2
       WHERE id = $3
       RETURNING *`,
      [title, content, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const blog = await pool.query(
      "SELECT * FROM blogs WHERE id = $1",
      [id]
    );

    if (blog.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.rows[0].author_id !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await pool.query(
      "DELETE FROM blogs WHERE id = $1",
      [id]
    );

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

