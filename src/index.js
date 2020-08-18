//imports
const cors = require('cors');
const express = require('express');
const { uuid, isUuid } = require('uuidv4');

//configs
const app = express();
app.use(cors());
app.use(express.json());

const projects = [];

//middlewares
function logRequests(req, res, next) {
    const { method, url } = req;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    next();
}

function validateProjectId(req, res, next) {
    const { id } = req.params;

    if(!isUuid(id)) {
        return res.status(400).json({ error: 'Invalid project ID.' });
    }
    
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: 'Project not found.' });
    }

    req.projectIndex = projectIndex;

    next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

//routes
app.get('/projects', (req, res) => {
    const { title } = req.query;

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return res.status(200).json(results);
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
    const projectIndex = req.projectIndex;
    const { title, owner } = req.body;

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;

    return res.status(200).json(project);
    
});

app.delete('/projects/:id', (req, res) => {
    const projectIndex = req.projectIndex;

    projects.splice(projectIndex, 1);

    return res.status(200).json(projects);

});

//listen
app.listen(3333, () => {
    console.log('Back-end started!');
});