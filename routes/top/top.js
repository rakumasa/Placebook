var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');

//GET ALL POSTS
router.get(`/`,function(req,res,next){
   knex.raw(`SELECT *
       FROM posts JOIN users ON logged_in = true`)
   .then (function(data){
   res.render('top/top', {
         data: data.rows
      });
   });
});

//Logout route - DJ
router.get('/logout', (req, res, next) =>{
  res.clearCookie('loggedin');
  knex.raw('UPDATE users SET logged_in = false where logged_in = true').then(()=>{
    res.redirect('/')
  })
})


module.exports = router;
