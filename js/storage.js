

let usersDb = [
    {
    username: 'admin',
    email: 'admin@gmail.com',
    password: '1234',
    room: '1',
    avatar: 'images/punk05.png'
    },
    {
    username: 'student',
    email: 'estudent@gmail.com',
    password: '1234',
    room: '1',
    avatar: 'images/punk04.png'
    },
  ];


let roomData = {
   room01: [] ,
   room02: [] ,
   room03: [] ,
   room04: [] ,
}

let gameStatus = {
  room01: '',
  room02: '',
  room03: '',
  room04: '',

}


module.exports = { usersDb, roomData, gameStatus };

