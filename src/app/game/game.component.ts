import { Component, OnInit } from '@angular/core';
// import { Http } from '@angular/http';
import { Player } from '../shared/player.model';
import { Game } from '../shared/game.model';
import { Record } from '../shared/record.model';
// import { NotNamePipe } from './not-name.pipe';

import { RecordService } from '../shared/record.service';
import { PlayerService } from './player.service';
import { EloService } from '../elo.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [RecordService, PlayerService, EloService]
})
export class GameComponent implements OnInit {

    players: Player[];  // this.players should only be an array of player objects
    player1: Player;
    player2: Player;
    game: Game;
    set: number;
    winText: string;
    ranks: any[];
    p1WinExpected;
    p2WinExpected;

    constructor(private recordService: RecordService, private playerService: PlayerService, private eloService: EloService) {}

    ngOnInit() {
        console.log("init game component!");
        // this.playerService.getPlayers().then(players => {
        //     this.players = players;
        // });

        Promise.all([
            this.recordService.getRecords(),
            this.playerService.getPlayers()
        ]).then(results => {
            this.ranks = this.eloService.calcELO(results[0], results[1]);
            this.players = results[1];
        });
    }

    selectPlayer(player) {
        if (!this.player1) {
            this.player1 = player;
        } else {
            if (!this.player2) {
                this.player2 = player;
                this.getExpectedElo();
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
            this.winText = this.game.isSweep() ? 'sweeeeep' : 'win';
        }
    }

    isSelected(player) {
        return (this.player1 && player.name === this.player1.name) || (this.player2 && player.name === this.player2.name);
    }

    getExpectedElo() {
        let p1Rank = _.find(this.ranks, { playerName: this.player1.name });
        let p2Rank = _.find(this.ranks, { playerName: this.player2.name });

        let p1WinResult = this.eloService.calc(p1Rank.elo, p2Rank.elo);
        let p2WinResult = this.eloService.calc(p2Rank.elo, p1Rank.elo);

        this.p1WinExpected = p1WinResult[0] - p1Rank.elo;

        this.p2WinExpected = p2WinResult[0] - p2Rank.elo;

    }


}
