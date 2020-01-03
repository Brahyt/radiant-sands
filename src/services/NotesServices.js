const NotesServices = {
  getAllNotes(db) {
    return db('notes')
      .select('*');
  },
  insertNote(db, note) {
    return db('notes')
      .insert(note)
      .returning('*')
      .then(rows => rows[0])
  },
  getNoteById(db, id) {
    return db('notes')
      .select('*')
      .where({id})
      .first()

  },
  deleteNote(db, id) {
    return db('notes')
      .where({id})
      .delete()
  },
  updateNote(db, id, updatedNoteFields){
    return db('notes')
      .where({id})
      .update(updatedNoteFields)
  }
};

module.exports = NotesServices;
