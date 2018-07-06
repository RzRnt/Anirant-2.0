const express = require('express');
const router = express.Router()
const path = require('path');
const anime_input = require('./anime-input')

animeInput = new anime_input()

router.get('/', function (req, res) {
    res.render('index', {
        anime_details: animeInput.getAllAnimeOnList()
    })
})

router.post('/create', function (req, res) {
    animeInput.insertAnimeToList(req.body)
    res.redirect('/')
  })

router.post('/delete', function (req, res) {
    animeInput.deleteAnimeFromList(req.body)
    res.redirect('/')
})

module.exports = router
