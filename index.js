import bodyParser from "body-parser";
import express from "express";
import { connectToDatabase } from "./database.js";
import cors from "cors";
import { Todo } from "./models/todo.js";

const port = 8000;
connectToDatabase();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`server listen port ${port}`);
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (e) {
    console.log(e);
  }
});

app.post("/todos", async (req, res) => {
  try {
    await Todo.create(req.body);
    res.json(req.body);
  } catch (e) {
    console.log(e);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.destroy({ where: { todo_id: id } });
    res.send(200);
  } catch (e) {
    console.log(e);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.update(req.body, { where: { todo_id: id } });
    res.send(200);
  } catch (e) {
    console.log(e);
  }
});
