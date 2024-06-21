const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static("/home/glengunt/Documents/Race/"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/menu", async (req, res) => {
  try {
    // const menu = await db.MenuItem.findAll();
    // res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    // const { isActive, items, userId } = req.body;
    // const order = await db.Order.create({ isActive, items, userId });
    // res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

app.listen(PORT, async () => {
  console.log(`Sever started on http://localhost:${PORT}...`);
});
