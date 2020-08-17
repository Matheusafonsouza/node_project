//imports
const express = require('express');

//configs
const app = express();

//routes
app.get('/', (req, res) => {
    return res.json({ ok: true });
});

//listen
app.listen(3333);