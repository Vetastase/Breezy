const { Router } = require('express');
const router = new Router();

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const User = require("../models/User.model");

// require auth middleware
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

// GET route ==> to display the signup form to users
router.get('/signup', isLoggedOut, (req, res) => res.render('auth/signup'));
 
// POST route ==> to process form data
router.post('/signup', isLoggedOut, (req, res, next) => {
    console.log('The form data: ', req.body);

    const { username, email, password } = req.body;

    bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
        // console.log(`Password hash: ${hashedPassword}`)
        return User.create({
          // username: username
          username,
          email,
          // passwordHash => this is the key from the User model
          //    ^
          //     |        |--> this is the placeholder (how we named returning value from the previous method (.hash()))
          password: hashedPassword
        });
    })
    .then(userFromDB => {
     console.log('Newly created user is: ', userFromDB);
      res.redirect("/userProfile");
    })
    .catch(error => next(error));
  });

  router.get('/login', isLoggedOut, (req, res) => {
    res.render('auth/login', { userInSession: req.session.currentUser });
  })
 
  router.post('/login', isLoggedOut, (req, res, next) => {
    const { email, password } = req.body;
    
    if(email === '' || password === '') {
      res.render('auth/login', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return;
    }

    User.findOne({ email })
      .then(user => {
        if(!user) {
          res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.'});
          return;
        } else if (bcryptjs.compareSync(password, user.password)) {
          req.session.currentUser = user;
          res.render('users/user-profile', { userInSession: req.session.currentUser });
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.'});
        }
      })
      .catch(error => next(error));
    });

  router.get('/userProfile', isLoggedIn, (req, res) => {
    res.render('users/user-profile', { userInSession: req.session.currentUser });
  });
 
  router.get("/logout", isLoggedIn, (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect("/");
    });
  });




  module.exports = router;