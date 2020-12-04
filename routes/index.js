const express = require('express');
const router = express.Router();
const oppStore = require('../app').oppStore

let options = {
  title: 'Explore STEM!',
  pageTitle: 'STEM Opportunity Portal',
  layout: 'default',
  isHomeActive: "active"
}

router.get('/', async function(req, res, next) {
  try{
    res.render('index', options)
  } catch(err){
    next(err)
  }
})

module.exports = router
