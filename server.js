const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3300;

//Makes the environment directory equal to the public directory
app.use(express.static(path.join(__dirname, 'public')));
//Enables the built-in Express middleware to read JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Root path to return index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html', err => {
        if (err) throw err;
    });
});

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html', err => {
        if (err) throw err;
    });
});

app.get('/api/notes', (req, res) => {
    res.sendFile(__dirname + '/db/db.json', err => {
        if (err) throw err;
    });
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let noteArray = JSON.parse(fs.readFileSync(__dirname + '/db/db.json'));
    newNote.id = noteArray.length + 1;
    noteArray.push(newNote);
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(noteArray), err => {
        if (err) throw err;
    });
});

app.delete('/api/notes/:id', (req, res) => {

});

app.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", PORT); 
}); 