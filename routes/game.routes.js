// routes/game-routes.js
const router = require('express').Router();

// const { findById } = require('../models/Game.model');
const Game = require('../models/Game.model'); // <== add this line before your routes
const Create = require('../models/Create.model'); // <== add this line before your routes

const mongoose = require ("mongoose");

// require (import) middleware functions
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middleware/route-guard.js");
const { getMaxListeners } = require('../app');
const { raw } = require('express');

router.get('/browse', (req, res, next) => {
    Game.find()
        .then(allTheGamesFromDB => {
            res.render('games/game-list', { games: allTheGamesFromDB, count: allTheGamesFromDB.length, userInSession: req.session.currentUser });
        })
        .catch(error => {
            console.log('Error while getting the games from the DB: ', error);
            next(error);
        });
});

router.get('/browse/:gameId', (req, res, next) => {

    const { gameId } = req.params;

    Game.findById(gameId).then(game => {
        res.render('games/game-details', { game: game, /*, message: "Game was updated..."*/ userInSession: req.session.currentUser });
    }).catch(error => {
        console.log('Error while retrieving game details: ', error);
        // Call the error-middleware to display the error page to the user
        next(error);
    });
})

// required to be logged in!
router.get("/add", isLoggedIn, (req, res) => {

    res.render('admin/games-add', { userInSession: req.session.currentUser });
});


// Creates a Game in the Application. Requires to be logged in too!
router.post("/add", isLoggedIn, /*isAdmin,*/ (req, res) => {

    const { title, release, description, metacritic, image, video, genres, platforms } = req.body

    // The correct way to store platforms is to store the array inside the database
    // The model is already an array so it should work soon !!!!!!!! (and of course, the View)
    Create.create({
        title,
        release,
        description,
        metacritic,
        image,
        video,
        genres,
        platforms
    }).then(() => res.redirect('/dashboard')
     ).catch(error => next(error))
})


router.get("/dashboard", isLoggedIn, /*isAdmin,*/ (req, res) => {

    Create.find().then(creates => {

        res.render('admin/games-dashboard',  {
            creates,
            layout: /*'loggedIn-admin.hbs'*/ 'layout.hbs',
            userInSession: req.session.currentUser
        })
    })
})

router.get('/dashboard/:gameId', isLoggedIn, (req, res, next) => {

    const { gameId } = req.params;

    Create.findById(gameId).then(game => {
        res.render('admin/games-details', { game: game, /*, message: "Game was updated..."*/ userInSession: req.session.currentUser });
    }).catch(error => {
        console.log('Error while retrieving game details: ', error);
        // Call the error-middleware to display the error page to the user
        next(error);
    });
})


router.get('/dashboard/:gameId/edit', isLoggedIn, (req, res, next) => {
    const { gameId } = req.params;

    Create.findById(gameId)
    .then(create => {
       res.render('admin/games-edit', { create: create, userInSession: req.session.currentUser });
})
    .catch(error => next(error));
});


router.post('/dashboard/:gameId/edit', isLoggedIn, (req, res, next) => {
  const { gameId } = req.params;
 
  Create.findByIdAndUpdate(gameId, req.body, { new: true })
    .then(() => res.redirect('/dashboard')) 
    .catch(error => next(error));
});


router.post('/dashboard/:gameId/delete', isLoggedIn, (req, res, next) => {
    const { gameId } = req.params;
   
    Create.findByIdAndDelete(gameId)
      .then(() => res.redirect('/dashboard'))
      .catch(error => next(error));
  });

module.exports = router;




// Get all the Games
/*router.get("/games1", isLoggedIn, (req, res) => {

    Game.find().then(games => {

        // Render different layout based on user
        res.render('games/games-list', {
            games,
            layout: req.session.currentUser.role == "admin"
                ? 'loggedIn-admin.hbs' : 'loggedIn-user.hbs'
        })

    })

})*/


// Get a specific Game
/*router.get("/games1/:gameId", isLoggedIn, (req, res, next) => {
    
    const { gameId } = req.params

    Game.findById(gameId).then(game => {

        res.render('games/game-details', {
            game,
            layout: req.session.currentUser.role == "admin"
            ? 'loggedIn-admin.hbs' : 'loggedIn-user.hbs'
        })

    }).catch(error => next(error))

})*/




