var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { RecordService } from '../shared/record.service';
var HistoryComponent = (function () {
    function HistoryComponent(recordService) {
        this.recordService = recordService;
    }
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.recordService.getRecords().then(function (records) { return _this.records = records; });
    };
    HistoryComponent.prototype.hasClutchSet = function (record) {
        return record.p1Sets >= 2 && record.p2Sets >= 2;
    };
    HistoryComponent.prototype.getWinner = function (record) {
        return record.p1Sets > record.p2Sets ? record.p1Name : record.p2Name;
    };
    HistoryComponent.prototype.isSweep = function (record) {
        return record.p1Sets === 0 || record.p2Sets === 0;
    };
    HistoryComponent.prototype.isComeback = function (record) {
        var winnerName = this.getWinner(record);
        return record.setWinners[1] !== winnerName && record.setWinners[2] !== winnerName;
    };
    return HistoryComponent;
}());
HistoryComponent = __decorate([
    Component({
        selector: 'app-history',
        templateUrl: './history.component.html',
        styleUrls: ['./history.component.css'],
        providers: [RecordService]
    }),
    __metadata("design:paramtypes", [RecordService])
], HistoryComponent);
export { HistoryComponent };
//# sourceMappingURL=../../../../src/app/history/history.component.js.map