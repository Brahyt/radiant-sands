const FoldersServices = {
  getAllFolders(db) {
    return db('folders').select('*');
  },
  insertFolder(db, folder) {
    return db('folders')
      .insert(folder)
      .returning('*')
      .then(rows => rows[0]);
  },
  getFolderById(db, id) {
    return db('folders')
      .select('*')
      .where({id})
      .first();
  },
  deleteFolder(db, id) {
    return db('folders')
      .where({id})
      .delete();
  },
  updateFolder(db, id, updatedFolderFields) {
    return db('folders')
      .where({id})
      .update(updatedFolderFields);
  },
};

module.exports = FoldersServices;
