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
}
