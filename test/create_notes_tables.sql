DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
  id              INTEGER PRIMARY KEY,
  folder_name     TEXT NOT NULL
);


CREATE TABLE notes (
  id            INTEGER PRIMARY KEY,
  note_name     TEXT NOT NULL,
  note_content  TEXT NOT NULL,
  modified      TIMESTAMP DEFAULT now() NOT NULL,
  created       TIMESTAMP DEFAULT now() NOT NULL,
  folder_id     INTEGER REFERENCES folders(id) ON DELETE CASCADE
);
