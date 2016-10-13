import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Player } from './player.model';
import { Game } from './game.model';
import { Record } from './record.model';
import { NotNamePipe } from './not-name.pipe';

import { RecordService } from "./record.service";
import { PlayerService } from "./player.service";

@Component({
  selector: 'pong-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [RecordService, PlayerService]
})
export class GameComponent implements OnInit {

    players:Player[];  // this.players should only be an array of player objects
    player1:Player;
    player2:Player;

    gameTime:boolean;
    showScores:boolean;
    game:Game;

    records:Record[];

    constructor(private recordService:RecordService, private playerService:PlayerService) {}

    ngOnInit() {
        this.gameTime = false;
        this.showScores = false;
        this.player1 = new Player();
        this.player2 = new Player();

        this.playerService.getPlayers().then(players => {
            this.players = players;
        });
    }

    /**
     * Closes player selection and shows score buttons
     */
    startGame() {
        this.gameTime = true;
        this.game = new Game(this.player1, this.player2);
    }

    addPoint(player) {
        this.game.addPoint(player);

        // check if set or game is over
        if (this.game.isOver()) {
            this.showScores = true;

            // save record and reload
            let record = new Record(this.game);
            this.recordService.saveRecord(record).then(record => {
                console.log(record)
                this.recordService.getRecords().then(records => {
                    this.records = records;
                });
            });

            // get scores
            // this.recordService.getRecords().then(function(records) {
            //     this.records = records;
            // });
        }
    }

    getPointsByPlayer(player:Player) {
        return this.game.getPointsByPlayer(player);
    }

    getPlayerSets(player:Player) {
        return this.game.getPlayerSets(player);
    }

    changedPlayer(event) {
        console.log(event);
    }

}
