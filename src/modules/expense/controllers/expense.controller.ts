import { Request, Response } from "express";
import pool from "@/adapters/postgres/postgres.adapter";

export const createExpense = async (req: Request, res: Response) => {
  const { amount, category } = req.body;
  const user = (req as any).user;
  try {
    const result = await pool.query(
      "INSERT INTO expenses (user_id, amount, category) VALUES ($1, $2, $3) RETURNING *",
      [user.id, amount, category]
    );
    res.status(201).json({ expense: result.rows[0] });
  } catch (error) {
    console.error("Create Expense Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getUserExpenses = async (req: Request, res: Response) => {
  const user = (req as any).user;
  try {
    const result = await pool.query(
      "SELECT * FROM expenses WHERE user_id = $1",
      [user.id]
    );
    res.json({ expenses: result.rows });
  } catch (error) {
    console.error("Get Expenses Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
