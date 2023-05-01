


class Game {
    //Grid lenght 
     frameLength = 4;

    
    constructor() {
        //Cells to win
        this.cells2win = Math.pow(this.frameLength, 2) / 2 + 1;               
    }
    
    //Check player scores
    gameProcess(json) 
    {
        let score1 = json.player1Score.length;
        let score2 = json.player2Score.length;

        if ( score1 >= this.cells2win ||
            score2 >= this.cells2win ) {

            json.status = false;
            return json;
            }
        json.status = true;
        return json;   
    }

    //Check for valid JSON from client
    gameReady(json)
    {
        if (json) { return true; }        
        return false;
    }




}

module.exports = { Game }