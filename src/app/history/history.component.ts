import { Component, OnInit } from '@angular/core';

import { Record } from '../shared/record.model';
import { RecordService } from '../shared/record.service';
import { OrderByPipe } from '../shared/order-by.pipe';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css'],
    providers: [RecordService]
})
export class HistoryComponent implements OnInit {

    records: Record[];

    constructor(private recordService: RecordService) { }

    ngOnInit() {
        this.recordService.getRecords().then(records => this.records = records);
    }

    hasClutchSet(record: Record) {
        return record.p1Sets >= 2 && record.p2Sets >= 2;
    }

    getWinner(record: Record) {
        return record.p1Sets > record.p2Sets ? record.p1Name : record.p2Name;
    }

    isSweep(record: Record) {
        return record.p1Sets === 0 || record.p2Sets === 0;
    }

    isComeback(record: Record) {
        let winnerName = this.getWinner(record);
        // won, but lost first two sets
        return record.setWinners[1] !== winnerName && record.setWinners[2] !== winnerName;
    }
}
