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
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
var RecordService = (function () {
    function RecordService(http) {
        this.http = http;
        this.HOST = "http://localhost:3002";
    }
    RecordService.prototype.getRecords = function () {
        return this.http.get("/api/records")
            .toPromise()
            .then(function (res) {
            return res.json();
        });
    };
    RecordService.prototype.saveRecord = function (record) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var body = JSON.stringify(record);
        return this.http.post("/api/records/", body, options)
            .toPromise()
            .then(function (res) {
            return res.json();
        });
    };
    return RecordService;
}());
RecordService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], RecordService);
export { RecordService };
//# sourceMappingURL=../../../../src/app/shared/record.service.js.map