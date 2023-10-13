import bodyParser from "body-parser";
import express from "express";
import { connectToDatabase } from "./database.js";
import cors from "cors";
import { Todo } from "./models/todo.js";
import jwt from "jsonwebtoken";

const port = 8000;
connectToDatabase();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`server listen port ${port}`);
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/todos", authenticateJWT, async (req, res) => {
  // try {
  //   const todos = await Todo.findAll();
  res.json("Токен есть");
  // } catch (e) {
  //   console.log(e);
  // }
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

const accessTokenSecret = "youraccesstokensecret";

const users = [
  {
    username: "kirill",
    password: "123",
    role: "admin",
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  console.log(user);

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret
    );

    res.json({
      accessToken,
    });
  } else {
    res.send("Username or password incorrect");
  }
});
