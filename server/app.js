import express from "express";
import { move } from "../brick_game/race/fms.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.post("/", async (req, res) => {
  try {
    const { cmd } = req.body;
    res.status(200).json(move(cmd));
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

app.listen(PORT, async () => {
  console.log(`Sever started on http://localhost:${PORT}...`);
});
