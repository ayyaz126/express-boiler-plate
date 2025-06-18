import app from "./app";
import pool from "./adapters/postgres/postgres.adapter"; 

pool.connect()
  .then(() => {
    console.log("Connected to PostgreSQL Database");
  })
  .catch((err) => {
    console.error("PostgreSQL connection failed:", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});