import db from "./db.js";

export const createArticle = async (title, content, image, status, userId) => {
  const [result] = await db.query(
    `INSERT INTO articles (title, content, image, status, user_id)
        VALUES (?, ?, ?, ?, ?)`,
    [title, content, image, status, userId]
  );

  return result.insertId;
};

export const getAllArticles = async () => {
  const [rows] = await db.query(`SELECT * FROM articles`);
  return rows;
};

export const getArticleById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM articles WHERE id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

export const updateArticle = async (id, title, content, image, status) => {
  const [result] = await db.query(
    `UPDATE articles SET title = ?, content = ?, image = ?, status = ? WHERE id = ?`,
    [title, content, image, status, id]
  );
  // return result;
  const [rows] = await db.query(`SELECT * FROM articles WHERE id = ?`, [id]);
  return rows[0];
};

export const deleteArticle = async (id) => {
  const [result] = await db.query(`DELETE FROM articles WHERE id = ?`, [id]);
  return result;
};
