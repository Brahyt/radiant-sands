function MakeDummyFolders () {
  return [
    {
      folder_name: "Folder One"
    },
    {
      folder_name: "Folder Two"
    },
    {
      folder_name: "Folder Three"
    },
  ];
}

function MakeDummyNotes() {
  return [
    {
      note_name: "note one",
      note_content: "note one content",
      folder_id: 1
    },
    {
      note_name: "note two",
      note_content: "note two content",
      folder_id: 2
    },
    {
      note_name: "note three",
      note_content: "note three content",
      folder_id: 3
    },
  ];
}

module.exports = {
  MakeDummyFolders,
  MakeDummyNotes
};
