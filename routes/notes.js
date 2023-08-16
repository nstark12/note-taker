const router = require('express').Router()
const path = require('path')
const { writeFileSync, readFileSync } = require('fs')
const dataPath = path.join(__dirname, '..', 'db', 'db.json')
const { generateId } = require('../utils/generateId')
const readAndParseFile = require('../utils/readAndParseFile')

// API Routes

// Get JSON data
router.get('/notes', (req, res) => {
    const notes = readAndParseFile(dataPath)
    res.json(notes)
})

// creates new note
router.post('/notes', (req, res) => {
    if(!req.body || !req.body.title || !req.body.text) {
        return res.status(400).json('Please enter note title and text')
    }

    // read and parse the file contents
    const notes = readAndParseFile(dataPath)
    console.log(notes)

    // add new data to the array
    const newNote = {
        ...req.body,
        id: generateId()
    } 
    notes.push(newNote)

    // save file
    writeFileSync(dataPath, JSON.stringify(notes, null, 2))

    res.status(201).json(newNote)

})

// deletes note
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    const notes = readAndParseFile(dataPath)
    notes.splice(id - 1, 1)
    notes.forEach((obj, i) => {
        obj.id = i + 1
    })
    writeFileSync(dataPath, JSON.stringify(notes))
    res.json(notes)

})

module.exports = router