import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Player } from '../shared/player.model';
import { Game } from '../shared/game.model';
import { Record } from '../shared/record.model';
import { NotNamePipe } from './not-name.pipe';

import { RecordService } from "../shared/record.service";
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

    game:Game;
    set:number;

    constructor(private recordService:RecordService, private playerService:PlayerService) {}

    ngOnInit() {
        this.playerService.getPlayers().then(players => {
            this.players = players;
        });
    }

    selectPlayer(player) {
        if (!this.player1) {
            this.player1 = player;
        } else {
            if (!this.player2) {
                this.player2 = player;
            }
        }
    }

    /**
     * Closes player selection and shows score buttons
     */
    startGame() {
        this.game = new Game(this.player1, this.player2);
        this.set = 1;
    }

    getPlayerSets(player) {
        return this.game.getPlayerSets(player);
    }

    addSet(player) {
        this.game.addSet(player);
        this.set++;

        if (this.game.isOver()) {
            this.recordService.saveRecord(new Record(this.game));
        }
    }


}
