const { Router } = require('express');
const router = new Router();
const mongoose = require ("mongoose");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const User = require("../models/User.model");

// require auth middleware
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

// GET route ==> to display the signup form to users
router.get('/signup', isLoggedOut, (req, res) => res.render('auth/signup'));
 
// POST route ==> to process form data
router.post('/signup', isLoggedOut, (req, res, next) => {

    const { name, email, password } = req.body;

    bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
        // console.log(`Password hash: ${hashedPassword}`)
        return User.create({
          name,
          email,
          // passwordHash => this is the key from the User model
          //    ^
          //     |        |--> this is the placeholder (how we named returning value from the previous method (.hash()))
          password: hashedPassword
        });
    })
    .then(userFromDB => {
     console.log('Newly created user is: ', userFromDB);
      res.redirect("/login");
    })
    .catch(error => next(error));
  });

  // Login Route
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
          res.render('index', { userInSession: req.session.currentUser });
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.'});
        }
      })
      .catch(error => next(error));
    });

// Getting specific profile
router.get('/profile/:id', isLoggedIn, (req, res) => {
  const { id } = req.params;
    
  User.findById(id)
  .then(user => res.render('users/profile', {user: user, userInSession: req.session.currentUser} ))
  .catch(error => console.log(error))
  })

  //Get Edit Form
  router.get('/profile/:id/edit', isLoggedIn, (req, res, next) => {
    const { id } = req.params;
  
    User.findById(id)
    .then(userEdit => {
       res.render('users/profile-edit', { user: userEdit, userInSession: req.session.currentUser });
  })
    .catch(error => next(error));
  });
  
  // Updating name and email
    router.post('/profile/:id/edit', isLoggedIn, (req, res, next) => {
      const { id } = req.params;
      const { name, email } = req.body;

      User.findByIdAndUpdate(id, { name, email }, { new: true })
        .then(() => res.redirect(`/profile/${id}`)) 
        .catch(error => next(error));
    });


  //Logout Route
  router.get("/logout", isLoggedIn, (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect("/");
    });
  });




  module.exports = router;