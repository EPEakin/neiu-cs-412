const express = require('express');
const router = express.Router();
const oppStore = require('../app').oppStore

let options = {
  title: 'STEM Opportunity Portal!',
  pageTitle: 'Welcome to the STEM Opportunity Portal!',
  layout: 'default',
  isHomeActive: "active"
  //styles: ['/stylesheets/style.css', '/stylesheets/old-style.css']
}


router.get('/', async function(req, res, next) {
  try{
    res.render('index', options)
  } catch(err){
    next(err)
  }
})

module.exports = router;
