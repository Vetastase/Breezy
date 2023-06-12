// routes/about.routes.js
const express = require('express');
const router = express.Router();


router.get("/about", (req, res, next) => {
    res.render('about', { userInSession: req.session.currentUser });
  });
  
  module.exports = router;