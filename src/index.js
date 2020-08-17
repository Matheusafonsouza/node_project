//imports
const express = require('express');
const { uuid } = require('uuidv4');

//configs
const app = express();
app.use(express.json());

const projects = [];

//routes
app.get('/', (req, res) => {
    return res.json(projects);
});

app.post('/', (req, res) => {
    const { title, owner } = req.body;

    const project = {
        id: uuid(),
        title,
        owner
    }

    projects.push(project);

    return res.json(project);
});

//listen
app.listen(3333, () => {
    console.log('Back-end started!');
});