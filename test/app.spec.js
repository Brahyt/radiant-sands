const app = require('../src/app');
const knex = require('knex');
const dummydata = require('./dummy_data');


describe('App Test', () => {
  let db;
  const testFolders = dummydata.MakeDummyFolders();
  const testNotes = dummydata.MakeDummyNotes();
  beforeEach('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        user: 'brahyt',
        password: 'brahyt',
        database: 'notful_test'
      }
    });
    app.set('db', db)
  });
  afterEach('disconnect from db', ()=> db.destroy());


  describe('Folders Endpoints', () => {
    beforeEach('clear db', () => db.raw('TRUNCATE TABLE notes RESTART IDENTITY CASCADE'))
    beforeEach('clear db', () => db.raw('TRUNCATE TABLE folders RESTART IDENTITY CASCADE'))
    beforeEach('addFOLDERS', () => db.into('folders').insert(testFolders))
    beforeEach('addNOTES' , () => db.into('notes').insert(testNotes))

    it('GET /folders responds with 200 and 3 folders', () => {
      return supertest(app)
        .get('/api/folders')
        .expect(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(3);
        });
    });
    it('POST /folders responds with 200 and adds folder', () => {
      return supertest(app)
        .post('/api/folders')
        .send({folder_name: "new folder"})
        .expect(res => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include({folder_name: "new folder"})
        });
    });
    it('POST /folders responds with 200 and adds folder', () => {
      return supertest(app)
        .delete('/api/folders')
        .send({id: 2})
        .expect(res => {
          expect(status).to.be(200)
        });
    });
  });


});


