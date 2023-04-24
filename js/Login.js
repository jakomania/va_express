var passport = require('passport');
var PassportLocal = require('passport-local').Strategy;


const { usersDb, connected_users } = require('./storage.js');



class Login {

  
  

  constructor(username, password) {
    this.username = username;    
    this.password = password;    
    }  

  getStoredUser() 
  { 
    console.log('El usuario buscado es ' + this.usernaname);
    return usersDb.find((user) => user.email === this.username );// return user object if exists
  }  
    
  loginUser() 
  {
    let user = this.existsUser();
    if ( user && user.password === this.password )
    {      
      // connected_users.push( this.username );
      // console.log("Last logged user is " 
      //   + connected_users[ connected_users.length -1] )
      return user      
    }
    else
    {
      console.log("Fallo!!")
      return;
    }
  }

           
  existsUser()
  {
    let user = this.getStoredUser();
    if (!user)
    {
      console.log('NO existe el usuario!');
      return;
    }
    else 
    {
      console.log('SI existe el usuario!');
      return user;
    }      
  }




  } 


module.exports = { Login }
  



