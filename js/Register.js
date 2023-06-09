const { usersDb } = require('./storage.js');


class Register {


  constructor(formFields) {
    this.username = formFields.username;
    this.email = formFields.email;
    this.password = formFields.pass;
    this.room = formFields.room;
    this.avatar = formFields.avatar;
    }  

    checkEmail() 
    { 
      return usersDb.find((user) => user.email === this.email );// return user object if exists
    }    
    
    registerUser() 
    {      
      {        
        usersDb.push({
          username: this.username,
          email: this.email,
          password: this.password, 
          room: this.room,
          avatar: this.avatar
        })
        console.log('USUARIOS REGISTRADOS:');
        console.log(usersDb);
      }
      
    }
  }


module.exports = { Register }
  