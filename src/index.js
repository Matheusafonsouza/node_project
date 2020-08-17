//imports
const express = require('express');
const { uuid } = require('uuidv4');

//configs
const app = express();
app.use(express.json());

const projects = [];

//routes
app.get('/projects', (req, res) => {
    return res.status(200).json(projects);
});

app.post('/projects', (req, res) => {
    const { title, owner } = req.body;

    const project = {
        id: uuid(),
        title,
        owner
    }

    projects.push(project);

    return res.status(200).json(project);
});

app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title, owner } = req.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: 'Project not found.' });
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;

    return res.status(200).json(project);
    
});

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: 'Project not found.' });
    }

    projects.splice(projectIndex, 1);

    return res.status(200).json(projects);

});

//listen
app.listen(3333, () => {
    console.log('Back-end started!');
});