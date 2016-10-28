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
import { RecordService } from '../shared/record.service';
import { PlayerService } from '../game/player.service';
import * as _ from 'lodash';
var RecordsComponent = (function () {
    function RecordsComponent(recordService, playerService) {
        this.recordService = recordService;
        this.playerService = playerService;
    }
    RecordsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stats = {};
        Promise.all([
            this.recordService.getRecords(),
            this.playerService.getPlayers()
        ]).then(function (results) {
            _this.calcStats(results[0], results[1]);
            _this.calcELO(results[0], results[1]);
        });
    };
    RecordsComponent.prototype.isWinner = function (playerName, record) {
        return (record.p1Name === playerName && record.p1Sets > record.p2Sets) || (record.p2Name === playerName && record.p1Sets < record.p2Sets);
    };
    RecordsComponent.prototype.hasPlayed = function (playerName, record) {
        return record.p1Name === playerName || record.p2Name === playerName;
    };
    RecordsComponent.prototype.calcStats = function (records, players) {
        var _this = this;
        this.stats = {
            wins: [],
            winPerc: [],
            sweeps: [],
            sweepsAgainst: [],
            comebacks: [],
            comebacksAgainst: [],
            winStreak: []
        };
        var _loop_1 = function (player) {
            var wins = _.filter(records, function (o) {
                return _this.isWinner(player.name, o);
            });
            var sweeps = _.filter(records, function (o) {
                return (o.p1Name === player.name && o.p1Sets > o.p2Sets && o.p2Sets === 0) || (o.p2Name === player.name && o.p1Sets < o.p2Sets && o.p1Sets === 0);
            });
            var sweepsAgainst = _.filter(records, function (o) {
                return (o.p1Name === player.name && o.p1Sets < o.p2Sets && o.p1Sets === 0) || (o.p2Name === player.name && o.p1Sets > o.p2Sets && o.p2Sets === 0);
            });
            var comebacks = _.filter(records, function (o) {
                var isComeback = false;
                if (_this.isWinner(player.name, o)) {
                    if (o.setWinners[1] !== player.name && o.setWinners[2] !== player.name) {
                        isComeback = true;
                    }
                }
                return isComeback;
            });
            var comebacksAgainst = _.filter(records, function (o) {
                var isComebackAgainst = false;
                if (!_this.isWinner(player.name, o)) {
                    if (o.setWinners[1] === player.name && o.setWinners[2] === player.name) {
                        isComebackAgainst = true;
                    }
                }
                return isComebackAgainst;
            });
            var winStreak = 0;
            var playedGames = _.filter(records, function (o) { return o.p1Name === player.name || o.p2Name === player.name; });
            for (var _i = 0, _a = _.reverse(playedGames); _i < _a.length; _i++) {
                var record = _a[_i];
                if (this_1.isWinner(player.name, record)) {
                    winStreak++;
                }
                else {
                    break;
                }
            }
            this_1.stats.wins.push({
                playerName: player.name,
                value: wins.length
            });
            this_1.stats.winPerc.push({
                playerName: player.name,
                value: wins.length / playedGames.length
            });
            this_1.stats.sweeps.push({
                playerName: player.name,
                value: sweeps.length
            });
            this_1.stats.sweepsAgainst.push({
                playerName: player.name,
                value: sweepsAgainst.length
            });
            this_1.stats.comebacks.push({
                playerName: player.name,
                value: comebacks.length
            });
            this_1.stats.comebacksAgainst.push({
                playerName: player.name,
                value: comebacksAgainst.length
            });
            this_1.stats.winStreak.push({
                playerName: player.name,
                value: winStreak
            });
        };
        var this_1 = this;
        for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
            var player = players_1[_i];
            _loop_1(player);
        }
    };
    RecordsComponent.prototype.calcELO = function (records, players) {
        var eloStats = {};
        var STARTPOINTS = 1000;
        for (var _i = 0, players_2 = players; _i < players_2.length; _i++) {
            var player = players_2[_i];
            eloStats[player.name] = STARTPOINTS;
        }
        function ELOCalcWinner(winner, loser) {
            var K = 10;
            var winner_calc = winner;
            var loser_calc = loser;
            if (Math.abs(loser - winner) > 400) {
                winner_calc = 400;
                loser_calc = -400;
            }
            var EWP_winner = 1 / (1 + (Math.pow(10, ((loser_calc - winner_calc) / 400))));
            var EWP_loser = 1 - EWP_winner;
            winner = Math.ceil(winner + K * (1 - EWP_winner));
            loser = Math.ceil(loser + K * (0 - EWP_loser));
            console.log("after winner", winner);
            console.log("after loser", loser);
        }
        ;
        ELOCalcWinner(eloStats["martin"], eloStats["florian"]);
    };
    return RecordsComponent;
}());
RecordsComponent = __decorate([
    Component({
        selector: 'app-records',
        templateUrl: './records.component.html',
        styleUrls: ['./records.component.css'],
        providers: [RecordService, PlayerService]
    }),
    __metadata("design:paramtypes", [RecordService, PlayerService])
], RecordsComponent);
export { RecordsComponent };
//# sourceMappingURL=../../../../src/app/records/records.component.js.map