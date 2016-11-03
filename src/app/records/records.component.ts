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

        // TODO: amke these Record methods
        function hasClutchSet(record: Record) {
            return record.p1Sets >= 2 && record.p2Sets >= 2;
        }

        function hasPlayed(record: Record, playerName) {
            return record.p1Name === playerName || record.p2Name === playerName;
        }

        function getWinner(record: Record) {
            return record.p1Sets > record.p2Sets ? record.p1Name : record.p2Name;
        }

        function isSweep(record: Record) {
            return record.p1Sets === 0 || record.p2Sets === 0;
        }

        function isComeback(record: Record) {
            let winnerName = getWinner(record);
            // won, but lost first two sets
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
            clutchSets: []
        };

        this.stats.ranks = this.eloService.calcELO(records, players);

        for (let player of players) {

            let wins = _.filter(records, o => {
                return this.isWinner(player.name, o);
            });

            let sweeps = _.filter(records, o => {
                return isSweep(o) && getWinner(o) === player.name;
            });

            let sweepsAgainst = _.filter(records, o => {
                return hasPlayed(o, player.name) && isSweep(o) && getWinner(o) !== player.name;
            });

            let comebacks = _.filter(records, o => {
                return isComeback(o) && getWinner(o) === player.name;
            });

            let comebacksAgainst = _.filter(records, o => {
                return hasPlayed(o, player.name) && isComeback(o) && getWinner(o) !== player.name;
            });

            // win streak
            let winStreak = 0;
            let playedGames = _.filter(records, o => hasPlayed(o, player.name));
            for (let record of _.reverse(playedGames)) {
                if (getWinner(record) === player.name) {
                    winStreak++;
                } else {  // lost game
                    break;
                }
            };

            // clutch sets are a won set on a stand of 2-2
            let clutchSets = _.filter(records, o => {
                return hasPlayed(o, player.name) && hasClutchSet(o);
            });

            let clutchSetsWon = _.filter(records, o => {
                return hasClutchSet(o) && getWinner(o) === player.name;
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
                sets: clutchSets.length,
                won: clutchSetsWon.length,
                perc: Math.round(clutchSetsWon.length / clutchSets.length * 100)
            });

        }
    }
}
