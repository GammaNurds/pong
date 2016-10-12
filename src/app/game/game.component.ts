import { Component, OnInit } from '@angular/core';

import { Player } from './player.model';
import { Game } from './game.model';

import { NotNamePipe } from './not-name.pipe';

@Component({
  selector: 'pong-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    players: Player[];  // this.players should only be an array of player objects
    player1 = {
        id: 1,
        name: "axel"
    }//new Player;
    player2 = {
        id: 2,
        name: "matthias"
    }//new Player;
    gameTime: boolean;
    game: Game;

    constructor() { }

    ngOnInit() {
        this.gameTime = false;
        this.players = [
            {id: 1, name: "axel"},
            {id: 2, name: "matthias"},
            {id: 3, name: "martin"},
            {id: 4, name: "florian"}
        ]
    }

    /**
     * Closes player selection and shows score buttons
     */
    startGame() {
        this.gameTime = true;
        this.game = new Game(this.player1, this.player2);
    }

    addPoint() {
        this.game.addPoint("axel");
    }

}
