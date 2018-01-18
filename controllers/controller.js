const express = require('express');
const router = express.Router();

const Article = require('../models/Article.js');
const Note = require('../models/Note.js');

router.get('/', (req, res) => {
  
})

router.get('/scrape', (req, res) => {

})

router.get('/articles', (req, res) => {
  db.Article
    .find({})
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    })
})

router.get('/saved', (req, res) => {
  db.Article
    .find({ saved: true })
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    })
})

router.get('/articles/:id', (req, res) => {
  db.Article
  .findOne({ _id: req.params.id })
  .populate('note')
  .then(dbArticle => {
    res.json(dbArticle);
  })
  .catch(err => {
    res.json(err);
  })
})

router.post('/articles/:id', (req, res) => {
  db.Note
  .create(req.body)
  .then(dbNote => {
    return db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { note: dbNote._id },
      { new: true }
    );
  })
  .catch(err => {
    res.json(err);
  })
})

