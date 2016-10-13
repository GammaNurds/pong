import { Component, OnInit } from '@angular/core';

import { Record } from '../shared/record.model';
import { RecordService } from '../shared/record.service';

@Component({
  selector: 'pong-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  providers: [RecordService]
})
export class RecordsComponent implements OnInit {

    records:Record[];

    constructor(private recordService:RecordService) { }

    ngOnInit() {
        this.recordService.getRecords().then(records => {
            this.records = records;
        });
    }

}
