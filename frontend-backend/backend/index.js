const express = require('express');
var cors = require('cors')
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

let notes = [
    { id: 1, title: 'Note 1', content: 'This is the first note' },
    { id: 2, title: 'Note 2', content: 'This is the second note' },
    { id: 3, title: 'Note 3', content: 'This is the third note' }
];

app.get('/api/notes', (req, res) => {
    console.log("Called GET /notes")
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const { note } = req.body;
    console.log(`New note: ${note}`);
    res.sendStatus(200);
});

app.use(express.static("build"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
