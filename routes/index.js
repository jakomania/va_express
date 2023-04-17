var express = require('express');
var router = express.Router();
var passport = require('passport');
var PassportLocal = require('passport-local').Strategy;

const { Login } = require("../js/Login.js");
const { Register } = require("../js/Register.js");


passport.use(new PassportLocal((username, password, done) => {
  
  var login = new Login(username, password);
  var user = login.loginUser();

  if (user) return done(null, {id: 1, name: 'admin'});
  done(null, false);
  }));

passport.serializeUser((user, done) => {
  done(null, user.id);

})

passport.deserializeUser((user, done) => {
  done(null, {id: 1, name: 'admin'});

})

// passport.use(new PassportLocal(
//   (username, password, done) => {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/login', 
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/dashboard',
    }),
  (req, res) => {
    console.log(req.body);  
  });


router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Express' });
});

router.post('/register',   
  (req, res) => {
    console.log(req.body);  
    let register = new Register(req.body);
    let exists = register.checkEmail();

    if (!exists) {
      register.registerUser();
      res.render('success_reg');
  }});


router.get('/dashboard', (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}, (req, res) => {

  res.render('dashboard');
});





module.exports = router;
 