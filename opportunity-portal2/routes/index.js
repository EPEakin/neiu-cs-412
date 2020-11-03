const express = require('express');
const router = express.Router();
const oppStore = require('../app').oppStore

let options = {
  title: 'STEM Opportunity Portal!!',
  layout: 'default',
  styles: ['/stylesheets/style.css', '/stylesheets/old-style.css']
}


router.get('/', async function(req, res, next) {
  try{
    let keyList = await oppStore.keyList()
    let keyPromises = keyList.map(key => {
      return oppStore.read(key)
    })
    let allOpps = await Promise.all(keyPromises)
    res.render('index', options)
  } catch(err){
    next(err)
  }
})

module.exports = router;
