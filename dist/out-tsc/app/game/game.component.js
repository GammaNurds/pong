var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Game } from '../shared/game.model';
import { Record } from '../shared/record.model';
import { RecordService } from '../shared/record.service';
import { PlayerService } from './player.service';
import { EloService } from '../elo.service';
var GameComponent = (function () {
    function GameComponent(recordService, playerService, eloService) {
        this.recordService = recordService;
        this.playerService = playerService;
        this.eloService = eloService;
    }
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("init game component!");
        Promise.all([
            this.recordService.getRecords(),
            this.playerService.getPlayers()
        ]).then(function (results) {
            _this.ranks = _this.eloService.calcELO(results[0], results[1]);
            _this.players = results[1];
        });
    };
    GameComponent.prototype.selectPlayer = function (player) {
        if (!this.player1) {
            this.player1 = player;
        }
        else {
            if (!this.player2) {
                this.player2 = player;
                this.getExpectedElo();
            }
        }
    };
    GameComponent.prototype.startGame = function () {
        this.game = new Game(this.player1, this.player2);
        this.set = 1;
    };
    GameComponent.prototype.getPlayerSets = function (player) {
        return this.game.getPlayerSets(player);
    };
    GameComponent.prototype.addSet = function (player) {
        this.game.addSet(player);
        this.set++;
        if (this.game.isOver()) {
            this.recordService.saveRecord(new Record(this.game));
            this.winText = this.game.isSweep() ? 'sweeeeep' : 'win';
        }
    };
    GameComponent.prototype.isSelected = function (player) {
        return (this.player1 && player.name === this.player1.name) || (this.player2 && player.name === this.player2.name);
    };
    GameComponent.prototype.getExpectedElo = function () {
        var p1Rank = _.find(this.ranks, { playerName: this.player1.name });
        var p2Rank = _.find(this.ranks, { playerName: this.player2.name });
        var p1WinResult = this.eloService.calc(p1Rank.elo, p2Rank.elo);
        var p2WinResult = this.eloService.calc(p2Rank.elo, p1Rank.elo);
        this.p1WinExpected = p1WinResult[0] - p1Rank.elo;
        this.p2WinExpected = p2WinResult[0] - p2Rank.elo;
    };
    return GameComponent;
}());
GameComponent = __decorate([
    Component({
        selector: 'app-game',
        templateUrl: './game.component.html',
        styleUrls: ['./game.component.css'],
        providers: [RecordService, PlayerService, EloService]
    }),
    __metadata("design:paramtypes", [RecordService, PlayerService, EloService])
], GameComponent);
export { GameComponent };
//# sourceMappingURL=../../../../src/app/game/game.component.js.map