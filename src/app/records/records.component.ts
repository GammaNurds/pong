import { Component, OnInit } from '@angular/core';

import { Record } from '../shared/record.model';
import { RecordService } from '../shared/record.service';
import { Player } from '../shared/player.model';
import { PlayerService } from '../game/player.service';
import { EloService } from '../elo.service';
import * as _ from 'lodash';
import { OrderByPipe } from '../shared/order-by.pipe';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  providers: [RecordService, PlayerService, EloService]
  //pipes: [OrderByPipe]
})
export class RecordsComponent implements OnInit {

    records: Record[];
    players: Player[];
    stats;

    constructor(private recordService: RecordService, private playerService: PlayerService, private eloService: EloService) { }

    ngOnInit() {
        this.stats = {};

        // wait for async data, then call stats
        Promise.all([
            this.recordService.getRecords(),
            this.playerService.getPlayers()
        ]).then(results => {
            this.calcStats(results[0], results[1]);
        });
    }

    isWinner(playerName: string, record: Record): boolean {
        return (record.p1Name === playerName && record.p1Sets > record.p2Sets) || (record.p2Name === playerName && record.p1Sets < record.p2Sets);
    }

    hasPlayed(playerName: string, record: Record): boolean {
        return record.p1Name === playerName || record.p2Name === playerName;
    }

    calcStats(records: Record[], players: Player[]): void {

        this.stats = {
            ranks: [],
            wins: [],
            winPerc: [],
            sweeps: [],
            sweepsAgainst: [],
            comebacks: [],
            comebacksAgainst: [],
            winStreak: [],
            clutchSets: [],
            clutchSetsAgainst: []
        };

        this.stats.ranks = this.eloService.calcELO(records, players);

        for (let player of players) {

            let wins = _.filter(records, o => {
                return this.isWinner(player.name, o);
            });

            let sweeps = _.filter(records, o => {
                return (o.p1Name === player.name && o.p1Sets > o.p2Sets && o.p2Sets === 0) || (o.p2Name === player.name && o.p1Sets < o.p2Sets && o.p1Sets === 0);
            });

            let sweepsAgainst = _.filter(records, o => {
                return (o.p1Name === player.name && o.p1Sets < o.p2Sets && o.p1Sets === 0) || (o.p2Name === player.name && o.p1Sets > o.p2Sets && o.p2Sets === 0);
            });

            let comebacks = _.filter(records, o => {
                let isComeback = false;

                // won match
                if (this.isWinner(player.name, o)) {
                    // lost first two sets
                    if (o.setWinners[1] !== player.name && o.setWinners[2] !== player.name) {
                        isComeback = true;
                    }
                }
                return isComeback;
            });

            let comebacksAgainst = _.filter(records, o => {
                let isComebackAgainst = false;

                // lost match
                if (!this.isWinner(player.name, o)) {
                    // won first two sets
                    if (o.setWinners[1] === player.name && o.setWinners[2] === player.name) {
                        isComebackAgainst = true;
                    }
                }
                return isComebackAgainst;
            });

            // win streak
            let winStreak = 0;
            let playedGames = _.filter(records, o => o.p1Name === player.name || o.p2Name === player.name);
            for (let record of _.reverse(playedGames)) {
                if (this.isWinner(player.name, record)) {
                    winStreak++;
                } else {  // lost game
                    break;
                }
            };

            // clutch sets are a won set on a stand of 2-2
            let clutchSets = _.filter(records, o => {
                if (o.p1Sets >= 2 && o.p2Sets >= 2) {  // has clutch set
                    if (o.p1Sets > o.p2Sets && o.p1Name === player.name) {
                        return true;
                    } else if (o.p1Sets < o.p2Sets && o.p2Name === player.name) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });

            let clutchSetsAgainst = _.filter(records, o => {
                if (o.p1Sets >= 2 && o.p2Sets >= 2) {  // is clutch set
                    if (o.p1Sets < o.p2Sets && o.p1Name === player.name) {
                        return true;
                    } else if (o.p1Sets > o.p2Sets && o.p2Name === player.name) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });

            this.stats.wins.push({
                playerName: player.name,
                value: wins.length
            });
            this.stats.winPerc.push({
                playerName: player.name,
                value: wins.length / playedGames.length
            });
            this.stats.sweeps.push({
                playerName: player.name,
                value: sweeps.length
            });
            this.stats.sweepsAgainst.push({
                playerName: player.name,
                value: sweepsAgainst.length
            });
            this.stats.comebacks.push({
                playerName: player.name,
                value: comebacks.length
            });
            this.stats.comebacksAgainst.push({
                playerName: player.name,
                value: comebacksAgainst.length
            });
            this.stats.winStreak.push({
                playerName: player.name,
                value: winStreak
            });
            this.stats.clutchSets.push({
                playerName: player.name,
                value: clutchSets.length
            });
            this.stats.clutchSetsAgainst.push({
                playerName: player.name,
                value: clutchSetsAgainst.length
            });
        }
    }
}
