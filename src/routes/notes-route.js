const express = require('express');
const notesRoute = express.Router();
const NotesServices = require('../services/NotesServices');
const jsonParse = express.json()
const xss = require('xss');

const serializeNote = note => ({
  id: note.id,
  note_name: xss(note.note_name),
  note_content: xss(note.note_content),
  modified: note.modified,
  created: note.created,
  folder_id: note.folder_id
})

notesRoute
  .route('/')
  .get((req, res, next) => {
    NotesServices.getAllNotes(req.app.get('db'))
      .then(result => {
        res.json(result.map(serializeNote))
      });
  })
  .post(jsonParse, (req, res, next) => {
    const { note_name, note_content, folder_id } = req.body
    const newNote = {note_name, note_content, folder_id}
    NotesServices.insertNote(req.app.get('db'), newNote)
      .then(result => {
        res.json(serializeNote(result))
      })
      .catch(next)
  })

notesRoute
  .route('/:id')
  .get((req, res, next) => {
    NotesServices.getNoteById(req.app.get('db'), req.params.id)
      .then(result => {
        if(!result){
          res.json({error: {message: "there is no note with that id"}})
        }
        res.json(serializeNote(result))
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    NotesServices.deleteNote(req.app.get('db'), req.params.id)
      .then(result => {
        res.json(result)
      })
  })
  .patch(jsonParse, (req, res, next) => {
    const {note_name, note_content, folder_id} = req.body
    const updatedNote = {note_name, note_content, modified: new Date()}
    NotesServices.updateNote(req.app.get('db'), req.params.id, updatedNote)
      .then(result => {
        res.status(204).json(result).end();
      })
  })

module.exports = notesRoute;
