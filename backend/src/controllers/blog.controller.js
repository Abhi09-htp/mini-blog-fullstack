import pool from "../db.js";

/**
 * CREATE BLOG
 */
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
       RETURNING id, title, content, author_id`,
      [title, content, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET BLOGS (PAGINATED)
 */
export const getBlogs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const blogs = await pool.query(
      `SELECT blogs.id, blogs.title, blogs.content,
              blogs.author_id,
              users.email AS author
       FROM blogs
       JOIN users ON blogs.author_id = users.id
       ORDER BY blogs.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const count = await pool.query(`SELECT COUNT(*) FROM blogs`);

    res.json({
      data: blogs.rows,
      total: Number(count.rows[0].count),
      page,
      totalPages: Math.ceil(count.rows[0].count / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE BLOG (AUTHOR ONLY)
 */
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    // Check ownership
    const existing = await pool.query(
      `SELECT author_id FROM blogs WHERE id = $1`,
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (existing.rows[0].author_id !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await pool.query(
      `UPDATE blogs
       SET title = $1, content = $2
       WHERE id = $3
       RETURNING id, title, content`,
      [title, content, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE BLOG (AUTHOR ONLY)
 */
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check ownership
    const existing = await pool.query(
      `SELECT author_id FROM blogs WHERE id = $1`,
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (existing.rows[0].author_id !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await pool.query(`DELETE FROM blogs WHERE id = $1`, [id]);

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

