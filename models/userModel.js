import { hash } from "bcryptjs";
import db from "./db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users where email = ?", [email]);
  return rows[0];
};

export const createUser = async (name, email, hashedPassword) => {
  const [result] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );
  return result.insertId;
};
