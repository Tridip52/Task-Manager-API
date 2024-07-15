const express = require('express');
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let taskData;
try {
    const data = fs.readFileSync('task.json', 'utf8');
    taskData = JSON.parse(data);
} catch (err) {
    console.error('Error reading file:', err);
}

const tasks = taskData.tasks;
//Retrieve all tasks 
app.get("/tasks", (req, res) => {
    const { completed } = req.query;
    console.log(typeof completed);
    if (completed) {
        const filteredTask = tasks.filter(task => task.completed.toString() === completed);
        console.log(filteredTask);
        filteredTask.length !== 0 ? res.status(200).send(filteredTask) : res.status(404).send("Not found");
    } else {
        res.status(200).send(tasks);
    }
});

//Retrieve a single task by its ID
app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) {
        res.status(404).send("Not found");
    } else {
        res.status(200).send(task);
    }
});

//Create a new task
app.post("/tasks", (req, res) => {
    const task = req.body;
    if (task.title && task.description && typeof task.completed === 'boolean') {
        task.id = tasks.length + 1;
        tasks.push(task);
        res.status(201).send(task);
    }
    else {
        res.status(400).send(task);
    }
});

//Update an existing task by its ID
app.put("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) {
        res.status(404).send("Task not found!!!");
    } else if (req.body.title && req.body.description && typeof req.body.completed === 'boolean') {
        task.title = req.body.title;
        task.description = req.body.description;
        task.completed = req.body.completed;
        res.status(200).send(task);
    }
    else {
        res.status(400).send("Errors! Title/Description cannot be empty, completed should be boolean");
    }
});

//Delete a task by its ID
app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) {
        res.status(404).send("Task not found!!!");
    }
    else {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        res.status(200).send(task);
    }
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;