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
