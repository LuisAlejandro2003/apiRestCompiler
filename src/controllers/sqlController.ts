import { Request, Response } from "express";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const executeSql = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = req.body.sql;

  if (!sql) {
    res.status(400).json({ message: "No SQL query provided." });
    return;
  }

  try {
    const [results] = await pool.query(sql);
    res.json({ results });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error executing SQL query.", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error executing SQL query.", error: String(error) });
    }
  }
};
