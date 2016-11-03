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
import { EloService } from '../elo.service';
import * as _ from 'lodash';
var RecordsComponent = (function () {
    function RecordsComponent(recordService, playerService, eloService) {
        this.recordService = recordService;
        this.playerService = playerService;
        this.eloService = eloService;
    }
    RecordsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stats = {};
        Promise.all([
            this.recordService.getRecords(),
            this.playerService.getPlayers()
        ]).then(function (results) {
            _this.calcStats(results[0], results[1]);
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
        function hasClutchSet(record) {
            return record.p1Sets >= 2 && record.p2Sets >= 2;
        }
        function hasPlayed(record, playerName) {
            return record.p1Name === playerName || record.p2Name === playerName;
        }
        function getWinner(record) {
            return record.p1Sets > record.p2Sets ? record.p1Name : record.p2Name;
        }
        function isSweep(record) {
            return record.p1Sets === 0 || record.p2Sets === 0;
        }
        function isComeback(record) {
            var winnerName = getWinner(record);
            return record.setWinners[1] !== winnerName && record.setWinners[2] !== winnerName;
        }
        this.stats = {
            ranks: [],
            wins: [],
            winPerc: [],
            sweeps: [],
            sweepsAgainst: [],
            comebacks: [],
            comebacksAgainst: [],
            winStreak: [],
            lossStreak: [],
            clutchSets: []
        };
        this.stats.ranks = this.eloService.calcELO(records, players);
        var _loop_1 = function (player) {
            var wins = _.filter(records, function (o) {
                return _this.isWinner(player.name, o);
            });
            var sweeps = _.filter(records, function (o) {
                return isSweep(o) && getWinner(o) === player.name;
            });
            var sweepsAgainst = _.filter(records, function (o) {
                return hasPlayed(o, player.name) && isSweep(o) && getWinner(o) !== player.name;
            });
            var comebacks = _.filter(records, function (o) {
                return isComeback(o) && getWinner(o) === player.name;
            });
            var comebacksAgainst = _.filter(records, function (o) {
                return hasPlayed(o, player.name) && isComeback(o) && getWinner(o) !== player.name;
            });
            var winStreak = 0;
            var playedGames = _.filter(records, function (o) { return hasPlayed(o, player.name); });
            for (var _i = 0, _a = _.reverse(playedGames); _i < _a.length; _i++) {
                var record = _a[_i];
                if (getWinner(record) === player.name) {
                    winStreak++;
                }
                else {
                    break;
                }
            }
            ;
            var lossStreak = 0;
            playedGames = _.filter(records, function (o) { return hasPlayed(o, player.name); });
            for (var _b = 0, _c = _.reverse(playedGames); _b < _c.length; _b++) {
                var record = _c[_b];
                if (hasPlayed(record, player.name) && getWinner(record) !== player.name) {
                    lossStreak++;
                }
                else {
                    break;
                }
            }
            ;
            var clutchSets = _.filter(records, function (o) {
                return hasPlayed(o, player.name) && hasClutchSet(o);
            });
            var clutchSetsWon = _.filter(records, function (o) {
                return hasClutchSet(o) && getWinner(o) === player.name;
            });
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
            this_1.stats.lossStreak.push({
                playerName: player.name,
                value: lossStreak
            });
            this_1.stats.clutchSets.push({
                playerName: player.name,
                sets: clutchSets.length,
                won: clutchSetsWon.length,
                perc: Math.round(clutchSetsWon.length / clutchSets.length * 100)
            });
        };
        var this_1 = this;
        for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
            var player = players_1[_i];
            _loop_1(player);
        }
    };
    return RecordsComponent;
}());
RecordsComponent = __decorate([
    Component({
        selector: 'app-records',
        templateUrl: './records.component.html',
        styleUrls: ['./records.component.css'],
        providers: [RecordService, PlayerService, EloService]
    }),
    __metadata("design:paramtypes", [RecordService, PlayerService, EloService])
], RecordsComponent);
export { RecordsComponent };
//# sourceMappingURL=../../../../src/app/records/records.component.js.map