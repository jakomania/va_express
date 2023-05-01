


class Game {
    

    constructor(gameData) {
        this.gameRoom = Object.keys(gameData.roomInfo)[0];
        this.player1Name = gameData.roomInfo[this.gameRoom][0]['player'];
        this.player2Name = gameData.roomInfo[this.gameRoom][1]['player'];
        this.player1Score = gameData.player1Score;
        this.player2Score = gameData.player2Score;
        this.gameStatus = true;                
                
                
    }
    

    getGameData() 
    {
        console.log('GAME DATA IS:');
        console.log(this.gameRoom);
        console.log(this.gameStatus);
        console.log(this.player1Name);
        console.log(this.player2Name);
        console.log(this.player1Score);
        console.log(this.player2Score);
    }




}

module.exports = { Game }