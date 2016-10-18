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

    calcStats() {

        var players = ["axel", "florian", "martin", "matthias"];

        this.stats = {
            wins: [],
            winPerc: [],
            sweeps: [],
            embarrassed: []
        };

        this.stats.wins = [];
        for (let player of players) {

            let wins = _.filter(this.records, function(o) {
                return (o.p1Name === player && o.p1Sets > o.p2Sets) || (o.p2Name === player && o.p1Sets < o.p2Sets);
            });

            let sweeps = _.filter(this.records, function(o) {
                return (o.p1Name === player && o.p1Sets > o.p2Sets && o.p2Sets === 0) || (o.p2Name === player && o.p1Sets < o.p2Sets && o.p1Sets === 0);
            });

            let embarrassed = _.filter(this.records, function(o) {
                return (o.p1Name === player && o.p1Sets < o.p2Sets && o.p1Sets === 0) || (o.p2Name === player && o.p1Sets > o.p2Sets && o.p2Sets === 0);
            });

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
            this.stats.embarrassed.push({
                playerName: player,
                value: embarrassed.length
            });
        }
    }

}
