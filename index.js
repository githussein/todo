const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

const storage = {}
let latestId = 1;

app.get('/api/todos', (req, res) => {

  res.json(Object.values(storage));
});

app.post('/api/todos', (req, res) => {
  const newTodo = {
    title: req.body.title,
    id: latestId,
    completed: false
  }

  storage[latestId] = newTodo;
  latestId++;

  res.json({
    message: "Todo added successfully",
    todo: newTodo
  });
});

app.put('/api/todos/:id', (req, res) => {
  storage[req.params.id] = req.body;

  res.json({
    message: "Todo updated successfully",
    todo: storage[req.params.id]
  });
});

app.delete('/api/todos/:id', (req, res) => {
  delete storage[req.params.id]
  res.json({
    message: "Todo deleted successfully",
    todo: storage[req.params.id]
  });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');

});
