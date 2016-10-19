import { Component, OnInit } from '@angular/core';

import { Record } from '../shared/record.model';
import { RecordService } from '../shared/record.service';
import { Player } from '../shared/player.model';
import { PlayerService } from '../game/player.service';
import * as _ from "lodash";

@Component({
  selector: 'pong-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  providers: [RecordService, PlayerService]
})
export class RecordsComponent implements OnInit {

    records:Record[];
    stats;

    constructor(private recordService:RecordService, private playerService:PlayerService) { }

    ngOnInit() {
        this.stats = {};

        this.recordService.getRecords().then(records => {
            this.records = records;
            this.calcStats();
        });
    }

    isWinner(playerName:string, record:Record):boolean {
        return (record.p1Name === playerName && record.p1Sets > record.p2Sets) || (record.p2Name === playerName && record.p1Sets < record.p2Sets)
    }

    calcStats() {
        var players = ["axel", "florian", "martin", "matthias"];

        this.stats = {
            wins: [],
            winPerc: [],
            sweeps: [],
            sweepsAgainst: [],
            comebacks: [],
            comebacksAgainst: [],
            winStreak: []
        };

        for (let player of players) {

            let wins = _.filter(this.records, function(o) {
                return this.isWinner(player, o);
            });

            let sweeps = _.filter(this.records, function(o) {
                return (o.p1Name === player && o.p1Sets > o.p2Sets && o.p2Sets === 0) || (o.p2Name === player && o.p1Sets < o.p2Sets && o.p1Sets === 0);
            });

            let sweepsAgainst = _.filter(this.records, function(o) {
                return (o.p1Name === player && o.p1Sets < o.p2Sets && o.p1Sets === 0) || (o.p2Name === player && o.p1Sets > o.p2Sets && o.p2Sets === 0);
            });

            let comebacks = _.filter(this.records, o => {
                let isComeback = false;

                // won match
                if (this.isWinner(player, o)) {
                    // lost first two sets
                    if (o.setWinners["1"] !== player && o.setWinners["1"] !== player) {
                        isComeback = true;
                    }
                }
                return isComeback;
            });

            let comebacksAgainst = _.filter(this.records, o => {
                let isComebackAgainst = false;

                // lost match
                if (!this.isWinner(player, o)) {
                    // won first two sets
                    if (o.setWinners["1"] === player && o.setWinners["1"] === player) {
                        isComebackAgainst = true;
                    }
                }
                return isComebackAgainst;
            });

            // win streak
            let winStreak = 0;
            for (let record of this.records.reverse()) {
                console.log(player);
                if (this.isWinner(player, record)) {
                    winStreak++;
                    console.log(winStreak);
                } else {
                    console.log("break");
                    break;
                }
            }


            this.stats.wins.push({
                playerName: player,
                value: wins.length
            });
            this.stats.winPerc.push({
                playerName: player,
                value: wins.length / this.records.length
            });
            this.stats.sweeps.push({
                playerName: player,
                value: sweeps.length
            });
            this.stats.sweepsAgainst.push({
                playerName: player,
                value: sweepsAgainst.length
            });
            this.stats.comebacks.push({
                playerName: player,
                value: comebacks.length
            });
            this.stats.comebacksAgainst.push({
                playerName: player,
                value: comebacksAgainst.length
            });

            this.stats.winStreak.push({
                playerName: player,
                value: winStreak
            });
        }
    }

}
