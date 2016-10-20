import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

//import { Observable } from 'rxjs';

import { Record } from './record.model';

@Injectable()
export class RecordService {

    HOST = ""; //"http://localhost:3002";

    constructor(private http: Http) { }

    getRecords(): Promise<Record[]> {
        return this.http.get(this.HOST + "/api/records")
                   .toPromise()
                   .then(function(res) {
                       return res.json() as Record[];
                   });
    }

    saveRecord(record: Record): Promise<Record> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(record);
        return this.http.post(this.HOST + "/api/records/", body , options)
                    .toPromise()
                    .then(function(res) {
                        return res.json() as Record;
                    });
    }
}
