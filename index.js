import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Use a simple array to store notes (acting as a database)
let notes = [];

function Note(title, task) {
    this.title = title;
    this.tasks = task;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // Pass the notes array so the EJS can loop through it
    res.render('board.ejs', { allNotes: notes });
});

app.post('/', (req, res) => {
    const { action, index, title, task } = req.body;
    console.log(req.body)

    // Advanced switch logic to handle all actions on one path
    switch (action) {
        case 'add':
            if (title && task) notes.push(new Note(title, task));
            break;
        case 'edit':
            if (notes[index]) notes[index] = new Note(title, task);
            break;
        case 'delete':
            notes.splice(index, 1);
            break;
    }

    // Always redirect after a POST to prevent "form resubmission" errors on refresh
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
