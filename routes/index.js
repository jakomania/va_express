var express = require('express');
var router = express.Router();
var passport = require('passport');
var PassportLocal = require('passport-local').Strategy;

const { Login } = require("../js/Login.js");
const { Register } = require("../js/Register.js");
const { Player } = require("../js/Player.js");
const { Game } = require("../js/Game.js");

module.exports = router;


var loggedUser = null;

passport.use(new PassportLocal((username, password, done) => {
  
  var login = new Login(username, password);
  var user = login.loginUser();  
  loggedUser = user;  
  if (user) return done(null, user);
  done(null, false);
  
  }));

passport.serializeUser((user, done) => {  
  done(null, user.email);

})

passport.deserializeUser((user, done) => {  
  done(null, {
    username: user.username, 
    mail: user.mail,
    avatar: user.avatar
  });

})

// router.get('/cookie',function(req, res){
//   res.cookie('cookie_name' , 'cookie_value').send('Cookie is set');
// });

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
  res.clearCookie('userinfo'); 
  res.render('login');
});

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/'}), 
  (req, res) => {    
    //console.log(req.body);  
    console.log(loggedUser);    
    var cookie = loggedUser;
    if (cookie) {            
      res.cookie('userinfo', cookie);
      res.redirect('/dashboard');
    }
  });


router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register',   
  (req, res) => {
    console.log(req.body);  
    let register = new Register(req.body);
    let exists = register.checkEmail();

    if (!exists) {
      register.registerUser();
      res.redirect('/');
  }});


router.get('/dashboard', (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
  }, 
  (req, res) => {
    res.clearCookie("roominfo");
    res.render('dashboard');
});


router.post('/room',   
  (req, res) => {
    var player = new Player(req.body);
      player.addPlayer2Room();

      let players = player.getRoomData();
      let room = player.getRoom();

      var obj = new Object();
      obj[room] = players;      
      //console.log(obj[room]);

      if (obj[room]) {
        res.clearCookie("userinfo");
        res.cookie('roominfo', obj);
        res.render('room');
      }
  });

  // router.post('/game',   
  // (req, res) => {
  //   var game = new Game();
  //   game.saySomething(req.body);
  // });

  router.post("/results",(req,res)=>{

    console.log("POST RESULTS: ")
    console.log(req.body)
    res.render("results", req.body);
  });



router.get("/logout",(req,res)=>{
  req.logout( function(err) {
    if (err) { return next(err); }
  });
  res.redirect("/");
});




module.exports = router;
