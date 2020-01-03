const express = require('express');
const foldersRoute = express.Router();
const FoldersServices = require('../services/FoldersServices');
const xss = require('xss');
const parseJson = express.json();

const serializeFolder = folder => (
  {
    id: folder.id,
    folder_name: xss(folder.folder_name)
  }
);

foldersRoute
  .route('/')
  .get((req, res, next) => {
    FoldersServices.getAllFolders(req.app.get('db')).then(result => {
      res.json(result.map(serializeFolder));
    });
  })
  .post(parseJson, (req, res, next) => {
    const {folder_name} = req.body;
    const newFolder = {folder_name};
    FoldersServices.insertFolder(req.app.get('db'), newFolder).then(result => {
      res.json(result)
    });
  });

foldersRoute
  .route('/:id')
  .get((req, res, next) => {
    const {id} = req.params;
    FoldersServices.getFolderById(req.app.get('db'), id)
      .then(result => {
        res.json(serializeFolder(result))
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    const {id} = req.params;
    FoldersServices.deleteFolder(req.app.get('db'), id).then(result => {
      res.json(result)
    });
  })
  .patch(parseJson, (req, res, next) => {
    const {folder_name} = req.body;
    const updatedFolderField = {folder_name};
    FoldersServices.updateFolder(
      req.app.get('db'),
      req.params.id,
      updatedFolderField
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = foldersRoute;
