const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        console.log(chalk.green.inverse('note added!'));
    } else {
        console.log(chalk.red.inverse('note already exist!'));

    }
}

const saveNotes = (note) => {
    const notes = JSON.stringify(note);
    fs.writeFileSync('notes.json', notes);
}

const loadNotes = () => {
    try {
        const noteBuffer = fs.readFileSync('notes.json');
        const noteStr = noteBuffer.toString();
        return JSON.parse(noteStr);
    } catch (error) {
        return [];
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const noteToKeep = notes.filter((note) => note.title !== title);

    if (noteToKeep.length === notes.length) {
        console.log(chalk.red.inverse('note not exist'));
    } else {
        saveNotes(noteToKeep);
        console.log(chalk.green.inverse('note removed'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your notes'));
    notes.forEach((note) => {
        console.log(note.title);
    });
}

const readNotes = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('note not exist'));

    }
}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
};