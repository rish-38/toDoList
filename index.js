import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();
const port = 3000;
const upload = multer();
// Use a simple array to store notes (acting as a database)
let notes = [];

function Note(title, task) {
    this.title = title;
    this.tasks = task;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // Pass the notes array so the EJS can loop through it
    res.render('board.ejs', { allNotes: notes });
});

app.post('/save',upload.none(), (req, res) => {
    const {index, title, task } = req.body;
    // Advanced switch logic to handle all actions on one path
            notes.push(new Note(title, task));
    // Always redirect after a POST to prevent "form resubmission" errors on refresh
    res.redirect('/');
});

app.post('/delete',(req,res)=>{
    console.log(req.body)
    notes.splice(req.body.postId,1);
    res.redirect('/');
})
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});


