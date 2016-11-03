var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var EloService = (function () {
    function EloService() {
    }
    EloService.prototype.calc = function (winner, loser) {
        var K = 20;
        var winner_calc = winner;
        var loser_calc = loser;
        var EWP_winner = 1 / (1 + (Math.pow(10, ((loser_calc - winner_calc) / 400))));
        var EWP_loser = 1 - EWP_winner;
        winner = Math.round((winner + K * (1 - EWP_winner)));
        loser = Math.round((loser + K * (0 - EWP_loser)));
        return [winner, loser];
    };
    ;
    EloService.prototype.calcELO = function (records, players) {
        var STARTPOINTS = 1000;
        var ranks = [];
        for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
            var player = players_1[_i];
            ranks.push({
                playerName: player.name,
                elo: STARTPOINTS
            });
        }
        var _loop_1 = function (record) {
            var p1ELO = _.find(ranks, { playerName: record.p1Name });
            var p2ELO = _.find(ranks, { playerName: record.p2Name });
            if (record.p1Sets > record.p2Sets) {
                var newELO_1 = this_1.calc(p1ELO["elo"], p2ELO["elo"]);
                ranks.forEach(function (rank) {
                    if (rank.playerName === record.p1Name) {
                        rank.elo = newELO_1[0];
                    }
                    else if (rank.playerName === record.p2Name) {
                        rank.elo = newELO_1[1];
                    }
                });
            }
            else {
                var newELO_2 = this_1.calc(p2ELO["elo"], p1ELO["elo"]);
                ranks.forEach(function (rank) {
                    if (rank.playerName === record.p2Name) {
                        rank.elo = newELO_2[0];
                    }
                    else if (rank.playerName === record.p1Name) {
                        rank.elo = newELO_2[1];
                    }
                });
            }
        };
        var this_1 = this;
        for (var _a = 0, records_1 = records; _a < records_1.length; _a++) {
            var record = records_1[_a];
            _loop_1(record);
        }
        return ranks;
    };
    return EloService;
}());
EloService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], EloService);
export { EloService };
//# sourceMappingURL=../../../src/app/elo.service.js.map